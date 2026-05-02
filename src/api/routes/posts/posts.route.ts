import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CreatePostReqSchema } from '../schemas/post/CreatePostReqSchema';
import { GetPostByIdRespSchema } from '../schemas/post/GetPostByIdRespSchema';
import { createPost } from 'src/controllers/post/create-post';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  fastify.post('/', {
    schema: {
      response: {
        200: GetPostByIdRespSchema
      },
      body: CreatePostReqSchema
    }
  }, async req => {
    const post = await createPost({
      postRepo: fastify.repos.postRepo,
      data: req.body
    });
    return post;
  });
};

export default routes;