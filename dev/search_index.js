var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = Guards","category":"page"},{"location":"#Guards","page":"Home","title":"Guards","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Let actors guard your mutable variables!","category":"page"},{"location":"","page":"Home","title":"Home","text":"With Guards you can wrap mutable variables into a :guard actor. Then it can be accessed only via message passing. That way mutable variables can be safely accessed from parallel threads and distributed worker processes.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [Guards]","category":"page"},{"location":"#Guards.Guards","page":"Home","title":"Guards.Guards","text":"Guards\n\nImplements a generic server Actor's protocol.\n\nThe current stable, registered version is installed with\n\npkg> add Guards\n\nThe development version is installed with:\n\npkg> add \"https://github.com/JuliaActors/Guards.jl\"\n\n\n\n\n\n","category":"module"},{"location":"#Guards.version","page":"Home","title":"Guards.version","text":"Gives the package version.\n\n\n\n\n\n","category":"constant"},{"location":"#Guards.Guard","page":"Home","title":"Guards.Guard","text":"Guard{T}\n\nA parametric struct returned by guard.\n\nParameter/Field\n\nT: the type of the guarded variable,\nlink::Union{Link,Symbol}: Link or name of guard actor.\n\n\n\n\n\n","category":"type"},{"location":"#Actors.call-Tuple{Guards.Guard,Any,Vararg{Any,N} where N}","page":"Home","title":"Actors.call","text":"call(gd::Guard, f, args...)\n\nCall a guard actor gd to execute f(var, args...) on   its guarded variable var and to send respond with a  deep copy of the result. \n\nArguments\n\ngd::Guard: link to the :guard actor,\nf: callable object taking the guarded variable var   as first argument,\nargs...: further arguments to f.\n\n\n\n\n\n","category":"method"},{"location":"#Actors.cast-Tuple{Guards.Guard,Any,Vararg{Any,N} where N}","page":"Home","title":"Actors.cast","text":"cast(gd::Guard, f, args...)\n\nCast a message to a guard actor gd to execute f(var, args...) on   its guarded variable var.\n\nArguments\n\ngd::Guard: link to the :guard actor,\nf: callable object taking the guarded variable var   as first argument,\nargs...: further arguments to f.\n\n\n\n\n\n","category":"method"},{"location":"#Guards.guard-Tuple{Any}","page":"Home","title":"Guards.guard","text":"guard(var;  name=nothing, pid=myid(), thrd=false, \n            sticky=false, taskref=nothing)\n\nStart a :guard actor for the variable var and return  a Guard link to it.\n\nParameters\n\nvar: variable to guard for,\nname=nothing: if a name::Symbol is provided the server    is registered and the name is returned,\npid=myid(): worker pid to create the actor on,\nthrd=false: thread to create the actor on,\nsticky=false: if true, the actor is created in    the same thread,\ntaskref=nothing: if a Ref{Task} variable is    provided, it gets the created Task.  \n\n\n\n\n\n","category":"method"},{"location":"#Guards.@grd-Tuple{Any}","page":"Home","title":"Guards.@grd","text":"@grd gd\n@grd f(gd, args...)\n\nReturn a deep copy of a guarded variable var or of the  result of a function call on it. This is a wrapper to call.\n\nParameters\n\ngd::Guard: a link to the :guard actor,\nf: callable object taking the guarded variable var    as first argument,\nargs...:  further arguments to f.\n\n\n\n\n\n","category":"macro"}]
}
