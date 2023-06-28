import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

// adds an item into items table, being passed in the name and date, we don't need to pass id as this autoincrements
// you could also pass this a state object that updates a modal/toast to say it's completed, but its clear when you see it being rendered
async function addItem(name, date) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO items (name, date) values (?, ?)",
      [name, date],
      (txObj, data) => {
        console.log(data);
      },
      () => {
        console.log("Error");
      }
    );
  });
}

// delete an item from items table, being passed in the id
// you could also pass this a state object that updates a modal/toast to say it's completed
async function deleteItem(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM items WHERE id = ?",
      [id],
      (txObj, { rows: { _array } }) => {
        console.log(_array);
      },
      () => {
        console.log("Error");
      }
    );
  });
}

// Creates the items table if it doesn't already exist. Note that date is an integer as SQLite has no date type
// you could also pass this a state object that updates a modal/toast to say it's completed// you could also pass this a state object that updates a modal/toast to say it's completed// you could also pass this a state object that updates a modal/toast to say it's completed// you could also pass this a state object that updates a modal/toast to say it's completed
async function createDatabase() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date INTEGER)",
      null,
      () => {
        console.log(
          "Success - Database exists or Created DB"
        );
      },
      () => {
        console.log("Error");
      }
    );
  });
}

//selects all the items from the items table
//it is passed a callback function that updates the state of the list
async function selectAllItems(setItemData) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM items ORDER BY date DESC",
        null,
        (txObj, { rows: { _array } }) => {
          console.log(_array);
          setItemData(_array);
        },
        null,
        null
      );
    },
    (_t, error) => {
      console.log("db error load items");
      console.log(error);
    },
    (_t, _success) => {
      console.log("loaded items");
    }
  );
}

//wrap all these functions up in an object
export const sql_database = {
  selectAllItems,
  addItem,
  deleteItem,
  createDatabase,
};
