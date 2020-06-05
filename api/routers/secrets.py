from fastapi import APIRouter

from api.config import AppConfig

router = APIRouter()


@router.post("/load", response_model=str)
async def load():
    return AppConfig.GOOGLE_API_TOKEN


