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

    def get_doc_by_id(self, doc_id: str) -> Dict:
        res = self._es.get(index=self._index, id=doc_id)
        return res

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

    def search_by_emb(self, emb: List[float], exclude: List[str],
                      count: int, skip: int = 0,
                      geo_bounds: Dict = None) -> List[Place]:

        filter = {
            "must": [
                {
                    "match": {
                        "category": "attraction"
                    }
                }

            ],
            "must_not": [
                {
                    "ids": {
                        "values": exclude

                    }
                }
            ]
        }

        if geo_bounds:
            filter['filter'] = {
                "geo_bounding_box": {
                    "location": {
                        "top_left": {'lat': geo_bounds['nw']['lat'],
                                     'lon': geo_bounds['nw']['lng']},
                        "bottom_right": {'lat': geo_bounds['se']['lat'],
                                         'lon': geo_bounds['se']['lng']}
                    }
                }
            }

        query = {
            "size": count,
            "from": skip,
            "query": {
                "script_score": {
                    "query": {
                        "bool": filter
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

    def get_with_sort(self, sort_field: str,
                      count: int, skip: int = 0,
                      geo_bounds: Dict = None) -> List[Place]:

        filter = {
            "must": [
                {
                    "match": {
                        "category": "attraction"
                    }
                }

            ]
        }

        if geo_bounds:
            filter['filter'] = {
                "geo_bounding_box": {
                    "location": {
                        "top_left": {'lat': geo_bounds['nw']['lat'],
                                     'lon': geo_bounds['nw']['lng']},
                        "bottom_right": {'lat': geo_bounds['se']['lat'],
                                         'lon': geo_bounds['se']['lng']}
                    }
                }
            }

        query = {
            "size": count,
            "from": skip,
            "sort": [
                {f"{sort_field}": "desc"}
            ],
            "query": {
                "bool": filter
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
    def _get_photo(hit, size):
        if 'photo' not in hit['_source'] or not hit['_source']['photo']:
            return "", ""
        if 'images' not in hit['_source']['photo']:
            return "", ""

        photos = hit['_source']['photo']['images']
        if size not in photos:
            return ''

        return photos[size]['url']

    def _get_attrs(self, docs: List[Dict]) -> List[Place]:
        attrs = [Place(id=hit['_id'],
                       name=hit["_source"]['name'],
                       rating=hit["_source"].get('rating') or None,
                       website=hit["_source"].get('website') or "",
                       imageMedium=self._get_photo(hit, 'medium'),
                       imageLarge=self._get_photo(hit, 'large'),
                       description=hit["_source"].get('description') or "",
                       latitude=hit["_source"]['latitude'],
                       longitude=hit["_source"]['longitude'],
                       tripadvisorUrl=hit["_source"].get('web_url', ""),
                       numReviews=hit["_source"]['num_reviews'],
                       tags=[tag['tag']
                             for tag in sorted([tag for tag in hit["_source"]['tags'] if tag['weight'] > 0.1],
                                               key=lambda t: t['weight'], reverse=True)])

                 for hit in docs]
        return attrs
