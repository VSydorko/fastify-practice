import { Post } from './Post';

export interface IPostRepo {
  createPost(data: Partial<Post>): Promise<Post>;
  updatePostById(id: string, data: Partial<Post>): Promise<Post | null>;
}