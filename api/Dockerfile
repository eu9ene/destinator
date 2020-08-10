FROM python:3.6.1

WORKDIR /app

ADD ./poetry.lock ./
ADD ./pyproject.toml ./

RUN pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev --no-interaction --no-ansi

ADD api ./api
ADD core ./core


ENV PYTHONPATH "${PYTHONPATH}:/app"
EXPOSE 8000


