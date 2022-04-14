import { plainToClass } from 'class-transformer';
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
  FIREBASE_TYPE: string;

  @IsString()
  FIREBASE_PROJECT_ID: string;

  @IsString()
  FIREBASE_PRIVATE_KEY_ID: string;

  @IsString()
  FIREBASE_PRIVATE_KEY: string;

  @IsString()
  FIREBASE_CLIENT_EMAIL: string;

  @IsString()
  FIREBASE_CLIENT_ID: string;

  @IsString()
  FIREBASE_AUTH_URI: string;

  @IsString()
  FIREBASE_TOKEN_URI: string;

  @IsString()
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;

  @IsString()
  FIREBASE_CLIENT_X509_CERT_URL: string;

  @IsString()
  FIREBASE_REST_API_KEY: string;

  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsEnum(['postgres', 'sqlite'])
  DB_TYPE: 'postgres' | 'sqlite';

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsString()
  DB_HOST: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_NAME: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsString()
  DB_USERNAME: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsString()
  DB_PASSWORD: string;

  @ValidateIf((env: EnvironmentVariables) => env.DB_TYPE !== 'sqlite')
  @IsOptional()
  @IsString()
  DB_SSL: string;

  @IsOptional()
  @IsString()
  DB_LOGGING: string;

  @IsOptional()
  @IsString()
  DB_SYNC: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
