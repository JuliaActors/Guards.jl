# Understanding Guards

```@meta
CurrentModule = Guards
```

`Guards` is an [`Actors`](https://github.com/JuliaActors/Actors.jl) protocol. It solves the mutual exclusion problem for shared variables:

> The mutual exclusion problem arises when two processes should never simultaneously access a shared resource. ... Although, a single receptionist may control access to a resource, the resource itself can still be modeled as a system of actors so that there may be concurrency in the use of the resource. ... In general, a programmer using an actor language need not be concerned with the mutual exclusion problem. [^1]

As for now a `:guard` actor

- is a "single receptionist" in Agha's sense or it
- is similar to an *agent* in Elixir.

The guarded variable is protected by message passing and the `:guard` actor being the only entity allowed to directly modify it. In order to modify a guarded variable we must [`call`](@ref) the `:guard` actor with a modifier function and its arguments. The actor then applies that to the guarded variable and responds with a deep copy of the result.

If we `call` the `:guard` actor without further arguments, it responds with a deep copy of the guarded variable. So e.g. threads can safely do iterations on the copy.

The [`@grd`](@ref) macro is syntactical sugar for  `call` and lets you work with the guard actor as if it were the guarded variable itself.

## Interfaces

For guarded `Array`s and `Dict`s an interface has been implemented. With that you can do indexing on `Guard{T<:AbstractArray}` and `Guard{T<:AbstractDict}` types:

```julia
julia> gd = guard([1,2,3])
Guards.Guard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))

julia> @grd gd
3-element Array{Int64,1}:
 1
 2
 3

julia> gd[1] = 10
10

julia> @grd gd
3-element Array{Int64,1}:
 10
  2
  3

julia> length(gd)
3

julia> dd = guard(Dict("baz" => 17, "bar" => 4711))
Guards.Guard{Dict{String,Int64}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))

julia> @grd dd
Dict{String,Int64} with 2 entries:
  "bar" => 4711
  "baz" => 17

julia> dd["baz"]
17

julia> dd["dummy"] = 10
10

julia> @grd dd
Dict{String,Int64} with 3 entries:
  "bar"   => 4711
  "baz"   => 17
  "dummy" => 10
```

## Iteration

If you need to iterate concurrently on guarded variables, you can do it on the copies like that:

```julia
julia> [i+5 for i in @grd gd]
3-element Array{Int64,1}:
 15
  7
  8

julia> for (i, j) in @grd dd
           println((i, j))
       end
("bar", 4711)
("baz", 17)
("dummy", 10)
```

## Protection

Going deeper into the protection mechanism, a guarded variable is protected not only by the `:guard` actor but also by the [`Guard`](@ref) link and by the protocol/API:

- a `Guard` variable wraps the actor link. No message can be sent directly to it. There is no implemented `send` to a `Guard` type.
- the only three implemented methods to communicate with a `Guard` type are [`call`](@ref) and [`cast`](@ref) and [`update!`](@ref). The `Call` protocol is different from `Actors`' as it returns only deep copies.

Still it is possible to access the guarded variable by using the `Actors` API, but not in a straightforward way.

[^1]: Gul Agha; Actors, A Model of Concurrent Computation in Distributed Systems.- Ch. 6.1.3, p.95
