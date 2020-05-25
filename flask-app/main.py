from typing import NamedTuple, Optional

from flask import Flask, render_template, request
from elasticsearch import Elasticsearch

es = Elasticsearch()

app = Flask(__name__)


class Attraction(NamedTuple):
    id: str
    name: str
    rating: Optional[float]
    website: Optional[str]
    image: str


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search():
    query_str = request.form['query']

    query  = {
        "query": {
            "bool": {
                "must": [{
                    "match": {
                        "category": "attraction"
                    }
                },
                    {
                        "match": {
                            "name": query_str
                        }
                    }]
            }
        }
    }

    attrs = search_attrs(query)

    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('index.html', attractions=attrs)


def get_photo(hit):
    if 'photo' not in hit['_source'] or not hit['_source']['photo']:
        return ""

    if 'images' not in hit['_source']['photo']:
        return ""

    photos = hit['_source']['photo']['images']

    if "small" in photos:
        return photos['small']['url']

    return ""

def search_attrs(query):
    res = es.search(index="ta-embs", body=query)
    attrs = [Attraction(hit['_id'],
                        hit["_source"]['name'],
                        hit["_source"].get('rating') or "",
                        hit["_source"].get('website') or "",
                        get_photo(hit))

             for hit in res['hits']['hits']]
    return attrs


@app.route('/similar/<id>', methods=['POST'])
def similar(id):
    query = {
        "query": {
            "term": {
                "_id": {
                    "value": id
                }
            }

        }
    }

    res = es.search(index="ta-embs", body=query)

    emb = res['hits']['hits'][0]['_source']['embedding']

    query = {
        "size": 10,
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

    attrs = search_attrs(query)

    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('index.html', attractions=attrs)



@app.route('/nearby/<id>', methods=['POST'])
def nearby(id):
    query = {
        "query": {
            "term": {
                "_id": {
                    "value": id
                }
            }

        }
    }

    res = es.search(index="ta-embs", body=query)

    query = {
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

    attrs = search_attrs(query)

    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('index.html', attractions=attrs)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
