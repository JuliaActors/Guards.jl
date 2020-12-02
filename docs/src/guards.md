# Understanding Guards

```@meta
CurrentModule = Guards
```

`Guards` is an [`Actors`](https://github.com/JuliaActors/Actors.jl) protocol. It solves the mutual exclusion problem for shared variables:

> The mutual exclusion problem arises when two processes should never simultaneously access a shared resource. ... Although, a single receptionist may control access to a resource, the resource itself can still be modeled as a system of actors so that there may be concurrency in the use of the resource. ... In general, a programmer using an actor language need not be concerned with the mutual exclusion problem. [^1]

As for now a `:guard` actor is a "single receptionist" in Agha's sense controlling access to a resource or similar to an *agent* in Elixir. The variable is protected by message passing and the `:guard` actor being the only entity allowed to modify it. It generally returns only deep copies. So e.g. threads can safely do iterations on those.

## Interfaces


[^1]: Gul Agha: Actors, ch 6.1.3, p.95
