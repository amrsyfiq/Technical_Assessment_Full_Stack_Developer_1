import { Request, Response } from 'express';
// import { getAllItems } from "../services/item.service";
import { db } from '../db';
import { itemSchema } from '../validations/item.validation';

export const getItems = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [row] = await db.query('SELECT * FROM items WHERE id = ?', [id]);

    res.json(row);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const validated = itemSchema.parse(req.body);
    const [result] = await db.query('INSERT INTO items SET ?', [validated]);
    const insertId = (result as { insertId: number }).insertId;

    const item = await db.query('SELECT * FROM items WHERE id = ?', insertId);
    const row = item[0];
    res.status(200).json(row);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const validated = itemSchema.parse(req.body);
    await db.query('UPDATE items SET ? WHERE id = ?', [validated, id]);
    
    const item = await db.query('SELECT * FROM items WHERE id = ?', id);
  
    const row = item[0];
    res.status(201).json(row);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.query('DELETE FROM items WHERE id = ?', [id]);
  res.json({ message: 'Item deleted' });
};