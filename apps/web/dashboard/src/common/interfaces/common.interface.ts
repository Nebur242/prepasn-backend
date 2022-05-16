export interface IConfirmation<T> {
  title: string;
  content: string;
  icon: JSX.Element;
  data: T;
  onOk?: () => void;
  onCancel?: () => void;
}
