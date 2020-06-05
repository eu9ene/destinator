from typing import List

from core.contracts import PersonalRequest, PlaceType, GetMyPlacesRequest, SimilarRequest, Place, NearbyRequest
from core.es_service import ElasticSearchService
from core.my_places import MyPlacesStore

import numpy as np


class Recommender:
    def __init__(self, my_places: MyPlacesStore, es_service: ElasticSearchService):
        self._es_service = es_service
        self._my_places = my_places

    def personal(self, request: PersonalRequest) -> List[Place]:
        loved_ids = self._my_places.my_places_ids(GetMyPlacesRequest(type=PlaceType.loved))
        if not loved_ids:
            return []

        docs = self._es_service.get_docs_by_ids(loved_ids)
        embs = np.array([doc['_source']['embedding'] for doc in docs])
        mean_emb = embs.mean(axis=0)

        been_ids = self._my_places.my_places_ids(GetMyPlacesRequest(type=PlaceType.been))

        return self._es_service.search_by_emb(mean_emb, exclude=loved_ids+been_ids,
                                              count=request.count, skip=request.skip,
                                              geo_bounds=request.geoBounds)

    def similar(self, request: SimilarRequest) -> List[Place]:
        res = self._es_service.get_doc_by_id(request.id)
        emb = res['_source']['embedding']
        return self._es_service.search_by_emb(emb, exclude=[request.id], count=request.count, skip=request.skip,
                                              geo_bounds=request.geoBounds)

    def nearby(self, request: NearbyRequest) -> List[Place]:
        doc = self._es_service.get_doc_by_id(request.id)
        return self._es_service.search_by_geo(latitude=doc['_source']['latitude'],
                                              longitude=doc['_source']['longitude'],
                                              count=request.count, skip=request.skip)
