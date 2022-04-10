import { UnprocessableEntityException } from '@nestjs/common';

export function CatchFirebaseException() {
  return (
    target: unknown,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const originalMethod = propertyDescriptor.value;
    //redefine descriptor value within own function block
    propertyDescriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        throw new UnprocessableEntityException(error.message);
      }
    };
  };
}
