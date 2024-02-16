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
  topic: string,
  key: string,
  message: string | Buffer | null,
) => {
  if (producer) {
    await producer.send({
      topic: topic,
      messages: [
        {
          //   partition: 0,
          //   key: key,
          value: message,
        },
      ],
    });
  }
};
