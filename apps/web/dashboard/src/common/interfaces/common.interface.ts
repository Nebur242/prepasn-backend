export interface IConfirmation<T> {
  title: string;
  content: string;
  data: T;
  onOk?: () => void;
  onCancel?: () => void;
}
