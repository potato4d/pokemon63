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

ssr:
	gcloud builds submit --tag gcr.io/pokedri-minnnano63/web:1.2.0
	gcloud beta run deploy web --image gcr.io/pokedri-minnnano63/web:1.2.0 --region asia-northeast1 --platform managed --quiet

deploy:
	rm .env
	cp .env.production .env
	make build
	make ssr
	make hosting
	yarn firebase deploy
	rm .env
	cp .env.sample .env

create-data:
	yarn ts-node ./.cli/__001_flatten_images.ts
	sleep 60
	yarn ts-node ./.cli/__002_addframe.ts
	sleep 30
	yarn ts-node ./.cli/__004_autocrop.ts
	sleep 30
	yarn ts-node ./.cli/dex/__001_diet.ts
	sleep 5
	yarn ts-node ./.cli/dex/__002_flatten_dex.ts
	sleep 5
	yarn ts-node ./.cli/dex/__003_phash.ts
	sleep 5
	yarn ts-node ./.cli/dex/__004_dexgen.ts
