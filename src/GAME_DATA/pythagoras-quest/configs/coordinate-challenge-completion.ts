export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.the_ladder_problem?.challengeStep === 'done');
};
