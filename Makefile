.PHONY: up start down stop restart logs clean rm-images reset all

COMPOSE = docker compose

all: up

up:
	$(COMPOSE) up --build

start:
	$(COMPOSE) up

down:
	$(COMPOSE) down

stop:
	$(COMPOSE) stop

restart:
	$(COMPOSE) down
	$(COMPOSE) up --build

logs:
	$(COMPOSE) logs -f --tail=100

clean:
	$(COMPOSE) down --volumes --remove-orphans

rm-images:
	$(COMPOSE) down --rmi local --remove-orphans

reset:
	$(COMPOSE) down --rmi local --volumes --remove-orphans
	$(COMPOSE) up --build
