import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CreateCommentReqSchema } from '../schemas/comment/CreateCommentReqSchema';
import { GetCommentByIdRespSchema } from '../schemas/comment/GetCommentByIdRespSchema';
import { createComment } from 'src/controllers/comment/create-comment';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

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