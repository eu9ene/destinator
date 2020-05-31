from enum import Enum
from typing import Optional, List

from pydantic import BaseModel, Field


class PlaceType(str, Enum):
    been = 'been'
    loved = 'loved'
    bucketList = 'bucketList'


class SearchRequest(BaseModel):
    query: str = Field(..., title='Search string')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class NearbyRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class PersonalRequest(BaseModel):
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class ByIdsRequest(BaseModel):
    ids: List[str] = Field(..., title='Attraction ids')


class AddPlaceRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    type: PlaceType = Field(..., title='My places type')


class RemovePlaceRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    type: PlaceType = Field(..., title='My places type')


class GetMyPlacesRequest(BaseModel):
    type: PlaceType = Field(..., title='My places type')


class SimilarRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class Place(BaseModel):
    id: str
    name: str
    rating: Optional[float]
    website: Optional[str]
    image: str
    description: str


class PlaceLight(BaseModel):
    id: str
    name: str
