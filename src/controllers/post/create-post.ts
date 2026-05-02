import { IPostRepo } from 'src/types/post/IPostRepo';
import { Post } from 'src/types/post/Post';

export async function createPost(params: {
  postRepo: IPostRepo;
  data: Partial<Post>;
}) {
  const post = await params.postRepo.createPost(params.data);

  return post;
}