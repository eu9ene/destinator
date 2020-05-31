from typing import List

from fastapi import APIRouter
from fastapi import Depends

from api import di
from core.contracts import Place, AddPlaceRequest, RemovePlaceRequest
from core.contracts import GetMyPlacesRequest
from core.my_places import MyPlacesStore

router = APIRouter()


@router.post("/ids", response_model=List[str])
async def my_places_ids(request: GetMyPlacesRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    return store.my_places_ids(request)


@router.post("/places", response_model=List[Place])
async def my_places(request: GetMyPlacesRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    return store.my_places(request)


@router.post("/add")
async def add_my_place(request: AddPlaceRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    await store.add_my_place(request)


@router.post("/remove")
async def remove_my_place(request: RemovePlaceRequest, store: MyPlacesStore = Depends(di.get_myplaces)):
    await store.remove_my_place(request)
