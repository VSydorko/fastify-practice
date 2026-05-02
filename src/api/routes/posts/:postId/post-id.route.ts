import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetPostByIdRespSchema } from 'src/api/routes/schemas/post/GetPostByIdRespSchema';
import { z } from 'zod';
import { updatePostById } from 'src/controllers/post/update-post-by-id';
import { UpdatePostReqSchema } from '../../schemas/post/UpdatePostsReqSchema';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

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