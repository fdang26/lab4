import { Expense } from "../types";
import { Request, Response } from "express";
import initDB from "../createTable";
import { Database } from "sqlite";
import { createExpenseEndpoints } from "./expense-endpoints";
/*
export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;


    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }


    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };


    expenses.push(newExpense);
    res.status(201).send(newExpense);
}
    */

export async function createExpenseServer(req: Request, res: Response, db: Database) {


    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }
export async function deleteExpense(req: Request, res: Response,  db: Database) {
   
    /*const { id, cost, description } = req.body;


    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }


    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };


    expenses = expenses.filter(
        (expense) => expense.id !== newExpense.id
    );
    res.status(201).send(newExpense);
    */


    try {
        // Type casting the request body to the expected format.
        const { id} = req.params;
 
        if (!id) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        //DELETE FROM expenses Where id =? ; refers to the id in the expense table


        //the id in the request params refers to the id given that we want to delete.


        await db.run('DELETE FROM expenses WHERE id = ?;', id);


        res.status(200).send({id});
    }
    catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted + ${error}` });
    };
}






export async function getExpenses(req: Request, res: Response, db: Database) {




    //res.status(200).send({ "data": expenses });


    //const response = await fetch(`${API_BASE_URL}/expenses`);
    //if (!response.ok) {
    //  throw new Error('Failed to fetch expenses');
    //}


    try{
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };


        //not sure if its this one...
        //await db.run('SELECT * FROM expenses;);


        await db.all('SELECT id, description, cost FROM expenses;', [id, description, cost]);
        //do i need to have a status code at all?
        res.status(201).send({ id, description, cost });
    }
    catch(error)
    {
        return res.status(400).send({ error: `getExpenses method has failed + ${error}` });
    }
}
