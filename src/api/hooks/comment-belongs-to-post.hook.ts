import { preHandlerAsyncHookHandler } from 'fastify';
import { HttpError } from '../errors/HttpError';

export const commentBelongsToPostHook: preHandlerAsyncHookHandler = async function (request) {
  const { postId, commentId } = request.params as { postId: string; commentId: string };

  const comment = await request.server.repos.commentRepo.getCommentByIdAndPostId(commentId, postId);
  if (!comment) {
    throw new HttpError(404, 'Comment not found', undefined, 404);
  }
};
