[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [resolvers](../README.md) / awsLambdaHttpErrorHandlerResolver

# Function: awsLambdaHttpErrorHandlerResolver()

> **awsLambdaHttpErrorHandlerResolver**(`blueprint`): `IErrorHandler`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md)\>

Error handler resolver for AWS Lambda HTTP adapter.

Creates and configures an `ErrorHandler` for managing errors in the AWS Lambda HTTP adapter.

## Parameters

### blueprint

`IBlueprint`\<`any`\>

The `IBlueprint` providing configuration and dependencies.

## Returns

`IErrorHandler`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md)\>

An `ErrorHandler` instance for handling AWS Lambda HTTP errors.

## Defined in

[src/resolvers.ts:98](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/resolvers.ts#L98)
