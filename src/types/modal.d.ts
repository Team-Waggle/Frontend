export interface BaseModalProps {
  size: 'small' | 'large';
  isOpen: boolean;
  onClose: () => void;
  CharacterComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  content?: string;
}
