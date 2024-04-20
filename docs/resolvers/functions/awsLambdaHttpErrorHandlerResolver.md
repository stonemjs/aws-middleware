[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [resolvers](../README.md) / awsLambdaHttpErrorHandlerResolver

# Function: awsLambdaHttpErrorHandlerResolver()

> **awsLambdaHttpErrorHandlerResolver**(`blueprint`): `IErrorHandler`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md), `RuntimeError`\>

Error handler resolver for AWS Lambda HTTP adapter.

Creates and configures an `ErrorHandler` for managing errors in the AWS Lambda HTTP adapter.

## Parameters

### blueprint

`IBlueprint`\<`any`\>

The `IBlueprint` providing configuration and dependencies.

## Returns

`IErrorHandler`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md), `RuntimeError`\>

An `ErrorHandler` instance for handling AWS Lambda HTTP errors.

## Defined in

[src/resolvers.ts:98](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/resolvers.ts#L98)
