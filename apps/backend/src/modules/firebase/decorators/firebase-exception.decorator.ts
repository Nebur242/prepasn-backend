import { BadGatewayException } from '@nestjs/common';

export function CatchFirebaseException(HttpException = BadGatewayException) {
  return (
    target: unknown,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        throw new HttpException(error.message);
      }
    };
  };
}
