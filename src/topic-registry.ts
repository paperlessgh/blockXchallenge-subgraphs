import {
  TopicRegistry,
  PoolTopic as PoolTopicEvent,
} from "../generated/TopicRegistry/TopicRegistry";
import { Topic } from "../generated/schema";

export function HandleTopic(event: PoolTopicEvent): void {
  const topic = upSetTopic(event);
}
function upSetTopic(event: PoolTopicEvent): Topic {
  const id = event.params.topicId.toHex();
  let topic = Topic.load(id);

  const topicregistry: TopicRegistry = TopicRegistry.bind(event.address);
  const onchainTopic = topicregistry.getTopic(event.params.topicId);

  if (topic == null) {
    topic = new Topic(id);
    topic.title = onchainTopic.title;
    topic.description = onchainTopic.description;
  }
  topic.state = onchainTopic.state;
  topic.maintainer = onchainTopic.maintainer;
  topic.evaluator = onchainTopic.evaluator;
  topic.save();
  return topic;
}
