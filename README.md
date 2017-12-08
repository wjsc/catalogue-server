# catalogue-server

mongo
use catalogue
show collections
db.albums.drop()
db.albums.createIndex( { title: "text"} )

reset && mongod --dbpath=./catalogue-db --port 27017 --nojournal

