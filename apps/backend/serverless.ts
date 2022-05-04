import type { Serverless } from 'serverless/aws';
import { readdirSync } from 'fs';
import {
  excludeFileOrFolder,
  getServerlessEnvVariables,
  getBuildDir,
} from '@prepa-sn/sls/helpers';
import { IncludeDependencies, ServerlessOffline } from '@prepa-sn/sls/plugins';
import { validate } from './src/common/config';

const service = 'backend';
const environmentVariables = validate(getServerlessEnvVariables(service));
const buildDir = getBuildDir(service);

const serverlessConfig: Serverless = {
  service,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    architecture: 'arm64',
    stage: environmentVariables.STAGE,
  },
  package: {
    patterns: [...readdirSync('./').map(excludeFileOrFolder), `${buildDir}/**`],
  },
  functions: {
    [service]: {
      handler: `${buildDir}/main.handler`,
      url: true,
      environment: environmentVariables,
    },
  },
  plugins: [ServerlessOffline, IncludeDependencies],
  custom: {
    includeDependencies: {
      enableCaching: true,
    },
  },
  resources: {
    Resources: {
      BackendStagingAlias: {
        Type: 'AWS::Lambda::Alias',
        Properties: {
          FunctionName: { Ref: 'BackendLambdaFunctionUrl' },
          FunctionVersion: '$LATEST',
          Name: 'BackendStaging',
        },
      },
      BackendStagingLambdaFunctionUrl: {
        Type: 'AWS::Lambda::Url',
        Properties: {
          AuthType: 'NONE',
          Qualifier: 'BackendStaging',
          TargetFunctionArn: { Ref: 'BackendLambdaFunctionUrl' },
        },
      },
      BackendStagingLambdaPermissionFnUrl: {
        Type: 'AWS::Lambda::Permission',
        Properties: {
          FunctionName: { Ref: 'BackendStagingLambdaFunctionUrl' },
          Action: 'lambda:InvokeFunctionUrl',
          Principal: '*',
          FunctionUrlAuthType: 'NONE',
        },
      },
      BackendStagingCloudFrontDistribution: {
        Type: 'AWS::CloudFront::Distribution',
        Properties: {
          DistributionConfig: {
            Aliases: [],
            Origins: [
              {
                Id: { Ref: 'BackendStagingLambdaFunctionUrl' },
                DomainName: {
                  'Fn::Select': [
                    0,
                    {
                      'Fn::Split': [
                        '/',
                        {
                          'Fn::Select': [
                            1,
                            {
                              'Fn::Split': [
                                '://',
                                {
                                  'Fn::GetAtt': [
                                    'BackendStagingLambdaFunctionUrl',
                                    'FunctionUrl',
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                OriginPath: '',
                CustomOriginConfig: {
                  HTTPPort: '80',
                  HTTPSPort: '443',
                  OriginProtocolPolicy: 'https-only',
                  OriginSSLProtocols: ['TLSv1', 'TLSv1.1', 'TLSv1.2'],
                },
              },
            ],
            DefaultCacheBehavior: {
              TargetOriginId: { Ref: 'BackendStagingLambdaFunctionUrl' },
              ViewerProtocolPolicy: 'redirect-to-https',
              AllowedMethods: [
                'HEAD',
                'DELETE',
                'POST',
                'GET',
                'OPTIONS',
                'PUT',
                'PATCH',
              ],
              CachedMethods: ['HEAD', 'GET', 'OPTIONS'],
              ForwardedValues: {
                QueryString: true,
                Headers: [],
                Cookies: { Forward: 'all' },
              },
            },
            CustomErrorResponses: [],
            Comment: '',
            Logging: { IncludeCookies: 'false', Bucket: '', Prefix: '' },
            PriceClass: 'PriceClass_200',
            Enabled: 'true',
            WebACLId: '',
            HttpVersion: 'http2',
          },
        },
      },
    },
    Outputs: {
      BackendStagingLambdaFunctionUrl: {
        Description: 'Staging Lambda Function URL',
        Value: {
          'Fn::GetAtt': ['BackendStagingLambdaFunctionUrl', 'FunctionUrl'],
        },
      },
      BackendStagingCloudFrontDistribution: {
        Description: 'CloudFront distribution pointing to Staging',
        Value: {
          'Fn::GetAtt': ['BackendStagingCloudFrontDistribution', 'DomainName'],
        },
      },
    },
  },
};

module.exports = serverlessConfig;
