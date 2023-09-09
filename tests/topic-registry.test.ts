import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { PoolTopic } from "../generated/schema"
import { PoolTopic as PoolTopicEvent } from "../generated/TopicRegistry/TopicRegistry"
import { handlePoolTopic } from "../src/topic-registry"
import { createPoolTopicEvent } from "./topic-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let topicId = BigInt.fromI32(234)
    let newPoolTopicEvent = createPoolTopicEvent(topicId)
    handlePoolTopic(newPoolTopicEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PoolTopic created and stored", () => {
    assert.entityCount("PoolTopic", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PoolTopic",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "topicId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
