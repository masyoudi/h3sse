import { sseEvent } from '~~/server/utils/event-emitter';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  sseEvent.emit('push:notif', {
    name: body.name,
    message: body.message
  });

  return {
    success: true
  };
});
