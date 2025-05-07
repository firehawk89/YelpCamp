import { BASE64_IMAGE_PATTERN } from '@repo/constants';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBase64ImageArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBase64ImageArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) return false;
          return value.every((item) => typeof item === 'string' && BASE64_IMAGE_PATTERN.test(item));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of valid base64-encoded image strings with the correct header`;
        },
      },
    });
  };
}
