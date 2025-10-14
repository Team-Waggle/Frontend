type PortfolioTypeType =
  | 'GITHUB'
  | 'NOTION'
  | 'LINKEDIN'
  | 'YOUTUBE'
  | 'INSTAGRAM'
  | 'BRUNCH'
  | 'TWITTER'
  | 'DRIBBBLE'
  | 'TRELLO'
  | 'FIGMA'
  | 'OTHER';

export type PortfoliosType = {
  portfolio_type: PortfolioTypeType;
  url: string;
};
