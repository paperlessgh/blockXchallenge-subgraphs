import {
  ChallengePool,
  PoolChallenge as PoolChallengeEvent,
} from "../generated/ChallengePool/ChallengePool";
import {
  Challenge,
  Participant,
  ParticipantChallenge,
} from "../generated/schema";

export function handlePoolChallenge(event: PoolChallengeEvent): void {
  const challenge = upSetChallenge(event);
  const participant = upSetParticipant(event);
  upSetChallengeParticipant(event, challenge, participant);
}

function upSetChallenge(event: PoolChallengeEvent): Challenge {
  const id = event.params.challengeId.toHex();
  let challenge = Challenge.load(id);
  const challengePool: ChallengePool = ChallengePool.bind(event.address);
  const onChainChallenge = challengePool.getChallenge(event.params.challengeId);
  if (challenge == null) {
    challenge = new Challenge(id);
    challenge.stake = onChainChallenge.stake;
    challenge.createdAt = onChainChallenge.createdAt;
    challenge.maturity = onChainChallenge.maturity;
    challenge.params = onChainChallenge.params;
    challenge.topicId = onChainChallenge.topicId;
  }
  challenge.state = onChainChallenge.state;
  challenge.losers = onChainChallenge.losers;
  challenge.winners = onChainChallenge.winners;
  challenge.results = onChainChallenge.results;
  challenge.save();
  return challenge;
}

function upSetParticipant(event: PoolChallengeEvent): Participant {
  const id = event.transaction.from.toHexString();
  let participant = Participant.load(id);
  if (participant == null) {
    participant = new Participant(id);
    participant.save();
  }
  return participant;
}

function upSetChallengeParticipant(
  event: PoolChallengeEvent,
  challenge: Challenge,
  participant: Participant
): void {
  const poolId = event.params.challengeId.toHex();
  const participantId = event.transaction.from.toHexString();
  const id = participantId.concat(poolId);
  let participantChallenge = ParticipantChallenge.load(id);
  if (participantChallenge == null) {
    participantChallenge = new ParticipantChallenge(id);
  }
  participantChallenge.challenge = challenge.id;
  participantChallenge.participant = participant.id;
  participantChallenge.save();
}
