import { z } from 'zod';

export const GetCommentByIdRespSchema = z.object({
  id: z.string(),
  postId: z.string(),
  text: z.string(),
  updatedAt: z.date(),
  createdAt: z.date()
});