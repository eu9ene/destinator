from typing import Optional, List

from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str = Field(..., title='Search string')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class NearbyRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class ByIdsRequest(BaseModel):
    ids: List[str] = Field(..., title='Attraction ids')


class AddPlaceRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    type: str = Field(..., title='My places type')


class RemovePlaceRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    type: str = Field(..., title='My places type')


class GetMyPlacesRequest(BaseModel):
    type: str = Field(..., title='My places type')


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


class AttractionLight(BaseModel):
    id: str
    name: str
