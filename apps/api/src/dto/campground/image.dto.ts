import { IsNotEmpty } from 'class-validator';
import { IsBase64Image } from 'src/decorators/isBase64Image.decorator';

class ImageDTO {
  @IsNotEmpty({ message: 'Image is required' })
  @IsBase64Image()
  image: string;
}

export default ImageDTO;
