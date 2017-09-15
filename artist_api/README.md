# catalogue-artist-api

mongo
use catalogue
show collections
db.artists.drop()
db.artists.createIndex( { title: "text"} )

reset && mongod --dbpath=./catalogue-db --port 27017 --nojournal

