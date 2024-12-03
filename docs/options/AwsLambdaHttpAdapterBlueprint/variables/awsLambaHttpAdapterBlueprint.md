[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [options/AwsLambdaHttpAdapterBlueprint](../README.md) / awsLambaHttpAdapterBlueprint

# Variable: awsLambaHttpAdapterBlueprint

> `const` **awsLambaHttpAdapterBlueprint**: [`AwsLambaHttpAdapterBlueprint`](../interfaces/AwsLambaHttpAdapterBlueprint.md)

Default blueprint configuration for the AWS Lambda Http Adapter.

This blueprint defines the initial configuration for the AWS Lambda Http adapter
within the Stone.js framework. It includes:
- An alias for the AWS Lambda platform (`AWS_LAMBDA_HTTP_PLATFORM`).
- A default resolver function (currently a placeholder).
- Middleware, hooks, and state flags (`current`, `default`, `preferred`).

## Defined in

[src/options/AwsLambdaHttpAdapterBlueprint.ts:36](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/options/AwsLambdaHttpAdapterBlueprint.ts#L36)
