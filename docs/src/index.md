```@meta
CurrentModule = Guards
```

# Guards

Let actors guard your mutable variables!

With `Guards` you can wrap mutable variables into a `:guard` actor. Then it can be accessed only via message passing. That way mutable variables can be safely accessed from parallel threads and distributed worker processes.

```@index
```

```@autodocs
Modules = [Guards]
```
