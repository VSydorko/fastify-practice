import { IPostRepo } from 'src/types/post/IPostRepo';

export async function getAllPosts(params: {
  postRepo: IPostRepo;
}) {
  return params.postRepo.getAllPosts();
}
