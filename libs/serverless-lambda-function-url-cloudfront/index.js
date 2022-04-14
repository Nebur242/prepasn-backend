const template = require('./template.json');
const merge = require('lodash.merge');

class ServerlessLambdaFunctionUrlCloudfront {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = serverless.getProvider('aws');

    this.hooks = {
      'before:deploy:deploy': () => this.createDeploymentArtifacts(),
    };
  }

  createDeploymentArtifacts() {
    const { functions, provider } = this.serverless.service;
    const resources = provider.compiledCloudFormationTemplate;

    Object.keys(functions).forEach((functionName) => {
      const logicalName =
        this.provider.naming.getLambdaFunctionUrlLogicalId(functionName);
      const templateString = JSON.stringify(template)
        .replace(/<LAMBDA_FUNCTION_URL_LOGICAL_NAME>/g, logicalName)
        .replace(
          /<DISTRIBUTION_NAME>/g,
          `${this.provider.naming.normalizeName(
            functionName
          )}${this.provider.naming.getCloudFrontDistributionLogicalId()}`
        );
      const newResources = JSON.parse(templateString);
      merge(resources, newResources);
    });
  }
}

module.exports = ServerlessLambdaFunctionUrlCloudfront;
