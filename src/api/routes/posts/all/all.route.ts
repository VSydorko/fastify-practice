import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetAllPostsRespSchema } from 'src/api/routes/schemas/post/GetAllPostsRespSchema';
import { getAllPosts } from 'src/controllers/post/get-all-posts';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  fastify.get('/', {
    schema: {
      response: {
        200: GetAllPostsRespSchema
      }
    }
  }, async () => {
    const posts = await getAllPosts({
      postRepo: fastify.repos.postRepo
    });
    return posts;
  });
};

export default routes;
