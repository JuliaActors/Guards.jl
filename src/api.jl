#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

"""
```
call(gd::Guard, [lk::Link,] f::Function, args...)
```
Call a guard actor `gd` to execute `f(var, args...)` on  
its guarded variable `var` and to respond with a 
deep copy of the result. 

# Arguments
- `gd::Guard`: link to the `:guard` actor,
- `lk::Link`: if a link `lk` is provided send the response
    to that, else do a synchronous `request`,
- `f`: function taking the guarded variable `var`
    as first argument,
- `args...`: further arguments to `f`.
"""
Actors.call(gd::Guard, lk::Link, f::F, args...) where F<:Function = call(gd.link, lk, f, args...)
Actors.call(gd::Guard, f::F, args...) where F<:Function = call(gd.link, f, args...)

"""
```
call(gd::Guard [, lk::Link])
```
Call a guard actor `gd` to respond with a deep copy of
the guarded variable `var`.

# Arguments
# Arguments
- `gd::Guard`: link to the `:guard` actor,
- `lk::Link`: if a link `lk` is provided send the response
    to that, else do a synchronous `request`,
"""
Actors.call(gd::Guard, lk::Link) = call(gd.link, lk)
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

"""
    update!(gd::Guard, var)

Update a guarded variable represented by `gd` with `var`.

**Note:** `var` must be of the same type as the guarded 
variable!
"""
function Actors.update!(gd::Guard, var)
    @assert guardtype(gd) == typeof(var) "var must have the same type as the guarded variable"
    init!(gd.link, id, var)
    return deepcopy(var)
end

"""
    @grd f(gd, args...)

Execute a function `f` on a guarded variable `var` 
represented by an actor link `gd` and return a deep copy 
of the result or return a deep copy of `var`.  This is 
a wrapper to [`call`](@ref).

    @grd gd

Return a deep copy of the guarded variable.

# Parameters
- `gd::Guard`: a link to the `:guard` actor,
- `f`: callable object taking the guarded variable `var` 
    as first argument,
- `args...`:  further arguments to `f`.
"""
macro grd(expr)
    if expr isa Symbol
        esc(:(call($expr)))
    elseif expr isa Expr && expr.head == :call  
        f = expr.args[1]
        gd = expr.args[2]
        args = expr.args[3:end]
        esc(:(call($gd, $f, $(args...))))
    else
        "@grd: not a symbol or a call!"
    end
end
