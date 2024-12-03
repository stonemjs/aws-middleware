[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [resolvers](../README.md) / awsLambdaErrorHandlerResolver

# Function: awsLambdaErrorHandlerResolver()

> **awsLambdaErrorHandlerResolver**(`blueprint`): `IErrorHandler`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md)\>

Error handler resolver for generic AWS Lambda adapter.

Creates and configures an `ErrorHandler` for managing errors in the generic AWS Lambda adapter.

## Parameters

### blueprint

`IBlueprint`\<`any`\>

The `IBlueprint` providing configuration and dependencies.

## Returns

`IErrorHandler`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md)\>

An `ErrorHandler` instance for handling AWS Lambda errors.

## Defined in

[src/resolvers.ts:80](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/resolvers.ts#L80)
