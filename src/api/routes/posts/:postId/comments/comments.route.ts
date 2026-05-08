import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { CreateCommentReqSchema } from 'src/api/routes/schemas/comment/CreateCommentReqSchema';
import { GetCommentByIdRespSchema } from 'src/api/routes/schemas/comment/GetCommentByIdRespSchema';
import { GetCommentsByPostIdRespSchema } from 'src/api/routes/schemas/comment/GetCommentsByPostIdRespSchema';
import { createComment } from 'src/controllers/comment/create-comment';
import { getCommentsByPostId } from 'src/controllers/comment/get-comments-by-post-id';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  fastify.get('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetCommentsByPostIdRespSchema
      }
    }
  }, async req => {
    const comments = await getCommentsByPostId({
      commentRepo: fastify.repos.commentRepo,
      postId: req.params.postId
    });
    return comments;
  });

  fastify.post('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetCommentByIdRespSchema
      },
      body: CreateCommentReqSchema
    }
  }, async req => {
    const comment = await createComment({
      commentRepo: fastify.repos.commentRepo,
      data: { ...req.body, postId: req.params.postId }
    });
    return comment;
  });
};

export default routes;