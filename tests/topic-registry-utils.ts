import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { PoolTopic } from "../generated/TopicRegistry/TopicRegistry"

export function createPoolTopicEvent(topicId: BigInt): PoolTopic {
  let poolTopicEvent = changetype<PoolTopic>(newMockEvent())

  poolTopicEvent.parameters = new Array()

  poolTopicEvent.parameters.push(
    new ethereum.EventParam(
      "topicId",
      ethereum.Value.fromUnsignedBigInt(topicId)
    )
  )

  return poolTopicEvent
}
