from enum import Enum
from typing import Optional, List, Dict

from pydantic import BaseModel, Field


class PlaceType(str, Enum):
    been = 'been'
    loved = 'loved'
    bucketList = 'bucketList'


class SortType(str, Enum):
    rating = 'rating'
    reviews = 'reviews'


class PagedRequest(BaseModel):
    count: int = Field(..., title='Number of items')
    skip: int = Field(0, title='Number of items ot skip')


class SearchRequest(PagedRequest):
    query: str = Field(..., title='Search string')


class NearbyRequest(PagedRequest):
    id: str = Field(..., title='Attraction id')


class PlacesRequest(PagedRequest):
    geoBounds: Optional[Dict[str, Dict[str, float]]] = Field(..., title='Geo bounds')


class ByIdsRequest(BaseModel):
    ids: List[str] = Field(..., title='Attraction ids')


class AddPlaceRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    type: PlaceType = Field(..., title='My places place_type')


class RemovePlaceRequest(BaseModel):
    id: str = Field(..., title='Attraction id')
    type: PlaceType = Field(..., title='My places place_type')


class GetMyPlacesRequest(BaseModel):
    type: PlaceType = Field(..., title='My places place_type')


class SimilarRequest(PlacesRequest):
    id: str = Field(..., title='Attraction id')


class TopRequest(PlacesRequest):
    sort: SortType = Field(..., title='Sort type')


class Place(BaseModel):
    id: str
    name: str
    rating: Optional[float]
    website: Optional[str]
    imageMedium: Optional[str]
    imageLarge: Optional[str]
    description: str
    latitude: float
    longitude: float
    tripadvisorUrl: str
    numReviews: int


class PlaceLight(BaseModel):
    id: str
    name: str
