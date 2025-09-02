export type NavigationSize = 'xl' | 'md' | 'sm';

export interface InPageNavigationProps {
  size?: NavigationSize;
  items: string;
  isActive?: boolean;
  onClick?: () => void;
}