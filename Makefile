# required to use pnpm with cloudflare pages
# https://canary.discord.com/channels/595317990191398933/789155108529111069/882111571474657341
SHELL := /bin/bash

.PHONY: build
build: install
	@pnpm -r run build

.PHONY: install
install:
	@npm install -g pnpm
	@pnpm install