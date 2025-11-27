# Source - https://stackoverflow.com/a
# Posted by Lazaro Fernandes Lima Suleiman
# Retrieved 2025-11-26, License - CC BY-SA 4.0

set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$MONGO_INITDB_USER',
  pwd: '$MONGO_INITDB_PWD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})

db.createCollection("tables_collection")
db.createCollection("players_collection")

db.tables_collection.insertMany([
  {
    name: "Noobs",
    small_blind: 10,
    big_blind: 20
  },
  {
    name: "Rookies",
    small_blind: 20,
    big_blind: 40
  },
  {
    name: "Masters",
    small_blind: 100,
    big_blind: 200
  }
])