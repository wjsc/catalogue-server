# catalogue-track-api

mongo
use catalogue
show collections
db.tracks.drop()
db.tracks.createIndex( { title: "text"} )

reset && mongod --dbpath=./catalogue-db --port 27017 --nojournal

curl -X POST -H "Content-Type: application/json" -d '{"path":"/dir/subdir/1","title":"Track N. 1","duration":"128"}' http://localhost:3001/track