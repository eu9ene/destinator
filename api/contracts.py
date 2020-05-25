from typing import Optional

from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str = Field(..., title='Search string')


class NearbyRequest(BaseModel):
    id: str = Field(..., title='Attraction id')


class SimilarRequest(BaseModel):
    id: str = Field(..., title='Attraction id')


class Attraction(BaseModel):
    id: str
    name: str
    rating: Optional[float]
    website: Optional[str]
    image: str
    description: str

