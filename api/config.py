import os


class AppConfig:
    API_PORT = int(os.getenv('API_PORT', 5000))
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

    ES_HOST = os.getenv('ES_HOST', '0.0.0.0:9200')
    ES_INDEX = 'ta-embs'
