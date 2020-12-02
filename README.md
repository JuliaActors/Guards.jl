# Guards

Let actors guard your mutable variables!

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://JuliaActors.github.io/Guards.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://JuliaActors.github.io/Guards.jl/dev)
[![Build Status](https://github.com/JuliaActors/Guards.jl/workflows/CI/badge.svg)](https://github.com/JuliaActors/Guards.jl/actions)
[![Coverage](https://codecov.io/gh/JuliaActors/Guards.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/JuliaActors/Guards.jl)

With `Guards` you can wrap mutable variables into a `:guard` actor. That way they can be safely accessed from parallel threads and distributed worker processes via message passing.

## Example

```julia
julia> using Guards

julia> gd = guard([1,2,3])  # start a guards actor around an array
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

`Guards` is part of [`JuliaActors`](https://github.com/JuliaActors).

## Author(s)

- Paul Bayer

**License:** MIT