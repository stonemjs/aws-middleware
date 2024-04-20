[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [middleware/ServerResponseMiddleware](../README.md) / ServerResponseMiddleware

# Class: ServerResponseMiddleware

Middleware for handling server responses and transforming them into the appropriate HTTP responses.

This middleware processes outgoing responses and attaches the necessary headers, status codes,
and body content to the HTTP response.

## Constructors

### new ServerResponseMiddleware()

> **new ServerResponseMiddleware**(`options`): [`ServerResponseMiddleware`](ServerResponseMiddleware.md)

Create a ServerResponseMiddleware.

#### Parameters

##### options

Options for creating the ServerResponseMiddleware.

###### blueprint

`IBlueprint`

#### Returns

[`ServerResponseMiddleware`](ServerResponseMiddleware.md)

#### Defined in

[src/middleware/ServerResponseMiddleware.ts:26](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/ServerResponseMiddleware.ts#L26)

## Methods

### handle()

> **handle**(`context`, `next`): `Promise`\<[`RawHttpResponseWrapper`](../../../RawHttpResponseWrapper/classes/RawHttpResponseWrapper.md)\>

Handles the outgoing response, processes it, and invokes the next middleware in the pipeline.

#### Parameters

##### context

[`AwsLambdaHttpAdapterContext`](../../../declarations/interfaces/AwsLambdaHttpAdapterContext.md)

The adapter context containing the raw event, execution context, and other data.

##### next

`NextPipe`\<[`AwsLambdaHttpAdapterContext`](../../../declarations/interfaces/AwsLambdaHttpAdapterContext.md), [`RawHttpResponseWrapper`](../../../RawHttpResponseWrapper/classes/RawHttpResponseWrapper.md)\>

The next middleware to be invoked in the pipeline.

#### Returns

`Promise`\<[`RawHttpResponseWrapper`](../../../RawHttpResponseWrapper/classes/RawHttpResponseWrapper.md)\>

A promise resolving to the processed context.

#### Throws

If required components are missing in the context.

#### Defined in

[src/middleware/ServerResponseMiddleware.ts:38](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/ServerResponseMiddleware.ts#L38)
