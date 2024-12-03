[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [resolvers](../README.md) / awsLambdaAdapterResolver

# Function: awsLambdaAdapterResolver()

> **awsLambdaAdapterResolver**(`blueprint`): `IAdapter`

Adapter resolver for generic AWS Lambda adapter.

Creates and configures an `AWSLambdaAdapter` for handling generic events in AWS Lambda.

## Parameters

### blueprint

`IBlueprint`\<`any`\>

The `IBlueprint` providing configuration and dependencies.

## Returns

`IAdapter`

An `AWSLambdaAdapter` instance.

## Defined in

[src/resolvers.ts:116](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/resolvers.ts#L116)
