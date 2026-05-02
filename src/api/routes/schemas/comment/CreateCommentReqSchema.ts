import { z } from 'zod';

export const CreateCommentReqSchema = z.object({
  postId: z.string().uuid(),
  text: z.string()
});