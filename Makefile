.PHONY: up up-all up-frontend up-chatbot up-strapi up-front-cms up-build up-build-front-cms down logs build build-no-chatbot build-strapi prod prod-build

COMPOSE = COMPOSE_BAKE=false docker compose
POSTGRES_CONTAINER = book-postgres-1

up:
	$(MAKE) up-all

up-all:
	$(COMPOSE) up

up-frontend:
	$(COMPOSE) up frontend --no-deps

up-chatbot:
	$(COMPOSE) up backend

up-strapi:
	$(COMPOSE) up strapi

up-front-cms:
	$(COMPOSE) up -d postgres
	@printf 'Waiting for PostgreSQL to become healthy'
	@until [ "$$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}starting{{end}}' $(POSTGRES_CONTAINER) 2>/dev/null)" = "healthy" ]; do \
		printf '.'; \
		sleep 2; \
	done
	@printf '\n'
	$(COMPOSE) up frontend strapi --no-deps

up-build:
	$(COMPOSE) up --build

up-build-front-cms:
	$(COMPOSE) up -d postgres
	@printf 'Waiting for PostgreSQL to become healthy'
	@until [ "$$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}starting{{end}}' $(POSTGRES_CONTAINER) 2>/dev/null)" = "healthy" ]; do \
		printf '.'; \
		sleep 2; \
	done
	@printf '\n'
	$(COMPOSE) up --build frontend strapi --no-deps

down:
	$(COMPOSE) down --remove-orphans

logs:
	$(COMPOSE) logs -f --tail=100 frontend backend strapi postgres

build:
	$(COMPOSE) build backend frontend frontend-prod strapi

build-no-chatbot:
	$(COMPOSE) build frontend frontend-prod

build-strapi:
	$(COMPOSE) build strapi

prod:
	$(COMPOSE) --profile prod up frontend-prod backend

prod-build:
	$(COMPOSE) build backend frontend-prod
	$(COMPOSE) --profile prod up --build frontend-prod backend
