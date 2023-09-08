import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  PoolChallenge
} from "../generated/ChallengePool/ChallengePool"

export function createPoolChallengeEvent(challengeId: BigInt): PoolChallenge {
  let poolChallengeEvent = changetype<PoolChallenge>(newMockEvent())

  poolChallengeEvent.parameters = new Array()

  poolChallengeEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )

  return poolChallengeEvent
}
