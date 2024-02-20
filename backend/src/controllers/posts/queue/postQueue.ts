import { kafkaTopics } from '../../../config/constants';
import kafkaClient from '../../../libs/kafka';
import { Producer } from 'kafkajs';

let producer: Producer | null = null;

export const connect = async () => {
  producer = kafkaClient.producer();
  await producer.connect();
};

export const disconnect = async () => {
  if (producer) {
    await producer.disconnect();
  }
};

export const sendMessage = async (
  message: string | Buffer | null,
  key: string,
) => {
  if (producer) {
    await producer.send({
      topic: kafkaTopics.post,
      messages: [
        {
          //   partition: 0,
          key: key,
          value: message,
        },
      ],
    });
    console.log('queue message successful sent', message);
  }
};
