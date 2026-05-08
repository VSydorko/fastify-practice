import { Comment } from './Comment';

export interface ICommentRepo {
  getCommentsByPostId(postId: string): Promise<Array<Comment>>;
  getCommentByIdAndPostId(commentId: string, postId: string): Promise<Comment | null>;
  createComment(data: Partial<Comment>): Promise<Comment>;
  updateCommentById(id: string, data: Partial<Comment>): Promise<Comment | null>;
}