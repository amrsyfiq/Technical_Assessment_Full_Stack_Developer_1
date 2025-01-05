import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive(),
});
