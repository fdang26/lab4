import { Response } from "express";
import { createBudgetEndpoints } from "./budget/budget-endpoints";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { budget } from "./constants";
import initDB from "./createTable"; //allows talbes to bea ctivew when servers start


const express = require("express");
const cors = require("cors");


const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());


// Start the server
app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

/*(async () => { ... })();: This is an immediately-invoked asynchronous function.
By wrapping code inside this async function, we can perform asynchronous tasks, like connecting to the database, right when the server starts.

await initDB(): Here, await is used to wait for the initDB function to complete its tasks.
 This is important because the database needs to be ready before any requests that rely on it can be processed. */
// Initialize the database and start the server
(async () => {
  const db = await initDB();
 
  // Root endpoint to get test if the server is running
  app.get("/", (res: Response) => {
    res.send({ "data": "Hello, TypeScript Express!" });
    res.status(200);
  });
 
 
 
/*
sets up endpoints for handling expenses-related operations (like adding, retrieving, or deleting expenses). The db parameter is passed to
createExpenseEndpoints, so these endpoints can access and interact with the database.


database connection db to the endpoint functions, it acts as a shared resource for the whole application,
allowing different parts of the app to query or modify the database as needed.

*/
 createExpenseEndpoints(app, db);
 createBudgetEndpoints(app, budget);
})();
