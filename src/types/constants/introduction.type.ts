import { CollaborationStyleType } from './collaborationStyle.type';
import { CommunicationStyleType } from './communicationStyle .type';
import { MbtiType } from './mbti.type';
import { ProblemSolvingApproachType } from './problemSolvingApproach.type';
import { WorkStyleType } from './workStyle.type';

export type IntroductionType = {
  communication_styles: CommunicationStyleType[];
  collaboration_styles: CollaborationStyleType[];
  work_styles: WorkStyleType[];
  problem_solving_approaches: ProblemSolvingApproachType[];
  mbti: MbtiType;
};
