## I. Build:
1. Run ```docker-compose build```.
2. Run ```docker-compose up -V```.

## II. Load data from AlgoRolo:
1. Make sure containers are working (point **Build.2**).
2. Run ```docker-compose run server node algoRoloLoader.js AlgoRolo/\AlgoAppDB.json```.

## III. Remove MongoDB database:
1. Run ```docker volume rm algoresinfo_mongo_data```.