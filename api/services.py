from typing import Dict

from elasticsearch import Elasticsearch

from api.contracts import SearchRequest, Attraction, NearbyRequest, SimilarRequest, ByIdRequest


class ElasticSearchService:
    def __init__(self, hosts: Dict, index: str):
        self._index = index
        self._es = Elasticsearch(hosts=hosts)

    def byid(self, request: ByIdRequest):
        query = {
            "query": {
                "term": {
                    "_id": {
                        "value": request.id
                    }
                }

            }
        }

        attrs = self._search_attrs(query)
        return attrs[0]

    def search(self, request: SearchRequest):
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

        attrs = self._search_attrs(query)

        return attrs

    def similar(self, request: SimilarRequest):
        query = {
            "query": {
                "term": {
                    "_id": {
                        "value": request.id
                    }
                }

            }
        }

        res = self._es.search(index=self._index, body=query)

        emb = res['hits']['hits'][0]['_source']['embedding']

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

        attrs = self._search_attrs(query)

        return attrs

    def nearby(self, request: NearbyRequest):
        query = {
            "query": {
                "term": {
                    "_id": {
                        "value": request.id
                    }
                }

            }
        }

        res = self._es.search(index=self._index, body=query)

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
                                "lat": res['hits']['hits'][0]['_source']['latitude'],
                                "lon": res['hits']['hits'][0]['_source']['longitude']
                            }
                        }
                    }
                }
            }
        }

        attrs = self._search_attrs(query)

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

    def _search_attrs(self, query):
        res = self._es.search(index=self._index, body=query)
        attrs = [Attraction(id=hit['_id'],
                            name=hit["_source"]['name'],
                            rating=hit["_source"].get('rating') or None,
                            website=hit["_source"].get('website') or "",
                            image=self._get_photo(hit),
                            description=hit["_source"].get('description') or "")

                 for hit in res['hits']['hits']]
        return attrs
