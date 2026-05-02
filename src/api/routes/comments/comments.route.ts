import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { CreateCommentReqSchema } from '../schemas/comment/CreateCommentReqSchema';
import { GetCommentByIdRespSchema } from '../schemas/comment/GetCommentByIdRespSchema';
import { GetCommentsByPostIdRespSchema } from '../schemas/comment/GetCommentsByPostIdRespSchema';
import { createComment } from 'src/controllers/comment/create-comment';
import { getCommentsByPostId } from 'src/controllers/comment/get-comments-by-post-id';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  fastify.get('/', {
    schema: {
      querystring: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetCommentsByPostIdRespSchema
      }
    }
  }, async req => {
    const comments = await getCommentsByPostId({
      commentRepo: fastify.repos.commentRepo,
      postId: req.query.postId
    });
    return comments;
  });

  fastify.post('/', {
    schema: {
      response: {
        200: GetCommentByIdRespSchema
      },
      body: CreateCommentReqSchema
    }
  }, async req => {
    const comment = await createComment({
      commentRepo: fastify.repos.commentRepo,
      data: req.body
    });
    return comment;
  });
};

export default routes;