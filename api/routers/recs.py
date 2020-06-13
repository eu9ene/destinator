from typing import List

from fastapi import APIRouter
from fastapi import Depends

from api import di
from core.contracts import Place, SimilarRequest, NearbyRequest, PlacesRequest, TopRequest
from core.recommender import Recommender

router = APIRouter()


@router.post("/personal", response_model=List[Place])
async def personal(request: PlacesRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.personal(request)


@router.post("/top", response_model=List[Place])
async def top(request: TopRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.top(request)


@router.post("/similar", response_model=List[Place])
async def similar(request: SimilarRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.similar(request)


@router.post("/nearby", response_model=List[Place])
async def nearby(request: NearbyRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.nearby(request)
