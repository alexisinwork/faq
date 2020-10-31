info: usage

PWD := $(shell pwd)

usage:
	@echo " make build              Build dependencies."
	@echo " make run                Start the server."
	@echo " make test               Runs all jest tests."
	@echo " make logs               Application logs."

build: do_build
run: do_run
test: do_tests
logs: do_logs

do_build:
	docker-compose down
	docker-compose build
	docker run -w=/app -v=$(PWD)/backend/:/app node:lts-alpine npm install
	docker run -w=/app -v=$(PWD)/frontend/:/app node:lts-alpine npm install

do_logs:
	docker-compose logs --tail=5 -f

do_run:
	docker-compose up -d

do_tests:
	docker run -w=/app -v=$(PWD)/backend/:/app node:lts-alpine npm run test
	docker run -w=/app -v=$(PWD)/frontend/:/app node:lts-alpine npm run test
