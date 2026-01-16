import { ProofStep } from '../interactives/interface';

const triangleAngleSumConfig = {
  steps: [
    {
      title: 'scenes.S11.S11_D0_F108_C9.steps.step1.title', // "Step 1: Draw a Triangle"
      instruction: 'scenes.S11.S11_D0_F108_C9.steps.step1.instruction', // "Click three points to create triangle ABC."
    },
    {
      title: 'scenes.S11.S11_D0_F108_C9.steps.step2.title', // "Step 2: Draw Parallel Line"
      instruction: 'scenes.S11.S11_D0_F108_C9.steps.step2.instruction', // "Through point A, draw a line parallel to BC."
    },
    {
      title: 'scenes.S11.S11_D0_F108_C9.steps.step3.title', // "Step 3: Identify Angle Relationships"
      instruction: 'scenes.S11.S11_D0_F108_C9.steps.step3.instruction', // "Use angle relationships to prove the sum is 180°."
    },
  ],
  keyPrinciples: {
    header: 'scenes.S11.S11_D0_F108_C9.keyPrinciples.header', // "Key Geometric Principles"
    parallelLinesTitle: 'scenes.S11.S11_D0_F108_C9.keyPrinciples.parallelLinesTitle', // "Parallel Lines"
    parallelLinesDesc: 'scenes.S11.S11_D0_F108_C9.keyPrinciples.parallelLinesDesc', // "When two parallel lines are cut by a transversal, alternate interior angles are equal."
    straightAnglesTitle: 'scenes.S11.S11_D0_F108_C9.keyPrinciples.straightAnglesTitle', // "Straight Angles"
    straightAnglesDesc: 'scenes.S11.S11_D0_F108_C9.keyPrinciples.straightAnglesDesc', // "Angles that form a straight line sum to 180°."
  },
  proof: {
    proofStepsHeader: 'scenes.S11.S11_D0_F108_C9.proof.proofStepsHeader', // "Proof Steps"
    proofSteps: [
      {
        id: 'altInterior1',
        title: 'scenes.S11.S11_D0_F108_C9.proof.altInterior1.title',
        statement: '',
        explanation: 'scenes.S11.S11_D0_F108_C9.proof.altInterior1.explanation',
        validPairs: [
          ['y', 'c'],
          ['x', 'b'],
        ],
      },
      {
        id: 'altInterior2',
        title: 'scenes.S11.S11_D0_F108_C9.proof.altInterior2.title',
        statement: '',
        explanation: 'scenes.S11.S11_D0_F108_C9.proof.altInterior2.explanation',
        validPairs: [
          ['y', 'c'],
          ['x', 'b'],
        ],
      },
      {
        id: 'straightLine',
        title: 'scenes.S11.S11_D0_F108_C9.proof.straightLine.title',
        statement: '',
        explanation: 'scenes.S11.S11_D0_F108_C9.proof.straightLine.explanation',
        validAngles: ['y', 'a', 'x'],
      },
    ] as ProofStep[],
    continueText: 'scenes.S11.S11_D0_F108_C9.proof.continueText', // "Continue to Next Step"
    finalStatement: 'scenes.S11.S11_D0_F108_C9.proof.finalStatement', // "Therefore, the sum of the interior angles is 180°."
    errorStatement: 'scenes.S11.S11_D0_F108_C9.proof.errorStatement',
    summaryText: 'scenes.S11.S11_D0_F108_C9.proof.summaryText', // "The sum of interior angles in any triangle is always 180°."
    viewSummary: 'scenes.S11.S11_D0_F108_C9.proof.viewSummary', // "View Summary"
  },
  buttons: {
    tryAgain: 'scenes.S11.S11_D0_F108_C9.buttons.tryAgain', // "Try Again"
    gotIt: 'scenes.S11.S11_D0_F108_C9.buttons.gotIt', // "Got it!"
    previous: 'scenes.S11.S11_D0_F108_C9.buttons.previous', // "Previous"
    next: 'scenes.S11.S11_D0_F108_C9.buttons.next', // "Next"
  },
  errorMessages: {
    invalidTriangle: 'scenes.S11.S11_D0_F108_C9.errorMessages.invalidTriangle', // "Please ensure your triangle points are properly placed and form a valid triangle."
  },
  errorModal: {
    oops: 'scenes.S11.S11_D0_F108_C9.errorModal.oops', // "Oops!"
  },
  canvas: {
    clickInstruction: 'scenes.S11.S11_D0_F108_C9.canvas.clickInstruction', // "Click to place point"
  },
  summary: {
    description: 'scenes.S11.S11_D0_F108_C9.summary.description', // "The sum of interior angles in any triangle equals 180°:"
  },
};

export default triangleAngleSumConfig;
