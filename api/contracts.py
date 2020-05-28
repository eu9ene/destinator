from typing import Optional

from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str = Field(..., title='Search string')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class NearbyRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class ByIdRequest(BaseModel):
    id: str = Field(..., title='Attraction id')


class SimilarRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class Attraction(BaseModel):
    id: str
    name: str
    rating: Optional[float]
    website: Optional[str]
    image: str
    description: str
