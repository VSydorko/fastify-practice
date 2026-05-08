import { preHandlerAsyncHookHandler } from 'fastify';
import { HttpError } from '../errors/HttpError';

export const postExistsHook: preHandlerAsyncHookHandler = async function (request) {
  const { postId } = request.params as { postId: string };

  const post = await request.server.repos.postRepo.getPostById(postId);
  if (!post) {
    throw new HttpError(404, 'Post not found');
  }
};
