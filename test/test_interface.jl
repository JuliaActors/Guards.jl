#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

using Guards, Test

gd = guard([1,2,3])
@test gd[2] == 2
@test gd[begin] == 1
@test gd[end] == 3
@test (gd[1] = 10) == 10
@test (@grd gd) == [10,2,3]
@test supertype(typeof(gd)) == Array{Int64, 1}
@test size(gd) == (3,)
@test IndexStyle(typeof(gd)) == IndexLinear()
@test length(gd) == 3

dd = guard(Dict("baz" => 17, "bar" => 4711))
@test dd["baz"] == 17
@test (dd["dummy"] = 10) == 10
@test dd["dummy"] == 10
