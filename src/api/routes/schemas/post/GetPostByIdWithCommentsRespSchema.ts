import { z } from 'zod';
import { GetCommentByIdRespSchema } from '../comment/GetCommentByIdRespSchema';

export const GetPostByIdWithCommentsRespSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  comments: z.array(GetCommentByIdRespSchema),
  updatedAt: z.date(),
  createdAt: z.date()
});
