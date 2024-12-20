[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [middleware/FilesEventMiddleware](../README.md) / FilesEventMiddleware

# Class: FilesEventMiddleware

Class representing a FilesEventMiddleware.

## Author

Mr. Stone <evensstone@gmail.com>

## Constructors

### new FilesEventMiddleware()

> **new FilesEventMiddleware**(`options`): [`FilesEventMiddleware`](FilesEventMiddleware.md)

Create a FilesEventMiddleware.

#### Parameters

##### options

Options for creating the FilesEventMiddleware.

###### blueprint

`IBlueprint`

#### Returns

[`FilesEventMiddleware`](FilesEventMiddleware.md)

#### Defined in

[src/middleware/FilesEventMiddleware.ts:25](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/FilesEventMiddleware.ts#L25)

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

A promise that resolves to the destination type after processing.

#### Throws

If required components such as the rawEvent or IncomingEventBuilder are not provided.

#### Defined in

[src/middleware/FilesEventMiddleware.ts:38](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/FilesEventMiddleware.ts#L38)
