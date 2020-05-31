from typing import List

from fastapi import APIRouter
from fastapi import Depends

from api import di
from core.contracts import Place, SimilarRequest, NearbyRequest, PersonalRequest
from core.recommender import Recommender

router = APIRouter()


@router.post("/personal", response_model=List[Place])
async def personal(request: PersonalRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.personal(request)


@router.post("/similar", response_model=List[Place])
async def similar(request: SimilarRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.similar(request)


@router.post("/nearby", response_model=List[Place])
async def nearby(request: NearbyRequest, recommender: Recommender = Depends(di.get_recommender)):
    return recommender.nearby(request)
