from typing import List

from fastapi import APIRouter
from fastapi import Depends

from api import di
from core.contracts import Place, AddPlaceRequest, RemovePlaceRequest
from core.contracts import GetMyPlacesRequest
from core.es_service import ElasticSearchService
from core.my_places import MyPlacesStore

router = APIRouter()


@router.post("/ids", response_model=List[str])
async def my_places_ids(request: GetMyPlacesRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    return store.my_places_ids(request)


@router.post("/places", response_model=List[Place])
async def my_places(request: GetMyPlacesRequest, store: MyPlacesStore = Depends(di.get_myplaces),
                    es_service: ElasticSearchService = Depends(di.get_es_service)):
    ids = store.my_places_ids(request)
    if not ids:
        return []
    return es_service.get_places_by_ids(ids)


@router.post("/add")
async def add_my_place(request: AddPlaceRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    store.add_my_place(request)


@router.post("/remove")
async def remove_my_place(request: RemovePlaceRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    store.remove_my_place(request)
