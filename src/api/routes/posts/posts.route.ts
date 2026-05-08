import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CreatePostReqSchema } from '../schemas/post/CreatePostReqSchema';
import { GetPostByIdRespSchema } from '../schemas/post/GetPostByIdRespSchema';
import { GetAllPostsRespSchema } from '../schemas/post/GetAllPostsRespSchema';
import { createPost } from 'src/controllers/post/create-post';
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