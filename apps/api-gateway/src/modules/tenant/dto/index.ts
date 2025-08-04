import { IsString, IsOptional, IsObject, IsEmail, IsUrl, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateTenantDto {
  @ApiProperty({ example: 'Acme Corporation' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'acme.com' })
  @IsString()
  domain: string;

  @ApiProperty({ example: 'acme' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  subdomain: string;

  @ApiProperty({ example: 'contact@acme.com' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ example: 'Leading software company' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'https://acme.com/logo.png' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({
    example: {
      branding: {
        logo: 'https://acme.com/logo.png',
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        theme: 'light'
      },
      features: {
        rewards: true,
        merchandise: true,
        vouchers: true,
        cashback: true,
        analytics: true
      },
      limits: {
        maxUsers: 10000,
        maxTransactions: 1000000,
        maxRules: 100
      }
    }
  })
  @IsObject()
  config: Record<string, any>;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}

export class PaginationQueryDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}