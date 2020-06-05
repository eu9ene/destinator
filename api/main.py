import logging

import uvicorn
from fastapi import FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware
from pythonjsonlogger.jsonlogger import JsonFormatter
from starlette_prometheus import metrics, PrometheusMiddleware

from api import di
from api.config import AppConfig
from api.routers import myplaces, search, recs, secrets

api = FastAPI()

api.add_middleware(PrometheusMiddleware)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api.add_route("/metrics", metrics)
api.include_router(myplaces.router, prefix="/myplaces", tags=["myplaces"])
api.include_router(search.router, prefix="/search", tags=["search"])
api.include_router(recs.router, prefix="/recs", tags=["recommendations"])
api.include_router(secrets.router, prefix="/secrets", tags=["secrets"])

new_stream_handler = logging.StreamHandler()
new_stream_handler.setLevel(AppConfig.LOG_LEVEL)
new_stream_handler.setFormatter(JsonFormatter())

new_logger = logging.getLogger()
new_logger.setLevel(AppConfig.LOG_LEVEL)
new_logger.addHandler(new_stream_handler)


@api.on_event("startup")
async def startup_event():
    di.init()


@api.on_event("shutdown")
async def shutdown_event():
    di.shutdown()


@api.get("/")
async def root():
    return responses.RedirectResponse('/docs')


@api.get("/status")
async def status():
    return responses.PlainTextResponse('alive')


if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=AppConfig.API_PORT)
