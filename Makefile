hosting:
	rm -rf ./public/
	mkdir -p ./public/
	mkdir -p ./public/pokemon63/
	cp -r ./.nuxt/dist/client ./public/pokemon63/_nuxt/
	cp -r ./src/static/ ./public/pokemon63/
	yarn firebase deploy --only hosting

build:
	yarn
	yarn build

deploy:
	gcloud builds submit --tag gcr.io/pokedri-minnnano63/web:1.0.0-alpha-1
	gcloud beta run deploy --image gcr.io/pokedri-minnnano63/web:1.0.0-alpha-1
