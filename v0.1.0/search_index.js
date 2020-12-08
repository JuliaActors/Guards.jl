var documenterSearchIndex = {"docs":
[{"location":"guards/#Understanding-Guards","page":"Understanding Guards","title":"Understanding Guards","text":"","category":"section"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"CurrentModule = Guards","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"Guards is an Actors protocol. It solves the mutual exclusion problem for shared variables:","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"The mutual exclusion problem arises when two processes should never simultaneously access a shared resource. ... Although, a single receptionist may control access to a resource, the resource itself can still be modeled as a system of actors so that there may be concurrency in the use of the resource. ... In general, a programmer using an actor language need not be concerned with the mutual exclusion problem. [1]","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"As for now a :guard actor","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"is a \"single receptionist\" in Agha's sense or it\nis similar to an agent in Elixir. ","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"The guarded variable is protected by message passing and the :guard actor being the only entity allowed to directly modify it. In order to modify a guarded variable we must send a modifier function with its arguments to the :guard actor. It then responds with a deep copy of the result or of the variable. So e.g. threads can safely do iterations on those.","category":"page"},{"location":"guards/#Interfaces","page":"Understanding Guards","title":"Interfaces","text":"","category":"section"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"For guarded Arrays and Dicts an interface has been implemented. With that you can do indexing on Guard{T<:AbstractArray} and Guard{T<:AbstractDict} types:","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"julia> gd = guard([1,2,3])\nGuards.Guard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))\n\njulia> @grd gd\n3-element Array{Int64,1}:\n 1\n 2\n 3\n\njulia> gd[1] = 10\n10\n\njulia> @grd gd\n3-element Array{Int64,1}:\n 10\n  2\n  3\n\njulia> length(gd)\n3\n\njulia> dd = guard(Dict(\"baz\" => 17, \"bar\" => 4711))\nGuards.Guard{Dict{String,Int64}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))\n\njulia> @grd dd\nDict{String,Int64} with 2 entries:\n  \"bar\" => 4711\n  \"baz\" => 17\n\njulia> dd[\"baz\"]\n17\n\njulia> dd[\"dummy\"] = 10\n10\n\njulia> @grd dd\nDict{String,Int64} with 3 entries:\n  \"bar\"   => 4711\n  \"baz\"   => 17\n  \"dummy\" => 10","category":"page"},{"location":"guards/#Iteration","page":"Understanding Guards","title":"Iteration","text":"","category":"section"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"If you need to iterate concurrently on guarded variables, you can do it on the copies like that:","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"julia> [i+5 for i in @grd gd]\n3-element Array{Int64,1}:\n 15\n  7\n  8\n\njulia> for (i, j) in @grd dd\n           println((i, j))\n       end\n(\"bar\", 4711)\n(\"baz\", 17)\n(\"dummy\", 10)","category":"page"},{"location":"guards/#Protection","page":"Understanding Guards","title":"Protection","text":"","category":"section"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"Going deeper into the protection mechanism, a guarded variable is protected not only by the :guard actor but also by the Guard link and by the protocol/API:","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"a Guard variable wraps the actor link. No message can be sent directly to it. There is no implemented send to a Guard type.\nthe only three implemented methods to communicate with a Guard type are call and cast and update!. The Call protocol is different from Actors' as it returns only deep copies.","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"Still it is possible to access the guarded variable by using the Actors API, but not in a straightforward way.","category":"page"},{"location":"guards/","page":"Understanding Guards","title":"Understanding Guards","text":"[1]: Gul Agha; Actors, A Model of Concurrent Computation in Distributed Systems.- Ch. 6.1.3, p.95","category":"page"},{"location":"api/#Guards-API","page":"Guards API","title":"Guards API","text":"","category":"section"},{"location":"api/","page":"Guards API","title":"Guards API","text":"CurrentModule = Guards","category":"page"},{"location":"api/","page":"Guards API","title":"Guards API","text":"Modules = [Guards]","category":"page"},{"location":"api/#Guards.Guards","page":"Guards API","title":"Guards.Guards","text":"Guards\n\nImplements a generic server Actor's protocol.\n\nThe current stable, registered version is installed with\n\npkg> add Guards\n\nThe development version is installed with:\n\npkg> add \"https://github.com/JuliaActors/Guards.jl\"\n\n\n\n\n\n","category":"module"},{"location":"api/#Guards.version","page":"Guards API","title":"Guards.version","text":"Gives the package version.\n\n\n\n\n\n","category":"constant"},{"location":"api/#Guards.Guard","page":"Guards API","title":"Guards.Guard","text":"Guard{T}\n\nA parametric struct returned by guard.\n\nParameter/Field\n\nT: the type of the guarded variable,\nlink::Union{Link,Symbol}: Link or name of guard actor.\n\n\n\n\n\n","category":"type"},{"location":"api/#Actors.call-Tuple{Guard,Any,Vararg{Any,N} where N}","page":"Guards API","title":"Actors.call","text":"call(gd::Guard, f, args...)\n\nCall a guard actor gd to execute f(var, args...) on   its guarded variable var and to send respond with a  deep copy of the result. \n\nArguments\n\ngd::Guard: link to the :guard actor,\nf: callable object taking the guarded variable var   as first argument,\nargs...: further arguments to f.\n\n\n\n\n\n","category":"method"},{"location":"api/#Actors.cast-Tuple{Guard,Any,Vararg{Any,N} where N}","page":"Guards API","title":"Actors.cast","text":"cast(gd::Guard, f, args...)\n\nCast a message to a guard actor gd to execute f(var, args...) on   its guarded variable var.\n\nArguments\n\ngd::Guard: link to the :guard actor,\nf: callable object taking the guarded variable var   as first argument,\nargs...: further arguments to f.\n\n\n\n\n\n","category":"method"},{"location":"api/#Actors.update!-Tuple{Guard,Any}","page":"Guards API","title":"Actors.update!","text":"update!(gd::Guard, var)\n\nUpdate a guarded variable represented by gd with var.\n\nNote: var must be of the same type as the guarded  variable!\n\n\n\n\n\n","category":"method"},{"location":"api/#Guards.guard-Tuple{Any}","page":"Guards API","title":"Guards.guard","text":"guard(var;  name=nothing, pid=myid(), thrd=false, \n            sticky=false, taskref=nothing)\n\nStart a :guard actor for the variable var and return  a Guard link to it.\n\nParameters\n\nvar: variable to guard for,\nname=nothing: if a name::Symbol is provided the server    is registered and the name is returned,\nremote=false: if remote=true a guard with an   remote link is returned,\npid=myid(): worker pid to create the actor on,\nthrd=false: thread to create the actor on,\nsticky=false: if true, the actor is created in    the same thread,\ntaskref=nothing: if a Ref{Task} variable is    provided, it gets the created Task.  \n\n\n\n\n\n","category":"method"},{"location":"api/#Guards.@grd-Tuple{Any}","page":"Guards API","title":"Guards.@grd","text":"@grd f(gd, args...)\n@grd gd\n\nExecute a function f on a guarded variable var  represented by an actor link gd and return a deep copy  of the result or return a deep copy of var.  This is  a wrapper to call.\n\nParameters\n\ngd::Guard: a link to the :guard actor,\nf: callable object taking the guarded variable var    as first argument,\nargs...:  further arguments to f.\n\n\n\n\n\n","category":"macro"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"CurrentModule = Guards","category":"page"},{"location":"intro/#Introduction","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"In order to secure a mutable variable from concurrent access by multiple threads and/or distributed workers you call guard on it. That wraps it into a :guard actor represented only by a Guard link.","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"Then it can be accessed only by message passing via cast and call over that link. Calls to it return deep copies. You can still modify a guarded variable by sending the :guard actor a modifier function and arguments to it.","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"The @grd macro expands a call to the link into a call request.","category":"page"},{"location":"intro/#Example","page":"Introduction","title":"Example","text":"","category":"section"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"julia> using Guards\n\njulia> gd = guard([1,2,3])  # start a guard actor around an array\nGuards.Guard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))\n\njulia> call(gd)             # get a deep copy of it\n3-element Array{Int64,1}:\n 1\n 2\n 3\n\njulia> push!(call(gd), 4)   # pushing to it ...\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n\njulia> call(gd)             # the guarded variable has not changed\n3-element Array{Int64,1}:\n 1\n 2\n 3\n\njulia> call(gd, push!, 4);  # if you call it with push!,\n\njulia> @grd gd              # ... it got changed (here using the @grd macro)\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n\njulia> @grd pop!(gd)        # pop! with the macro\n4\n\njulia> update!(gd, [5,6,7,8])\n4-element Array{Int64,1}:\n 5\n 6\n 7\n 8\n\njulia> @grd gd\n4-element Array{Int64,1}:\n 5\n 6\n 7\n 8","category":"page"},{"location":"intro/#Multithreading","page":"Introduction","title":"Multithreading","text":"","category":"section"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"Even if with actors we avoid race conditions, concurrency is still challenging. Consider the following where 8 threads concurrently try to increment a guarded variable:","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"julia> using .Threads\n\njulia> gd = guard(zeros(Int, 10))\nGuard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))\n\njulia> for i in 1:10\n           @threads for _ in 1:nthreads()\n               gd[i] += 1\n           end\n       end\n\njulia> @grd gd\n10-element Array{Int64,1}:\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"What has happened? gd[i] += 1 is not a single actor call. First all 8 threads get 0 by doing getindex(var, i) and then they do setindex!(var, i, 0+1) on it. The result is 1 and not 8 as we would expect. In order to get it right we create a function:","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"julia> incr(arr, index, by) = arr[index] += by\nincr (generic function with 1 method)\n\njulia> gd = guard(zeros(Int, 10))\nGuard{Array{Int64,1}}(Link{Channel{Any}}(Channel{Any}(sz_max:32,sz_curr:0), 1, :guard))\n\njulia> for i in 1:10\n           @threads for _ in 1:nthreads()\n               @grd incr(gd, i, 1)\n           end\n       end\n\njulia> @grd gd\n10-element Array{Int64,1}:\n 8\n 8\n 8\n 8\n 8\n 8\n 8\n 8\n 8\n 8","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"Thus the guard actor receives nthreads() calls to incr for each i and it works as expected.","category":"page"},{"location":"intro/#Distributed","page":"Introduction","title":"Distributed","text":"","category":"section"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"For distributed computing we can create named guards or guards with remote links. All worker processes can work with the same guarded variable:","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"julia> using Distributed\n\njulia> addprocs(1);\n\njulia> @everywhere using Guards\n\njulia> gd = guard([1,2,3], remote=true)  # a guard with a remote link\nGuard{Array{Int64,1}}(Link{RemoteChannel{Channel{Any}}}(RemoteChannel{Channel{Any}}(1, 1, 13), 1, :guard))\n\njulia> fetch(@spawnat 2 @grd gd)         # show it on pid 2\n3-element Array{Int64,1}:\n 1\n 2\n 3\n\njulia> @fetchfrom 2 InteractiveUtils.varinfo()\n  name               size summary\n  ––––––––––– ––––––––––– –––––––––––––––––––––\n  Base                    Module\n  Core                    Module\n  Distributed 918.170 KiB Module\n  Main                    Module\n  gd             56 bytes Guard{Array{Int64,1}}\n\njulia> @grd push!(gd, 4)                 # push! on pid 1\n\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n\njulia> @spawnat 2 @grd push!(gd, 5)      # push on pid 2\nFuture(2, 1, 20, nothing)\n\njulia> @grd gd                           # it is everywhere up to date\n5-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n 5","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"If we send local guarded variables to distributed actors or if we create distributed actors with guarded variables as arguments, their local links are automatically converted to remote ones, so they can work with them.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Guards","category":"page"},{"location":"#Guards","page":"Home","title":"Guards","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Let actors guard your mutable variables!","category":"page"},{"location":"","page":"Home","title":"Home","text":"With Guards you can wrap mutable variables into a :guard actor. That way they can be safely accessed from parallel threads and distributed worker processes via message passing.","category":"page"},{"location":"#Overview","page":"Home","title":"Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Introduction\nUnderstanding Guards\nGuards API","category":"page"},{"location":"#Authors(s)","page":"Home","title":"Authors(s)","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Paul Bayer","category":"page"},{"location":"","page":"Home","title":"Home","text":"Guards is part of JuliaActors, license: MIT","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"}]
}
