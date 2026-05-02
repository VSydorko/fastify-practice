import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetCommentByIdRespSchema } from 'src/api/routes/schemas/comment/GetCommentByIdRespSchema';
import { z } from 'zod';
import { updateCommentById } from 'src/controllers/comment/update-comment-by-id';
import { UpdateCommentReqSchema } from '../../schemas/comment/UpdateCommentsReqSchema';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  fastify.patch('/', {
    schema: {
      params: z.object({
        commentId: z.string().uuid()
      }),
      response: {
        200: GetCommentByIdRespSchema
      },
      body: UpdateCommentReqSchema
    }
  }, async req => {
    const comment = await updateCommentById({
      commentRepo: fastify.repos.commentRepo,
      commentId: req.params.commentId,
      data: req.body
    });
    return comment;
  });
};

export default routes;