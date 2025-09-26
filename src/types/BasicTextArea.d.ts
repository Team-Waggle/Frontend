export type BasicTextAreaState = 'default' | 'typing' | 'complete' | 'error' | 'disable';
export type BasicTextAreaSize = 'lg' | 'sm';

export interface BaseBasicTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (value: string) => void;
  size?: BasicTextAreaSize;
  state?: BasicTextAreaState;
  useTyping?: (isTyping: boolean) => void;
  placeholder?: string;
}