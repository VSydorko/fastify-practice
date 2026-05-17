import { count, eq, getTableColumns } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IPostRepo } from 'src/types/post/IPostRepo';
import { Post, PostSchema } from 'src/types/post/Post';
import { CommentSchema } from 'src/types/comment/Comment';
import { commentsTable, postsTable } from 'src/services/drizzle/schema';

export function getPostRepo(db: NodePgDatabase): IPostRepo {
  return {
    async getAllPosts() {
      const posts = await db
        .select({
          ...getTableColumns(postsTable),
          commentsCount: count(commentsTable.id)
        })
        .from(postsTable)
        .leftJoin(commentsTable, eq(commentsTable.postId, postsTable.id))
        .groupBy(postsTable.id);
      return posts.map(r => ({
        ...PostSchema.parse(r),
        commentsCount: r.commentsCount
      }));
    },
    async getPostById(id) {
      const posts = await db.select().from(postsTable).where(eq(postsTable.id, id));
      if (posts.length === 0) {
        return null;
      }
      const comments = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.postId, id));
      return {
        ...PostSchema.parse(posts[0]),
        comments: comments.map(c => CommentSchema.parse(c))
      };
    },
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
