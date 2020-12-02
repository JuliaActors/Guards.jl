#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

using Guards, Test

gd = guard([1,2,3])
@test gd isa Guards.Guard{Array{Int64,1}}
@test call(gd) == [1,2,3]
@test push!(call(gd), 4) == [1,2,3,4]
@test call(gd) == [1,2,3]
@test call(gd, push!, 4) == [1,2,3,4]
@test call(gd) == [1,2,3,4]
cast(gd, push!, 5)
@test (@grd gd) == [1,2,3,4,5]
@test (@grd pop!(gd)) == 5
@test pop!(update!(gd, [5,6,7,8])) == 8
@test (@grd gd) == [5,6,7,8]

@test (@grd 1) == "@grd: not a symbol or a call!"
@test_throws AssertionError update!(gd, [10.0, 11.0])
