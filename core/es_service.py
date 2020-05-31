from typing import Dict, List

from elasticsearch import Elasticsearch

from core.contracts import Place, PlaceLight


class ElasticSearchService:
    def __init__(self, hosts: Dict, index: str):
        self._index = index
        self._es = Elasticsearch(hosts=hosts)

    def get_places_by_ids(self, places_ids: List[str]) -> List[Place]:
        docs = self.get_docs_by_ids(places_ids)
        attrs = self._get_attrs(docs)

        return attrs

    def get_docs_by_ids(self, docs_ids: List[str]) -> List[Dict]:
        body = {
            "ids": docs_ids
        }

        res = self._es.mget(index=self._index, body=body)
        return res['docs']

    def search_by_name(self, name: str, count: int, skip: int) -> List[PlaceLight]:
        query = {
            "size": count,
            "from": skip,
            "query": {
                "bool": {
                    "must": [{
                        "match": {
                            "category": "attraction"
                        }
                    },
                        {
                            "match": {
                                "name": name
                            }
                        }]
                }
            }
        }

        res = self._es.search(index=self._index, body=query)
        attrs = [PlaceLight(id=hit['_id'], name=hit["_source"]['name'])
                 for hit in res['hits']['hits']]

        return attrs

    def search_by_emb(self, emb: List[float], count: int, skip: int) -> List[Place]:
        query = {
            "size": count,
            "from": skip,
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

    def search_by_geo(self, latitude: float, longitude: float, count: int, skip: int) -> List[Place]:
        query = {
            "size": count,
            "from": skip,
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
                                "lat": latitude,
                                "lon": longitude
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
        attrs = [Place(id=hit['_id'],
                       name=hit["_source"]['name'],
                       rating=hit["_source"].get('rating') or None,
                       website=hit["_source"].get('website') or "",
                       image=self._get_photo(hit),
                       description=hit["_source"].get('description') or "")

                 for hit in docs]
        return attrs
