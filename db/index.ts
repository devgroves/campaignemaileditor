import path from "path";
import Datastore from "nedb";

const db = new Datastore({
  filename: path.join(__dirname, "public/db/items.db"),
  autoload: true,
});
console.log('db :>> ', db);
db.loadDatabase((err) => {
  if (err) {
    console.error("Database load error: ", err);
  } else {
    console.log("Database loaded successfully.");
  }
});

export default db;
