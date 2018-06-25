install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

build:
	npm run build

publish:
	npm publish

lint:
	npm run eslint  -- src

test:
	npm test