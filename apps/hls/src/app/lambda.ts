import {
  CLUSTER_NAME,
  CONTAINER_NAME,
  PUBLIC_SUBNETS_SSM_KEY,
  REGION,
  SECURITY_GROUP_SSM_KEY,
  TASK_DEFINITION,
  S3_BUCKET_NAME,
} from './constants';
import { getSourceFromS3 } from '../helpers';
import {
  AssignPublicIp,
  ECSClient,
  LaunchType,
  RunTaskCommand,
} from '@aws-sdk/client-ecs';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { Handler, S3Event } from 'aws-lambda';

const ecsClient = new ECSClient({ region: REGION });
const ssmClient = new SSMClient({ region: REGION });

export const handler: Handler = async (event: S3Event) => {
  const ssmResults = await Promise.all([
    ssmClient.send(new GetParameterCommand({ Name: PUBLIC_SUBNETS_SSM_KEY })),
    ssmClient.send(new GetParameterCommand({ Name: SECURITY_GROUP_SSM_KEY })),
  ]);

  const [publicSubnets, securityGroup] = ssmResults.map(
    (result) => result.Parameter.Value
  );

  const result = await ecsClient.send(
    new RunTaskCommand({
      taskDefinition: TASK_DEFINITION,
      cluster: CLUSTER_NAME,
      launchType: LaunchType.FARGATE,
      networkConfiguration: {
        awsvpcConfiguration: {
          securityGroups: [securityGroup],
          subnets: publicSubnets.split(','),
          assignPublicIp: AssignPublicIp.ENABLED,
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: CONTAINER_NAME,
            environment: [
              {
                name: 'S3_URL',
                value: await getSourceFromS3(event),
              },
              {
                name: 'S3_BUCKET_NAME',
                value: S3_BUCKET_NAME,
              },
            ],
          },
        ],
      },
    })
  );
  return result;
};
