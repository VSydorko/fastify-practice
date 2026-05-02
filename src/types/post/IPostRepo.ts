import { Comment } from '../comment/Comment';
import { Post } from './Post';

export interface IPostRepo {
  getAllPosts(): Promise<Array<Post & { commentsCount: number }>>;
  getPostById(id: string): Promise<(Post & { comments: Comment[] }) | null>;
  createPost(data: Partial<Post>): Promise<Post>;
  updatePostById(id: string, data: Partial<Post>): Promise<Post | null>;
}
