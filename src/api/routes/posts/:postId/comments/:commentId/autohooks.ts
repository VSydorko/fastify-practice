import { FastifyPluginAsync } from 'fastify';
import { commentBelongsToPostHook } from 'src/api/hooks/comment-belongs-to-post.hook';

const hooks: FastifyPluginAsync = async function (fastify) {
  fastify.addHook('preHandler', commentBelongsToPostHook);
};

export default hooks;
