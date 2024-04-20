[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [resolvers](../README.md) / awsLambdaErrorHandlerResolver

# Function: awsLambdaErrorHandlerResolver()

> **awsLambdaErrorHandlerResolver**(`blueprint`): `IErrorHandler`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md), `RuntimeError`\>

Error handler resolver for generic AWS Lambda adapter.

Creates and configures an `ErrorHandler` for managing errors in the generic AWS Lambda adapter.

## Parameters

### blueprint

`IBlueprint`\<`any`\>

The `IBlueprint` providing configuration and dependencies.

## Returns

`IErrorHandler`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md), `RuntimeError`\>

An `ErrorHandler` instance for handling AWS Lambda errors.

## Defined in

[src/resolvers.ts:80](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/resolvers.ts#L80)
