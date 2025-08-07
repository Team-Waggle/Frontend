export interface SkillInfo {
  iconKey: string;
  displayName: string;
}

export const skillNameMap: Record<string, SkillInfo> = {
  'C#': { iconKey: 'CSharp', displayName: 'C#' },
  'Nestjs': { iconKey: 'Nestjs', displayName: 'Nest.js' },
  'Nextjs': { iconKey: 'Nextjs', displayName: 'Next.js' },
  'Nodejs': { iconKey: 'Nodejs', displayName: 'Node.js' },
};

export const getIconKey = (keyword: string): string => {
  return skillNameMap[keyword]?.iconKey || keyword;
};

export const getDisplayName = (keyword: string): string => {
  return skillNameMap[keyword]?.displayName || keyword;
};
