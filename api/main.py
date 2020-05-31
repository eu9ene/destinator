import logging
from typing import Optional, List
from api.config import AppConfig

import uvicorn
from fastapi import FastAPI, responses, HTTPException
from starlette_prometheus import metrics, PrometheusMiddleware
from pythonjsonlogger.jsonlogger import JsonFormatter
from fastapi.middleware.cors import CORSMiddleware

from api.contracts import SearchRequest, SimilarRequest, NearbyRequest, Attraction, ByIdsRequest, AttractionLight, \
    AddPlaceRequest, GetMyPlacesRequest
from api.es_service import ElasticSearchService
from api.storage import Storage, InMemoryStorage

api = FastAPI()
api.add_middleware(PrometheusMiddleware)
api.add_route("/metrics", metrics)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

new_stream_handler = logging.StreamHandler()
new_stream_handler.setLevel(AppConfig.LOG_LEVEL)
new_stream_handler.setFormatter(JsonFormatter())

new_logger = logging.getLogger()
new_logger.setLevel(AppConfig.LOG_LEVEL)
new_logger.addHandler(new_stream_handler)

es_service = None  # type:  Optional[ElasticSearchService]
store = None  # type: Optional[Storage]


@api.on_event("startup")
async def startup_event():
    global es_service
    es_service = ElasticSearchService(AppConfig.ES_HOST, AppConfig.ES_INDEX)

    global store
    store = InMemoryStorage()


@api.on_event("shutdown")
def shutdown_event():
    pass


@api.get("/")
async def root():
    return responses.RedirectResponse('/docs')


@api.get("/status")
async def status():
    return responses.PlainTextResponse('alive')


@api.post("/search", response_model=List[AttractionLight])
async def search(request: SearchRequest):
    return es_service.search(request)


@api.post("/similar", response_model=List[Attraction])
async def similar(request: SimilarRequest):
    return es_service.similar(request)


@api.post("/nearby", response_model=List[Attraction])
async def nearby(request: NearbyRequest):
    return es_service.nearby(request)


@api.post("/byids", response_model=List[Attraction])
async def byids(request: ByIdsRequest):
    return es_service.byids(request)


@api.post("/myplacesids", response_model=List[str])
async def my_places_ids(request: GetMyPlacesRequest):
    return store.load('myplaces' + request.type)


@api.post("/myplaces", response_model=List[Attraction])
async def my_places(request: GetMyPlacesRequest):
    ids = await my_places_ids(request)
    if not ids:
        return []
    return es_service.byids(ByIdsRequest(ids=ids))


@api.post("/addmyplace")
async def add_my_place(request: AddPlaceRequest):
    key = 'myplaces' + request.type
    place_list = store.load(key)
    if not place_list:
        place_list = []

    place_list.append(request.id)
    store.save(key, place_list)


@api.post("/removemyplace")
async def remove_my_place(request: AddPlaceRequest):
    key = 'myplaces' + request.type
    place_list = store.load(key)
    if not place_list or request.id not in place_list:
        return

    place_list.remove(request.id)
    store.save(key, place_list)

if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=AppConfig.API_PORT)
