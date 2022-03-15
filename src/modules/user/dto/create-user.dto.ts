import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({
    type: String,
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;
}
