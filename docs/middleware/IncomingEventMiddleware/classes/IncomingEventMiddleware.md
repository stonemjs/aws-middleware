[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [middleware/IncomingEventMiddleware](../README.md) / IncomingEventMiddleware

# Class: IncomingEventMiddleware

Middleware for handling incoming events and transforming them into Stone.js events.

This class processes incoming HTTP requests, extracting relevant data such as URL, IP addresses,
headers, cookies, and more, and forwards them to the next middleware in the pipeline.

## Constructors

### new IncomingEventMiddleware()

> **new IncomingEventMiddleware**(`options`): [`IncomingEventMiddleware`](IncomingEventMiddleware.md)

Create an IncomingEventMiddleware instance.

#### Parameters

##### options

Options containing the blueprint for resolving configuration and dependencies.

###### blueprint

`IBlueprint`

#### Returns

[`IncomingEventMiddleware`](IncomingEventMiddleware.md)

#### Defined in

[src/middleware/IncomingEventMiddleware.ts:55](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/IncomingEventMiddleware.ts#L55)

## Methods

### handle()

> **handle**(`context`, `next`): `Promise`\<[`RawHttpResponseWrapper`](../../../RawHttpResponseWrapper/classes/RawHttpResponseWrapper.md)\>

Handles the incoming event, processes it, and invokes the next middleware in the pipeline.

#### Parameters

##### context

[`AwsLambdaHttpAdapterContext`](../../../declarations/interfaces/AwsLambdaHttpAdapterContext.md)

The adapter context containing the raw event, execution context, and other data.

##### next

`NextPipe`\<[`AwsLambdaHttpAdapterContext`](../../../declarations/interfaces/AwsLambdaHttpAdapterContext.md), [`RawHttpResponseWrapper`](../../../RawHttpResponseWrapper/classes/RawHttpResponseWrapper.md)\>

The next middleware to be invoked in the pipeline.

#### Returns

`Promise`\<[`RawHttpResponseWrapper`](../../../RawHttpResponseWrapper/classes/RawHttpResponseWrapper.md)\>

A promise that resolves to the processed context.

#### Throws

If required components are missing in the context.

#### Defined in

[src/middleware/IncomingEventMiddleware.ts:67](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/IncomingEventMiddleware.ts#L67)
