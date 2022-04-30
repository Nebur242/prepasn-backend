import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export default function ControllerWithApiTags(
  path: string,
  options: ControllerOptions = {}
) {
  //uppercase first letter
  const ApiTagsTitle = path.charAt(0).toUpperCase() + path.slice(1);
  return applyDecorators(
    ApiTags(ApiTagsTitle),
    Controller({
      ...options,
      path,
    })
  );
}
