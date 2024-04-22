import { sseEvent } from '~~/server/utils/event-emitter';

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  sseEvent.on('push:notif', async (data: Record<string, string>) => {
    await eventStream.push({ event: 'update', data: JSON.stringify(data) });
  });

  // cleanup the interval and close the stream when the connection is terminated
  eventStream.onClosed(async () => {
    await eventStream.close();
  });

  return eventStream.send();
});
