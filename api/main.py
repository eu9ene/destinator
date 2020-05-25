import logging
from typing import Optional, List
from api.config import AppConfig

import uvicorn
from fastapi import FastAPI, responses, HTTPException
from starlette_prometheus import metrics, PrometheusMiddleware
from pythonjsonlogger.jsonlogger import JsonFormatter
from fastapi.middleware.cors import CORSMiddleware

from api.contracts import SearchRequest, SimilarRequest, NearbyRequest, Attraction
from api.services import ElasticSearchService

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


@api.on_event("startup")
async def startup_event():
    global es_service
    es_service = ElasticSearchService(AppConfig.ES_HOST, AppConfig.ES_INDEX)


@api.on_event("shutdown")
def shutdown_event():
    pass


@api.get("/")
async def root():
    return responses.RedirectResponse('/docs')


@api.get("/status")
async def status():
    return responses.PlainTextResponse('alive')


@api.post("/search", response_model=List[Attraction])
async def search(request: SearchRequest):
    return es_service.search(request)


@api.post("/similar", response_model=List[Attraction])
async def similar(request: SimilarRequest):
    return es_service.similar(request)


@api.post("/nearby", response_model=List[Attraction])
async def nearby(request: NearbyRequest):
    return es_service.nearby(request)


if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=AppConfig.API_PORT)
