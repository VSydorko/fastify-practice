import { FastifyPluginAsync } from 'fastify';
import { postExistsHook } from 'src/api/hooks/post-exists.hook';

const hooks: FastifyPluginAsync = async function (fastify) {
  fastify.addHook('preHandler', postExistsHook);
};

export default hooks;
