export type TextAreaType = 'default' | 'fixed';

export type DefaultTextAreaState = 'default' | 'typing' | 'complete' | 'error';
export type FixedTextAreaState = 'default' | 'typing' | 'complete' | 'disable';

export type TextAreaStateMap = {
  default: DefaultTextAreaState;
  fixed: FixedTextAreaState;
};

export interface BaseIconTextAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: TextAreaType;
  state?: DefaultTextAreaState | FixedTextAreaState;
  error?: boolean;
  showIcon?: boolean;
  typingMessage?: string;
  useRegex?: boolean;
  useLengthValidation?: boolean;
  useTyping?: (isTyping: boolean) => void;
}
