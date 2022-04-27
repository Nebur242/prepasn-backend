import type { Serverless } from 'serverless/aws';
import { readdirSync } from 'fs';
import {
  excludeFileOrFolder,
  getBuildDir,
  getServerlessEnvVariables,
} from './libs/serverless/helpers';
import { IncludeDependencies, VpcPlugin } from './libs/serverless/plugins';

const service = 'hls';
const buildDir = getBuildDir(service);
const {
  FFMPEG_IMAGE_REPO_NAME,
  AWS_ECR_REGISTRY_ID,
  AWS_DEFAULT_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  STAGE,
  FFMPEG_IMAGE_CPU,
  FFMPEG_IMAGE_MEMORY,
} = getServerlessEnvVariables(service);
const TASK_DEFINITION_NAME = 'hls-service-task-definition';
const S3_BUCKET_NAME = `${service}uploads`;
const CONTAINER_NAME = 'hls-service-container';
const CLUSTER_NAME = 'hls-service-cluster';

const serverlessConfig: Serverless = {
  service,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    architecture: 'arm64',
    stage: STAGE as string,
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
          {
            Effect: 'Allow',
            Resource: '*',
            Action: ['ssm:GetParameter'],
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
      environment: {
        CONTAINER_NAME,
        CLUSTER_NAME,
        TASK_DEFINITION: TASK_DEFINITION_NAME,
        PUBLIC_SUBNETS_SSM_KEY: `/SLS/${service}-${STAGE}/PublicSubnets`,
        SECURITY_GROUP_SSM_KEY: `/SLS/${service}-${STAGE}/AppSecurityGroup`,
        S3_BUCKET_NAME,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        AWS_DEFAULT_REGION,
      },
      events: [
        {
          s3: {
            bucket: S3_BUCKET_NAME,
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: 'videos/uploads/',
              },
            ],
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      taskExecutionRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          AssumeRolePolicyDocument: {
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Service: ['ecs-tasks.amazonaws.com'],
                },
                Action: ['sts:AssumeRole'],
              },
            ],
          },
          Path: '/',
          Policies: [
            {
              PolicyName: 'AmazonECSTaskExecutionRolePolicy',
              PolicyDocument: {
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'ecr:GetAuthorizationToken',
                      'ecr:BatchCheckLayerAvailability',
                      'ecr:GetDownloadUrlForLayer',
                      'ecr:BatchGetImage',
                      'logs:CreateLogGroup',
                      'logs:CreateLogStream',
                      'logs:PutLogEvents',
                      's3:*',
                    ],
                    Resource: '*',
                  },
                ],
              },
            },
          ],
        },
      },
      cluster: {
        Type: 'AWS::ECS::Cluster',
        Properties: {
          ClusterName: 'hls-service-cluster',
          CapacityProviders: ['FARGATE'],
        },
      },
      taskDefinition: {
        Type: 'AWS::ECS::TaskDefinition',
        Properties: {
          Family: TASK_DEFINITION_NAME,
          RequiresCompatibilities: ['FARGATE'],
          RuntimePlatform: {
            CpuArchitecture: 'X86_64',
            OperatingSystemFamily: 'LINUX',
          },
          ExecutionRoleArn: {
            Ref: 'taskExecutionRole',
          },
          cpu: FFMPEG_IMAGE_CPU,
          memory: FFMPEG_IMAGE_MEMORY,
          NetworkMode: 'awsvpc',
          ContainerDefinitions: [
            {
              Name: 'hls-service-container',
              Image: `${AWS_ECR_REGISTRY_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${FFMPEG_IMAGE_REPO_NAME}:latest`,
              cpu: FFMPEG_IMAGE_CPU,
              memory: FFMPEG_IMAGE_MEMORY,
              Essential: true,
              LogConfiguration: {
                LogDriver: 'awslogs',
                Options: {
                  'awslogs-create-group': 'true',
                  'awslogs-group': `/ecs/${TASK_DEFINITION_NAME}`,
                  'awslogs-region': AWS_DEFAULT_REGION,
                  'awslogs-stream-prefix': 'ecs',
                },
              },
              PortMappings: [
                {
                  ContainerPort: 80,
                  HostPort: 80,
                },
              ],
            },
          ],
        },
      },
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
