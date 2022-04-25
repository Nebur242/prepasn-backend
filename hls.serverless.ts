import type { Serverless } from 'serverless/aws';
import { readdirSync } from 'fs';
import { excludeFileOrFolder, getBuildDir } from './libs/serverless/helpers';
import { IncludeDependencies, VpcPlugin } from './libs/serverless/plugins';

const service = 'hls';
const buildDir = getBuildDir(service);

// TODO: generate ECR image
// TODO: create ECR task definition
// TODO: create ECR cluster
// TODO: put outputs in ssm
const serverlessConfig: Serverless = {
  service,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    architecture: 'arm64',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Resource: '*',
            Action: ['ecs:*'],
          },
          {
            Effect: 'Allow',
            Resource: '*',
            Action: ['iam:PassRole'],
          },
        ],
      },
    },
  },
  package: {
    patterns: [...readdirSync('./').map(excludeFileOrFolder), buildDir],
  },
  functions: {
    [service]: {
      handler: `${buildDir}/main.handler`,
      events: [
        {
          s3: {
            bucket: `${service}uploads`,
            event: 's3:ObjectCreated:*',
          },
        },
      ],
    },
  },
  plugins: [VpcPlugin, IncludeDependencies],
  custom: {
    includeDependencies: {
      enableCaching: true,
    },
    vpcConfig: {
      createNatGateway: 1,
      createParameters: true,
      exportOutputs: true,
      createDbSubnet: false,
      services: ['s3'],
    },
  },
};

module.exports = serverlessConfig;
