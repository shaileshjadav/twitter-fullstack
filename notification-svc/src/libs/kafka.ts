import { Kafka } from 'kafkajs';
import { kafkaConfig } from '../config/constants';

if (!kafkaConfig.clientId || !kafkaConfig.brokers) {
  throw new Error('Invalid kafka config');
}
const kafkaClient = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: [kafkaConfig.brokers],
});

export default kafkaClient;
