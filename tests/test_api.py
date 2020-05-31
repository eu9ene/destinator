import pytest
from fastapi.testclient import TestClient
from api.main import api


def test_search_by_name():
    with TestClient(api) as client:
        response = client.post('/search/byname', json={'query': 'Jericho', 'count': 5, 'skip': 0})

        assert response.status_code == 200
        data = response.json()
        assert len(data) == 3
        assert 'Jericho Beach' in [v['name'] for v in data]


def test_search_by_ids():
    with TestClient(api) as client:
        response = client.post('/search/byname', json={'query': 'Jericho', 'count': 3})
        places_ids = [p['id'] for p in response.json()]

        response = client.post('/search/byids', json={'ids': places_ids})
        assert response.status_code == 200
        data = response.json()
        assert len(data) == len(places_ids)
        assert 'Jericho Beach' in [v['name'] for v in data]


def test_similar():
    with TestClient(api) as client:
        response = client.post('/search/byname', json={'query': 'Jericho', 'count': 1})
        place_id = response.json()[0]['id']

        response = client.post('/recs/similar', json={'id': place_id, 'count': 5})

        assert response.status_code == 200
        assert len(response.json()) == 5


def test_nearby():
    with TestClient(api) as client:
        response = client.post('/search/byname', json={'query': 'Jericho', 'count': 1})
        place_id = response.json()[0]['id']

        response = client.post('/recs/nearby', json={'id': place_id, 'count': 5})

        assert response.status_code == 200
        assert len(response.json()) == 5


def test_personal():
    with TestClient(api) as client:
        response = client.post('/search/byname', json={'query': 'Jericho', 'count': 1})
        places_ids = [p['id'] for p in response.json()]

        for p_id in places_ids:
            client.post('/myplaces/add', json={'id': p_id, 'type': 'loved'})
        response = client.post('/recs/personal', json={'count': 5})

        assert response.status_code == 200
        assert len(response.json()) == 5


@pytest.mark.parametrize('place_type', ['been', 'loved', 'bucketList'])
def test_my_places(place_type):
    with TestClient(api) as client:
        response = client.post('/search/byname', json={'query': 'Jericho', 'count': 1})
        places_ids = {p['id'] for p in response.json()}

        for p_id in places_ids:
            response = client.post('/myplaces/add', json={'id': p_id, 'type': place_type})
            assert response.status_code == 200

        response = client.post('/myplaces/places', json={'type': place_type})
        assert response.status_code == 200
        assert {p['id'] for p in response.json()} == places_ids

        response = client.post('/myplaces/ids', json={'type': place_type})
        assert response.status_code == 200
        assert {p_id for p_id in response.json()} == places_ids

        for p_id in places_ids:
            response = client.post('/myplaces/remove', json={'id': p_id, 'type': place_type})
            assert response.status_code == 200

        response = client.post('/myplaces/places', json={'type': place_type})
        assert response.status_code == 200
        assert response.json() == []

        response = client.post('/myplaces/ids', json={'type': place_type})
        assert response.status_code == 200
        assert response.json() == []
