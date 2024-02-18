import { kafkaTopics } from '../../../config/constants';
import kafkaClient from '../../../libs/kafka';
import { Consumer } from 'kafkajs';
import { createNotification } from '../notification.controller';
import { CreateNotification } from '../../../types';

interface QueuePayload extends CreateNotification {
  eventCode: string;
}
const run = async () => {
  const consumer: Consumer = kafkaClient.consumer({
    groupId: 'post-group',
  });

  await consumer.connect();

  await consumer.subscribe({
    topics: [kafkaTopics.post],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`topic = ${topic}, partition =${partition}`);
      console.log('MESSAGE', message.value?.toString());
      console.log('MESSAGE KEY', message?.key?.toString());
      const messageValue = message.value?.toString();
      console.log(messageValue);
      if (messageValue) {
        const messageData = JSON.parse(messageValue) as QueuePayload;
        console.log(messageData);
        createNotification(messageData.eventCode, {
          ...messageData,
        });
      }
    },
  });
};
export default run;
