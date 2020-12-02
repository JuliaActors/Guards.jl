#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

"""
    Guard{T}

A parametric struct returned by [`guard`](@ref).

# Parameter/Field

- `T`: the type of the guarded variable,
- `link::Union{Link,Symbol}`: `Link` or name of guard actor.
"""
struct Guard{T}
    link::Union{Link,Symbol}
end

id(x) = x

guardtype(::Guard{T}) where T = T


"""
```
guard(var;  name=nothing, pid=myid(), thrd=false, 
            sticky=false, taskref=nothing)
```

Start a `:guard` actor for the variable `var` and return 
a [`Guard`](@ref) link to it.

# Parameters
- `var`: variable to guard for,
- `name=nothing`: if a `name::Symbol` is provided the server 
    is registered and the name is returned,
- `pid=myid()`: worker pid to create the actor on,
- `thrd=false`: thread to create the actor on,
- `sticky=false`: if `true`, the actor is created in 
    the same thread,
- `taskref=nothing`: if a `Ref{Task}` variable is 
    provided, it gets the created `Task`.  
"""
function guard(var; name=nothing, pid=myid(), thrd=false, 
               sticky=false, taskref=nothing)
    s = spawn(Bhv(id, var); mode=:guard, pid=pid,
            thrd=thrd, sticky=sticky, taskref=taskref)
    isnothing(name) || register(name, s)
    init!(s, id, var)
    return isnothing(name) ? 
        Guard{typeof(var)}(s) : 
        Guard{typeof(var)}(name)
end
