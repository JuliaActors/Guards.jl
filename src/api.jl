#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

"""
    call(gd::Guard, f, args...)

Call a guard actor `gd` to execute `f(var, args...)` on  
its guarded variable var and to send respond with a 
deep copy of the result. 

# Arguments
- `gd::Guard`: link to the `:guard` actor,
- `f`: callable object taking the guarded variable `var`
    as first argument,
- `args...`: further arguments to `f`.
"""
Actors.call(gd::Guard, f, args...) = call(gd.link, f, args...)
Actors.call(gd::Guard) = call(gd.link)

"""
cast(gd::Guard, f, args...)

Cast a message to a guard actor `gd` to execute `f(var, args...)` on  
its guarded variable var.

# Arguments
- `gd::Guard`: link to the `:guard` actor,
- `f`: callable object taking the guarded variable `var`
    as first argument,
- `args...`: further arguments to `f`.
"""
Actors.cast(gd::Guard, f, args...) = cast(gd.link, f, args...)
