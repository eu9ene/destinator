from typing import List

from fastapi import APIRouter
from fastapi import Depends

from api import di
from core.contracts import Place, ByIdsRequest, TagRequest
from core.contracts import PlaceLight, SearchRequest
from core.es_service import ElasticSearchService

router = APIRouter()


@router.post("/byname", response_model=List[PlaceLight])
async def search(request: SearchRequest, es_service: ElasticSearchService = Depends(di.get_es_service)):
    return es_service.search_by_name(request.query, count=request.count, skip=request.skip)


@router.post("/bytag", response_model=List[Place])
async def bytag(request: TagRequest, es_service: ElasticSearchService = Depends(di.get_es_service)):
    return es_service.search_by_tag(request.tag, geo_bounds=request.geoBounds, count=request.count, skip=request.skip)


@router.post("/byids", response_model=List[Place])
async def byids(request: ByIdsRequest, es_service: ElasticSearchService = Depends(di.get_es_service)):
    return es_service.get_places_by_ids(request.ids)
