class Storage:
    def save(self, key, data):
        raise NotImplementedError()

    def load(self, key):
        raise NotImplementedError()


class InMemoryStorage:
    def __init__(self):
        self.store = dict()

    def save(self, key, data):
        self.store[key] = data

    def load(self, key):
        return self.store.get(key)
