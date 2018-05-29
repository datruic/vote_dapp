/* GLOBAL VARIABLES */
let votes = [
  { id: 0, value: 0 },
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
  { id: 4, value: 0 }
];

const VotingService = _ => {
  /* PRIVATE FUNCTIONS */
  const _formatVotes = votes => votes.map(vote => vote.value);
  const _updateVote = (id) => votes[id].value += 1;

  return {
    /* PUBLIC FUNCTIONS */
    getAllVotes: _ => Promise.resolve(votes).then(_formatVotes),
    submitVote: (id) => Promise.resolve(id).then(_updateVote)
  };
}
