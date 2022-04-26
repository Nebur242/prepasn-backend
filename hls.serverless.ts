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
        CONTAINER_NAME: 'hls-service-container',
        CLUSTER_NAME: 'hls-service-cluster',
        TASK_DEFINITION: 'hls-service-task-definition',
        PUBLIC_SUBNETS_SSM_KEY: `/SLS/${service}-dev/PublicSubnets`,
        SECURITY_GROUP_SSM_KEY: `/SLS/${service}-dev/AppSecurityGroup`,
      },
      events: [
        {
          s3: {
            bucket: `${service}uploads`,
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: 'uploads/videos/',
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
          Family: 'hls-service-task-definition',
          RequiresCompatibilities: ['FARGATE'],
          RuntimePlatform: {
            CpuArchitecture: 'X86_64',
            OperatingSystemFamily: 'LINUX',
          },
          ExecutionRoleArn: {
            Ref: 'taskExecutionRole',
          },
          cpu: 2048,
          memory: 4096,
          NetworkMode: 'awsvpc',
          ContainerDefinitions: [
            {
              Name: 'hls-service-container',
              Image:
                '608885383035.dkr.ecr.us-east-1.amazonaws.com/ffmpeg-node-tls-2:latest',
              cpu: 2048,
              memory: 4096,
              Essential: true,
              LogConfiguration: {
                LogDriver: 'awslogs',
                Options: {
                  'awslogs-create-group': 'true', // logs:CreateLogGroup
                  'awslogs-group': '/ecs/hls-service-task-definition',
                  'awslogs-region': 'us-east-1',
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
