#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

function Actors.onmessage(A::_ACT, ::Val{:guard}, msg::Init)
    A.init = msg.x          # save the init Func
    A.sta = A.init()        # exec the init function
    become(deepcopy, A.sta) # set the behavior
end

function Actors.onmessage(A::_ACT, ::Val{:guard}, msg::Call)
    if isempty(msg.x)
        send(msg.from, Response(A.bhv(), A.self))
    else 
        A.res = first(msg.x)(A.sta, msg.x[2:end]...)
        send(msg.from, Response(deepcopy(A.res), A.self))
    end
end

function Actors.onmessage(A::_ACT, ::Val{:guard}, msg::Cast)
    A.res = first(msg.x)(A.sta, msg.x[2:end]...)
end

