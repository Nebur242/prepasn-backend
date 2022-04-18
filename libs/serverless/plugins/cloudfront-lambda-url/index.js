const template = require('./template.json');
const merge = require('lodash.merge');

class ServerlessCloudFrontLambdaUrl {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = serverless.getProvider('aws');
    this.naming = this.provider.naming;

    this.hooks = {
      'before:deploy:deploy': () => this.createDeploymentArtifacts(),
    };
  }

  deploymentConfig(functionName) {
    const normalizedFunctionName = this.naming.normalizeName(functionName);
    const stagingName = `${normalizedFunctionName}${this.naming.normalizeName(
      'staging'
    )}`;
    return {
      STAGING_ALIAS_NAME: stagingName,
      STAGING_ALIAS_RESOURCE_NAME: `${stagingName}Alias`,
      STAGING_ALIAS_RESOURCE_URL:
        this.naming.getLambdaFunctionUrlLogicalId(stagingName),
      STAGING_ALIAS_FN_PERMISSION_RESOURCE_URL:
        this.naming.getLambdaFnUrlPermissionLogicalId(stagingName),
      CLOUDFRONT_DISTRIBUTION_RESOURCE_NAME: `${stagingName}${this.naming.getCloudFrontDistributionLogicalId()}`,
      LAMBDA_FUNCTION_URL_LOGICAL_ID: this.naming.getLambdaFunctionUrlLogicalId(
        normalizedFunctionName
      ),
    };
  }

  createDeploymentArtifacts() {
    const { functions, provider } = this.serverless.service;
    const resources = provider.compiledCloudFormationTemplate;

    Object.keys(functions).forEach((functionName) => {
      const deploymentConfig = this.deploymentConfig(functionName);

      let templateString = JSON.stringify(template);
      Object.entries(deploymentConfig).forEach(([key, value]) => {
        templateString = templateString.replace(
          new RegExp(`{{${key}}}`, 'g'),
          value
        );
      });

      const newResources = JSON.parse(templateString);
      merge(resources, newResources);
    });
  }
}

module.exports = ServerlessCloudFrontLambdaUrl;
