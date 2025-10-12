export interface BaseModalProps {
  size: 'small' | 'large';
  isOpen: boolean;
  handleDone: () => void;
  onClose: (e?) => void;
  CharacterComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  content?: string;
}
