[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [AWSLambdaHttpAdapter](../README.md) / AWSLambdaHttpAdapter

# Class: AWSLambdaHttpAdapter

AWS Lambda HTTP Adapter for Stone.js.

The `AWSLambdaHttpAdapter` extends the functionality of the Stone.js `Adapter`
to provide seamless integration with AWS Lambda for HTTP-based events. This adapter
transforms incoming HTTP events from AWS Lambda into `IncomingHttpEvent` instances
and produces a `RawHttpResponse` as output.

This adapter simplifies the process of handling HTTP events within AWS Lambda
while adhering to the Stone.js framework's event-driven architecture.

## Template

The type of the raw HTTP event from AWS Lambda.

## Template

The type of the raw HTTP response to send back.

## Template

The AWS Lambda execution context type.

## Template

The type of the processed incoming HTTP event.

## Template

Options used to create an incoming HTTP event.

## Template

The type of the outgoing HTTP response after processing.

## Template

Context type specific to the HTTP adapter.

## Example

```typescript
import { AWSLambdaHttpAdapter } from '@stone-js/aws-lambda-adapter';

const adapter = AWSLambdaHttpAdapter.create({...});

const handler = await adapter.run();

export { handler };
```

## See

 - [Stone.js Documentation](https://stone-js.com/docs)
 - [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/)

## Extends

- `Adapter`\<[`AwsLambdaHttpEvent`](../../declarations/interfaces/AwsLambdaHttpEvent.md), [`RawHttpResponse`](../../declarations/type-aliases/RawHttpResponse.md), [`AwsLambdaContext`](../../declarations/type-aliases/AwsLambdaContext.md), `IncomingHttpEvent`, `IncomingHttpEventOptions`, `OutgoingHttpResponse`, [`AwsLambdaHttpAdapterContext`](../../declarations/interfaces/AwsLambdaHttpAdapterContext.md)\>

## Constructors

### new AWSLambdaHttpAdapter()

> `protected` **new AWSLambdaHttpAdapter**(`options`): [`AWSLambdaHttpAdapter`](AWSLambdaHttpAdapter.md)

Create an Adapter.

#### Parameters

##### options

`AdapterOptions`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md), `IncomingHttpEvent`, `OutgoingHttpResponse`\>

Adapter options.

#### Returns

[`AWSLambdaHttpAdapter`](AWSLambdaHttpAdapter.md)

#### Inherited from

`Adapter<
AwsLambdaHttpEvent,
RawHttpResponse,
AwsLambdaContext,
IncomingHttpEvent,
IncomingHttpEventOptions,
OutgoingHttpResponse,
AwsLambdaHttpAdapterContext
>.constructor`

#### Defined in

node\_modules/@stone-js/core/dist/index.d.ts:1747

## Methods

### eventListener()

> `protected` **eventListener**(`rawEvent`, `executionContext`): `Promise`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md)\>

Processes an incoming AWS Lambda HTTP event.

Converts a raw AWS Lambda HTTP event into an `IncomingHttpEvent`, processes it through
the Stone.js pipeline, and generates a `RawHttpResponse` to send back.

#### Parameters

##### rawEvent

[`AwsLambdaHttpEvent`](../../declarations/interfaces/AwsLambdaHttpEvent.md)

The raw HTTP event received from AWS Lambda.

##### executionContext

[`AwsLambdaContext`](../../declarations/type-aliases/AwsLambdaContext.md)

The AWS Lambda execution context associated with the event.

#### Returns

`Promise`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md)\>

A promise resolving to the processed `RawHttpResponse`.

#### Defined in

[src/AWSLambdaHttpAdapter.ts:115](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/AWSLambdaHttpAdapter.ts#L115)

***

### onInit()

> `protected` **onInit**(): `Promise`\<`void`\>

Initializes the adapter and validates its execution context.

Ensures that the adapter is running in an AWS Lambda environment. Throws an error
if it detects that the adapter is being used in an unsupported environment (e.g., a browser).

#### Returns

`Promise`\<`void`\>

#### Throws

If executed outside an AWS Lambda environment.

#### Overrides

`Adapter.onInit`

#### Defined in

[src/AWSLambdaHttpAdapter.ts:95](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/AWSLambdaHttpAdapter.ts#L95)

***

### run()

> **run**\<`ExecutionResultType`\>(): `Promise`\<`ExecutionResultType`\>

Executes the adapter and provides an AWS Lambda-compatible HTTP handler function.

This method initializes the adapter and returns a handler function that can
process HTTP events in AWS Lambda. It transforms raw events into `IncomingHttpEvent`
instances and produces `RawHttpResponse` objects as output.

#### Type Parameters

• **ExecutionResultType** = [`AwsLambdaEventHandlerFunction`](../../declarations/type-aliases/AwsLambdaEventHandlerFunction.md)\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md)\>

The type representing the AWS Lambda event handler function.

#### Returns

`Promise`\<`ExecutionResultType`\>

A promise resolving to the AWS Lambda HTTP handler function.

#### Throws

If used outside the AWS Lambda environment.

#### Overrides

`Adapter.run`

#### Defined in

[src/AWSLambdaHttpAdapter.ts:77](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/AWSLambdaHttpAdapter.ts#L77)

***

### create()

> `static` **create**(`options`): [`AWSLambdaHttpAdapter`](AWSLambdaHttpAdapter.md)

Creates an instance of the `AWSLambdaHttpAdapter`.

This factory method initializes the adapter with the specified configuration options.

#### Parameters

##### options

`AdapterOptions`\<[`RawHttpResponseOptions`](../../declarations/interfaces/RawHttpResponseOptions.md), `IncomingHttpEvent`, `OutgoingHttpResponse`\>

Configuration options for the adapter, including the handler resolver
                 and error handling mechanisms.

#### Returns

[`AWSLambdaHttpAdapter`](AWSLambdaHttpAdapter.md)

A new instance of `AWSLambdaHttpAdapter`.

#### Defined in

[src/AWSLambdaHttpAdapter.ts:60](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/AWSLambdaHttpAdapter.ts#L60)
