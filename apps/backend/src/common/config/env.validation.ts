import { Expose, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsString()
  @Expose()
  FIREBASE_TYPE: string;

  @IsString()
  @Expose()
  FIREBASE_PROJECT_ID: string;

  @IsString()
  @Expose()
  FIREBASE_PRIVATE_KEY_ID: string;

  @IsString()
  @Expose()
  FIREBASE_PRIVATE_KEY: string;

  @IsString()
  @Expose()
  FIREBASE_CLIENT_EMAIL: string;

  @IsString()
  @Expose()
  FIREBASE_CLIENT_ID: string;

  @IsString()
  @Expose()
  FIREBASE_AUTH_URI: string;

  @IsString()
  @Expose()
  FIREBASE_TOKEN_URI: string;

  @IsString()
  @Expose()
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;

  @IsString()
  @Expose()
  FIREBASE_CLIENT_X509_CERT_URL: string;

  @IsString()
  @Expose()
  FIREBASE_REST_API_KEY: string;

  @IsOptional()
  @IsEnum(Environment)
  @Expose()
  NODE_ENV?: Environment;

  @IsString()
  @Expose()
  NODE_TLS_REJECT_UNAUTHORIZED: string;

  @IsEnum(['postgres', 'sqlite'])
  @Expose()
  DB_TYPE: 'postgres' | 'sqlite';

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsString()
  @Expose()
  DB_HOST: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsNumber()
  @Expose()
  DB_PORT: number;

  @IsString()
  @Expose()
  DB_NAME: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsString()
  @Expose()
  DB_USERNAME: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsString()
  @Expose()
  DB_PASSWORD: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsOptional()
  @IsString()
  @Expose()
  DB_SSL?: string;

  @IsOptional()
  @IsString()
  @Expose()
  DB_LOGGING?: string;

  @IsOptional()
  @IsString()
  @Expose()
  DB_SYNC?: string;

  @IsOptional()
  @IsString()
  @Expose()
  STAGE?: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
