[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [middleware/BodyEventMiddleware](../README.md) / BodyEventMiddleware

# Class: BodyEventMiddleware

Class representing a BodyEventMiddleware.

This middleware handles platform-specific messages and transforms them into Stone.js IncomingEvent objects.

## Author

Mr. Stone

## Constructors

### new BodyEventMiddleware()

> **new BodyEventMiddleware**(`options`): [`BodyEventMiddleware`](BodyEventMiddleware.md)

Create a BodyEventMiddleware.

#### Parameters

##### options

Options for creating the BodyEventMiddleware.

###### blueprint

`IBlueprint`

#### Returns

[`BodyEventMiddleware`](BodyEventMiddleware.md)

#### Defined in

[src/middleware/BodyEventMiddleware.ts:38](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/BodyEventMiddleware.ts#L38)

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

[src/middleware/BodyEventMiddleware.ts:51](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/BodyEventMiddleware.ts#L51)

***

### toNodeMessage()

> **toNodeMessage**(`rawEvent`): `IncomingMessage`

#### Parameters

##### rawEvent

[`AwsLambdaHttpEvent`](../../../declarations/interfaces/AwsLambdaHttpEvent.md)

#### Returns

`IncomingMessage`

#### Defined in

[src/middleware/BodyEventMiddleware.ts:63](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/middleware/BodyEventMiddleware.ts#L63)
