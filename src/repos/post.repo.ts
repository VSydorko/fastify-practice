import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IPostRepo } from 'src/types/post/IPostRepo';
import { Post, PostSchema } from 'src/types/post/Post';
import { postsTable } from 'src/services/drizzle/schema';

export function getPostRepo(db: NodePgDatabase): IPostRepo {
  return {
    async createPost(data) {
      const post = await db.insert(postsTable).values(data as Post).returning();
      return PostSchema.parse(post[0]);
    },
    async updatePostById(id, data) {
      const posts = await db
        .update(postsTable)
        .set(data as Post)
        .where(eq(postsTable.id, id))
        .returning();
      return posts.length > 0 ? PostSchema.parse(posts[0]) : null;
    }
  };
}