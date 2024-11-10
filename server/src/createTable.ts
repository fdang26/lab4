import sqlite3 from "sqlite3";
import {open} from "sqlite";
//sqlite4 is the main module that allows SQL to be used in Node.js enviornment
//open is a helper funciton that uses promises to work k with the sqlite3 module,
//allowing asynchronous interactions with the database.(uses async/await)


///Purpose of initDB: This is an async function
//that initializes and returns a database connection.
 
//parts that make up the db part


//`filename: "database.sqlite"`: This specifies the name of the database file.
//If this file doesn’t exist, SQLite will create it in the same directory as this code.
//`driver: sqlite3.Database`: This sets `sqlite3.Database` as the driver, allowing
// SQLite commands to be executed on the database.

const initDB = async () =>
    {
// await open(...)`: This line of code is asynchronous. It tells JavaScript
//wait for the `open` function to finish creating the connection to the database.
//However, unlike synchronous code, JavaScript doesn’t actually pause everything
// else—it simply waits for the database connection while allowing other code to run
// if needed"


        // Open the databse connection
        const db = await open({
            filename: "database.sqlite",
            driver: sqlite3.Database,
          });

//Using `async/await` is helpful because it prevents your
//program from “blocking” or stopping while waiting for slower tasks,
//like connecting to a database or retrieving data.

// Create a "budget" table if it doesn't exist
//db.exec executes a sql command for a new table

/*


`CREATE TABLE IF NOT EXISTS`: This SQL command creates a table only if it doesn’t already exist. The table is named `expenses`.
- Table Columns:
  - `id TEXT PRIMARY KEY`: A unique identifier for each expense, stored as text.
  - `description TEXT NOT NULL`: A text description of the expense, such as "Groceries" or "Utilities." The `NOT NULL` constraint ensures that each entry has a description.
  - `cost INTEGER NOT NULL`: An integer value representing the cost of the expense. Here, `INTEGER` assumes only whole numbers for simplicity.


*/


await db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      description TEXT NOT NULL,
      cost INTEGER NOT NULL
    );
  `);
  return db;
    }
//exports so we can use it for everywhere
    export default initDB;