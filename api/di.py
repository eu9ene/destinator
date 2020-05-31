from typing import Optional

from api.config import AppConfig
from core.es_service import ElasticSearchService
from core.my_places import MyPlacesStore
from core.recommender import Recommender
from core.storage import Storage, InMemoryStorage

container = None  # type: Optional[DiContainer]


def init():
    global container
    container = DiContainer()


def shutdown():
    global container
    container.shutdown()


def get_es_service() -> ElasticSearchService:
    return container.es_service


def get_store() -> Storage:
    return container.store


def get_myplaces() -> MyPlacesStore:
    return container.my_places


def get_recommender() -> Recommender:
    return container.recommender


class DiContainer:
    def __init__(self):
        self.es_service = ElasticSearchService(AppConfig.ES_HOST, AppConfig.ES_INDEX)
        self.store = InMemoryStorage()
        self.my_places = MyPlacesStore(self.store, self.es_service)
        self.recommender = Recommender(self.my_places, self.es_service)

    def shutdown(self):
        pass
