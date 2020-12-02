#
# This file is part of the Guards.jl Julia package, 
# MIT license, part of https://github.com/JuliaActors
#

# 
# Indexing
#
function Base.getindex(G::Guard{T}, i::Int) where T<:AbstractArray
    @grd getindex(G, i)
end

function Base.setindex!(G::Guard{T}, v, i::Int) where T<:AbstractArray
    @grd setindex!(G, v, i)
end

function Base.firstindex(G::Guard{T}) where T<:AbstractArray
    @grd firstindex(G)
end

function Base.lastindex(G::Guard{T}) where T<: AbstractArray
    @grd lastindex(G)
end

# 
# AbstractArrays
# 
Base.supertype(::Type{Guard{T}}) where T<: AbstractArray = T

function Base.size(G::Guard{T}) where T<: AbstractArray
    @grd size(G)
end

function Base.IndexStyle(::Type{Guard{T}}) where T<: AbstractArray
    IndexStyle(T)
end

function Base.getindex(G::Guard{T}, I::Vararg{Int, N}) where {T<: AbstractArray, N}
    @grd getindex(G, I)
end

function Base.setindex!(G::Guard{T}, v, I::Vararg{Int, N}) where {T<: AbstractArray, N}
    @grd setindex!(G, v, I)
end

function Base.length(G::Guard{T}) where T <: AbstractArray
    @grd length(G)
end

# 
# Dicts
#
function Base.getindex(G::Guard{T}, key) where T <: AbstractDict
    @grd getindex(G, key)
end

function Base.setindex!(G::Guard{T}, value, key) where T <: AbstractDict
    @grd setindex!(G, value, key)
end

