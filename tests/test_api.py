from fastapi.testclient import TestClient
from api.main import api


def test_search():
    with TestClient(api) as client:
        response = client.post('/search/byname', json={
            'query': 'Jericho',
            'count': 5,
            'skip': 0
        })

        assert response.status_code == 200
        data = response.json()
        assert len(data) == 3
        assert 'Jericho Beach' in [v['name'] for v in data]
