import { kafkaTopics } from '../../../config/constants';
import kafkaClient from '../../../libs/kafka';
import { Consumer } from 'kafkajs';

const run = async () => {
  const consumer: Consumer = kafkaClient.consumer({
    groupId: 'post-group',
  });

  await consumer.connect();

  await consumer.subscribe({
    topics: [kafkaTopics.postLike],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`topic = ${topic}, partition =${partition}`);
      console.log('MESSAGE', message.value?.toString());
      console.log('MESSAGE KEY', message?.key?.toString());
    },
  });
};
export default run;
