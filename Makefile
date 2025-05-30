#!make

help: _header
	${info }
	@echo Opciones:
	@echo ----------------------
	@echo build / install
	@echo start / stop / restart
	@echo workspace
	@echo update
	@echo logs
	@echo clean
	@echo ----------------------

_header:
	@echo ---------
	@echo kanji-vue
	@echo ---------

_urls: _header
	${info }
	@echo ---------------------------
	@echo [Vue] http://localhost:5173
	@echo ---------------------------

build:
	@docker compose build --pull

install:
	@docker compose run --rm vue npm install

_start-command:
	@docker compose up -d

start: _start-command _urls

stop:
	@docker compose stop

restart: stop start

workspace:
	@docker compose run --rm vue /bin/bash

update:
	@docker compose run --rm vue /bin/sh -c 'npm update'
	@echo Generando commit...
	@sleep 5
	@git commit -a -m "Actualización de dependencias"

logs:
	@docker compose logs vue

clean:
	@docker compose down -v --remove-orphans
