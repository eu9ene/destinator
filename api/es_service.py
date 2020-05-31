from typing import Dict, List

from elasticsearch import Elasticsearch

from api.contracts import SearchRequest, Attraction, NearbyRequest, SimilarRequest, ByIdsRequest, AttractionLight


class ElasticSearchService:
    def __init__(self, hosts: Dict, index: str):
        self._index = index
        self._es = Elasticsearch(hosts=hosts)

    def byids(self, request: ByIdsRequest):
        body = {
            "ids": request.ids
        }

        res = self._es.mget(index=self._index, body=body)
        attrs = self._get_attrs(res['docs'])

        return attrs

    def search(self, request: SearchRequest) -> List[AttractionLight]:
        query = {
            "size": request.count,
            "from": request.skip,
            "query": {
                "bool": {
                    "must": [{
                        "match": {
                            "category": "attraction"
                        }
                    },
                        {
                            "match": {
                                "name": request.query
                            }
                        }]
                }
            }
        }

        res = self._es.search(index=self._index, body=query)
        attrs = [AttractionLight(id=hit['_id'], name=hit["_source"]['name'])
                 for hit in res['hits']['hits']]

        return attrs

    def similar(self, request: SimilarRequest) -> List[Attraction]:
        res = self._es.get(index=self._index, id=request.id)
        emb = res['_source']['embedding']

        query = {
            "size": request.count,
            "from": request.skip,
            "query": {
                "script_score": {
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "match": {
                                        "category": "attraction"
                                    }
                                }
                            ]
                        }
                    },
                    "script": {
                        "source": "cosineSimilarity(params.queryVector, 'embedding')+1.0",
                        "params": {
                            "queryVector": emb
                        }
                    }
                }
            }
        }

        res = self._es.search(index=self._index, body=query)
        attrs = self._get_attrs(res['hits']['hits'])

        return attrs

    def nearby(self, request: NearbyRequest) -> List[Attraction]:
        res = self._es.get(index=self._index, id=request.id)

        query = {
            "size": request.count,
            "from": request.skip,
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            "category": "attraction"
                        }
                    },
                    "should": {
                        "distance_feature": {
                            "field": "location",
                            "pivot": "1000m",
                            "origin": {
                                "lat": res['_source']['latitude'],
                                "lon": res['_source']['longitude']
                            }
                        }
                    }
                }
            }
        }
        res = self._es.search(index=self._index, body=query)
        attrs = self._get_attrs(res['hits']['hits'])

        return attrs

    @staticmethod
    def _get_photo(hit):
        if 'photo' not in hit['_source'] or not hit['_source']['photo']:
            return ""

        if 'images' not in hit['_source']['photo']:
            return ""

        photos = hit['_source']['photo']['images']

        if "medium" in photos:
            return photos['medium']['url']

        return ""

    def _get_attrs(self, docs):
        attrs = [Attraction(id=hit['_id'],
                            name=hit["_source"]['name'],
                            rating=hit["_source"].get('rating') or None,
                            website=hit["_source"].get('website') or "",
                            image=self._get_photo(hit),
                            description=hit["_source"].get('description') or "")

                 for hit in docs]
        return attrs
