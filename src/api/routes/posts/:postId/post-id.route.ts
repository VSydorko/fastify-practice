import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getPostById } from 'src/controllers/post/get-post-by-id';
import { updatePostById } from 'src/controllers/post/update-post-by-id';
import { GetPostByIdRespSchema } from 'src/api/routes/schemas/post/GetPostByIdRespSchema';
import { GetPostByIdWithCommentsRespSchema } from 'src/api/routes/schemas/post/GetPostByIdWithCommentsRespSchema';
import { UpdatePostReqSchema } from '../../schemas/post/UpdatePostReqSchema';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  fastify.get('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetPostByIdWithCommentsRespSchema
      }
    }
  }, async req => {
    const post = await getPostById({
      postRepo: fastify.repos.postRepo,
      postId: req.params.postId
    });
    return post;
  });

  fastify.patch('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetPostByIdRespSchema
      },
      body: UpdatePostReqSchema
    }
  }, async req => {
    const post = await updatePostById({
      postRepo: fastify.repos.postRepo,
      postId: req.params.postId,
      data: req.body
    });
    return post;
  });
};

export default routes;