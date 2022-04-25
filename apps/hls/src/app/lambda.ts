import {
  CLUSTER_NAME,
  CONTAINER_NAME,
  REGION,
  TASK_DEFINITION,
} from './constants';
import { getSourceFromS3 } from '../helpers';
import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { Handler, S3Event } from 'aws-lambda';

const ecsClient = new ECSClient({ region: REGION });
const ssmClient = new SSMClient({ region: REGION });

export const handler: Handler = async (event: S3Event) => {
  // TODO: get parameters by path
  // TODO: find a way to calculate this value or put it as a constant
  const ssmResults = await Promise.all([
    ssmClient.send(
      new GetParameterCommand({ Name: '/SLS/hls-dev/PublicSubnets' })
    ),
    ssmClient.send(
      new GetParameterCommand({ Name: '/SLS/hls-dev/AppSecurityGroup' })
    ),
  ]);

  const [publicSubnets, securityGroup] = ssmResults.map(
    (result) => result.Parameter.Value
  );

  const result = await ecsClient.send(
    new RunTaskCommand({
      taskDefinition: TASK_DEFINITION,
      cluster: CLUSTER_NAME,
      launchType: 'FARGATE',
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: publicSubnets.split(','),
          assignPublicIp: 'ENABLED',
          securityGroups: [securityGroup],
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
            ],
          },
        ],
      },
    })
  );
  return result;
};
