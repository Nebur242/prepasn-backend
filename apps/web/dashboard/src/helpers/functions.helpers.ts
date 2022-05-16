import { IConfirmation } from '../common/interfaces/common.interface';
import { Modal } from 'antd';
const { confirm } = Modal;

export async function Async<T>(
  promise: Promise<T>
): Promise<[T | null, unknown | null]> {
  try {
    const result = await Promise.resolve(promise);
    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

export const showConfirm = <T>(confirmation: IConfirmation<T>) => {
  const { title, content, onCancel, onOk, icon } = confirmation;
  confirm({
    title,
    icon,
    content,
    okButtonProps: {
      danger: true,
    },
    onCancel,
    onOk,
  });
};
