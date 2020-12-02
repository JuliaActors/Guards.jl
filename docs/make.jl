using Guards
using Documenter

makedocs(;
    modules=[Guards],
    authors="Paul Bayer",
    repo="https://github.com/JuliaActors/Guards.jl/blob/{commit}{path}#L{line}",
    sitename="Guards.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://JuliaActors.github.io/Guards.jl",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
        "intro.md",
        "guards.md",
        "api.md",
    ],
)

deploydocs(;
    repo="github.com/JuliaActors/Guards.jl",
)
