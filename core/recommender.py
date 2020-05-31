from typing import List

from core.contracts import PersonalRequest, PlaceType, GetMyPlacesRequest, SimilarRequest, Place, NearbyRequest
from core.es_service import ElasticSearchService
from core.my_places import MyPlacesStore

import numpy as np


class Recommender:
    def __init__(self, my_places: MyPlacesStore, es_service: ElasticSearchService):
        self._es_service = es_service
        self._my_places = my_places

    async def personal(self, request: PersonalRequest):
        places_ids = await self._my_places.my_places_ids(GetMyPlacesRequest(type=PlaceType.loved))
        docs = self._es_service.get_docs_by_ids(places_ids)

        embs = np.array([doc['_source']['embedding'] for doc in docs])
        mean_emb = embs.mean(axis=0)

        return self._es_service.search_by_emb(mean_emb, count=request.count, skip=request.skip)

    async def similar(self, request: SimilarRequest) -> List[Place]:
        res = self._es_service.get_docs_by_ids([request.id])[0]
        emb = res['_source']['embedding']
        return self._es_service.search_by_emb(emb, request.count, request.skip)

    async def nearby(self, request: NearbyRequest) -> List[Place]:
        doc = self._es_service.get_docs_by_ids([request.id])[0]
        return self._es_service.search_by_geo(latitude=doc['_source']['latitude'],
                                              longitude=doc['_source']['longitude'],
                                              count=request.count, skip=request.skip)
