```@meta
CurrentModule = Guards
```

# Introduction

In order to secure a mutable variable from concurrent access by multiple threads and/or distributed workers you call [`guard`](@ref) on it. That wraps it into a `:guard` actor represented only by a [`Guard`](@ref) link.

Then it can be accessed only by message passing via [`cast`](@ref) and [`call`](@ref) over that link. Calls to it return deep copies. You can still modify a guarded variable by sending the `:guard` actor a modifier function and arguments to it.

The [`@grd`](@ref) macro expands a call to the link into a `call` request.

## Example

```julia
julia> using Guards

julia> gd = guard([1,2,3])  # start a guard actor around an array
Guards.Guard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))

julia> call(gd)             # get a deep copy of it
3-element Array{Int64,1}:
 1
 2
 3

julia> push!(call(gd), 4)   # pushing to it ...
4-element Array{Int64,1}:
 1
 2
 3
 4

julia> call(gd)             # the guarded variable has not changed
3-element Array{Int64,1}:
 1
 2
 3

julia> call(gd, push!, 4);  # if you call it with push!,

julia> @grd gd              # ... it got changed (here using the @grd macro)
4-element Array{Int64,1}:
 1
 2
 3
 4

julia> @grd pop!(gd)        # pop! with the macro
4

julia> update!(gd, [5,6,7,8])
4-element Array{Int64,1}:
 5
 6
 7
 8

julia> @grd gd
4-element Array{Int64,1}:
 5
 6
 7
 8
```

## Multithreading

Even if with actors we avoid race conditions, concurrency is still challenging. Consider the following where 8 threads concurrently try to increment a guarded variable:

```julia
julia> using .Threads

julia> gd = guard(zeros(Int, 10))
Guard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))

julia> for i in 1:10
           @threads for _ in 1:nthreads()
               gd[i] += 1
           end
       end

julia> @grd gd
10-element Array{Int64,1}:
 1
 1
 1
 1
 1
 1
 1
 1
 1
 1
```

What has happened? `gd[i] += 1` is not a single actor call. First all 8 threads get 0 by doing `getindex(var, i)` and then they do `setindex!(var, i, 0+1)` on it. The result is 1 and not 8 as we would expect. In order to get it right we create a function:

```julia
julia> incr(arr, index, by) = arr[index] += by
incr (generic function with 1 method)

julia> gd = guard(zeros(Int, 10))
Guard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))

julia> for i in 1:10
           @threads for _ in 1:nthreads()
               @grd incr(gd, i, 1)
           end
       end

julia> @grd gd
10-element Array{Int64,1}:
 8
 8
 8
 8
 8
 8
 8
 8
 8
 8
```

Thus the guard actor receives `nthreads()` calls to `incr` for each `i` and it works as expected.

## Distributed

For distributed computing we can create named guards or guards with remote links. All worker processes can work with the same guarded variable:

```julia
julia> using Distributed

julia> addprocs(1);

julia> @everywhere using Guards

julia> gd = guard([1,2,3], remote=true)  # a guard with a remote link
Guard{Array{Int64,1}}(Link{RemoteChannel{Channel{Any}}}(RemoteChannel{Channel{Any}}(1, 1, 13), 1, :guard))

julia> fetch(@spawnat 2 @grd gd)         # show it on pid 2
3-element Array{Int64,1}:
 1
 2
 3

julia> @fetchfrom 2 InteractiveUtils.varinfo()
  name               size summary
  ––––––––––– ––––––––––– –––––––––––––––––––––
  Base                    Module
  Core                    Module
  Distributed 918.170 KiB Module
  Main                    Module
  gd             56 bytes Guard{Array{Int64,1}}

julia> @grd push!(gd, 4)                 # push! on pid 1

4-element Array{Int64,1}:
 1
 2
 3
 4

julia> @spawnat 2 @grd push!(gd, 5)      # push on pid 2
Future(2, 1, 20, nothing)

julia> @grd gd                           # it is everywhere up to date
5-element Array{Int64,1}:
 1
 2
 3
 4
 5
```

If we send local guarded variables to distributed actors or if we create distributed actors with guarded variables as arguments, their local links are automatically converted to remote ones, so they can work with them.
