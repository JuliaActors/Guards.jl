# Guards

Let actors guard your mutable variables!

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://JuliaActors.github.io/Guards.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://JuliaActors.github.io/Guards.jl/dev)
[![Build Status](https://github.com/JuliaActors/Guards.jl/workflows/CI/badge.svg)](https://github.com/JuliaActors/Guards.jl/actions)
[![Coverage](https://codecov.io/gh/JuliaActors/Guards.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/JuliaActors/Guards.jl)

With `Guards` you can wrap mutable variables into a `:guard` actor. Then it can be accessed only via message passing. That way mutable variables can be safely accessed from parallel threads and distributed worker processes.

## Example
