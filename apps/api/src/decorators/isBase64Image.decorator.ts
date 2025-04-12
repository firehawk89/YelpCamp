import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBase64Image(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBase64',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          const base64ImagePattern = /^data:image\/(jpeg|jpg|png|gif|bmp);base64,[A-Za-z0-9+/=]+$/;
          return base64ImagePattern.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid base64-encoded image with the header (e.g., data:image/png;base64,...)`;
        },
      },
    });
  };
}
