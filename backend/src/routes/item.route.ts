import express from 'express';
import { getItems, getItem, createItem, updateItem, deleteItem } from '../controllers/item.controller';
const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItem);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;