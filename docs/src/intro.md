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
```
