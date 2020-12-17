#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

"""
    Guards

Implements a generic server Actor's protocol.

The current stable, registered version is installed with
```julia
pkg> add Guards
```

The development version is installed with:
```julia
pkg> add "https://github.com/JuliaActors/Guards.jl"
```
"""
module Guards

"Gives the package version."
const version = v"0.2.0"

using Reexport, Distributed

@reexport using Actors
import Actors: spawn, _ACT, Init, Call, Cast

include("guard.jl")
include("protocol.jl")
include("api.jl")
include("interface.jl")

export guard, @grd, Guard

end
