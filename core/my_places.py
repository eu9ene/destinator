from core.contracts import GetMyPlacesRequest, AddPlaceRequest, RemovePlaceRequest, PlaceType
from core.es_service import ElasticSearchService
from core.storage import Storage


class MyPlacesStore:
    def __init__(self, storage: Storage, es_service: ElasticSearchService):
        self._es_service = es_service
        self._store = storage

    async def my_places_ids(self, request: GetMyPlacesRequest):
        key = self._get_key(request.type)
        data = self._store.load(key)
        return list(data) if data is not None else []

    async def my_places(self, request: GetMyPlacesRequest):
        ids = await self.my_places_ids(request)
        if not ids:
            return []
        return self._es_service.get_places_by_ids(ids)

    async def add_my_place(self, request: AddPlaceRequest):
        key = self._get_key(request.type)
        place_list = self._store.load(key)
        if not place_list:
            place_list = set()

        place_list.add(request.id)
        self._store.save(key, place_list)

    async def remove_my_place(self, request: RemovePlaceRequest):
        key = self._get_key(request.type)
        place_list = self._store.load(key)
        if not place_list or request.id not in place_list:
            return

        place_list.remove(request.id)
        self._store.save(key, place_list)

    @staticmethod
    def _get_key(place_type: PlaceType):
        return 'myplaces' + place_type.name
