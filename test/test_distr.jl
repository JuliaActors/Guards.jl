#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

using Guards, Test, Distributed

length(procs()) == 1 && addprocs(1)

@everywhere using Actors, Guards

@everywhere did(x) = x isa Guard ? (@grd x) : x

act1 = Actors.spawn(Bhv(did), pid=2)

gd = guard([1,2,3])

@test call(act1, gd) == [1,2,3]
@grd push!(gd, 4)
@test call(act1, gd) == [1,2,3,4]
