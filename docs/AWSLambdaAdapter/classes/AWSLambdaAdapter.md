[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [AWSLambdaAdapter](../README.md) / AWSLambdaAdapter

# Class: AWSLambdaAdapter

AWS Lambda Adapter for Stone.js.

The `AWSLambdaAdapter` provides seamless integration between Stone.js applications
and the AWS Lambda environment. It processes incoming events from AWS Lambda,
transforms them into `IncomingEvent` instances, and returns a `RawResponse`.

This adapter ensures compatibility with AWS Lambda's execution model and
abstracts the event handling process for Stone.js developers.

## Template

The type of the raw event received from AWS Lambda.

## Template

The type of the response to send back to AWS Lambda.

## Template

The AWS Lambda execution context type.

## Template

The type of the processed incoming event.

## Template

Options used to create an incoming event.

## Template

The type of the outgoing response after processing.

## Template

Context type specific to the adapter.

## Example

```typescript
import { AWSLambdaAdapter } from '@stone-js/aws-lambda-adapter';

const adapter = AWSLambdaAdapter.create({...});

const handler = await adapter.run();

export { handler };
```

## See

 - [Stone.js Documentation](https://stone-js.com/docs)
 - [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)

## Extends

- `Adapter`\<[`AwsLambdaEvent`](../../declarations/type-aliases/AwsLambdaEvent.md), [`RawResponse`](../../declarations/type-aliases/RawResponse.md), [`AwsLambdaContext`](../../declarations/type-aliases/AwsLambdaContext.md), `IncomingEvent`, `IncomingEventOptions`, `OutgoingResponse`, [`AwsLambdaAdapterContext`](../../declarations/interfaces/AwsLambdaAdapterContext.md)\>

## Constructors

### new AWSLambdaAdapter()

> `protected` **new AWSLambdaAdapter**(`options`): [`AWSLambdaAdapter`](AWSLambdaAdapter.md)

Create an Adapter.

#### Parameters

##### options

`AdapterOptions`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md), `IncomingEvent`, `OutgoingResponse`\>

Adapter options.

#### Returns

[`AWSLambdaAdapter`](AWSLambdaAdapter.md)

#### Inherited from

`Adapter<
AwsLambdaEvent,
RawResponse,
AwsLambdaContext,
IncomingEvent,
IncomingEventOptions,
OutgoingResponse,
AwsLambdaAdapterContext
>.constructor`

#### Defined in

node\_modules/@stone-js/core/dist/index.d.ts:1772

## Methods

### eventListener()

> `protected` **eventListener**(`rawEvent`, `executionContext`): `Promise`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md)\>

Processes an incoming AWS Lambda event.

This method transforms the raw AWS Lambda event into a Stone.js `IncomingEvent`,
processes it through the pipeline, and generates a `RawResponse` to send back.

#### Parameters

##### rawEvent

[`AwsLambdaEvent`](../../declarations/type-aliases/AwsLambdaEvent.md)

The raw AWS Lambda event to be processed.

##### executionContext

[`AwsLambdaContext`](../../declarations/type-aliases/AwsLambdaContext.md)

The AWS Lambda execution context for the event.

#### Returns

`Promise`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md)\>

A promise resolving to the processed `RawResponse`.

#### Defined in

[src/AWSLambdaAdapter.ts:115](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/AWSLambdaAdapter.ts#L115)

***

### onInit()

> `protected` **onInit**(): `Promise`\<`void`\>

Initializes the adapter and validates its execution context.

Ensures the adapter is running in an AWS Lambda environment. If not, it
throws an error to prevent misuse.

#### Returns

`Promise`\<`void`\>

#### Throws

If executed outside an AWS Lambda context (e.g., browser).

#### Overrides

`Adapter.onInit`

#### Defined in

[src/AWSLambdaAdapter.ts:95](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/AWSLambdaAdapter.ts#L95)

***

### run()

> **run**\<`ExecutionResultType`\>(): `Promise`\<`ExecutionResultType`\>

Executes the adapter and provides an AWS Lambda-compatible handler function.

The `run` method initializes the adapter and returns a handler function
that AWS Lambda can invoke. This handler processes events, manages context,
and returns the appropriate response.

#### Type Parameters

• **ExecutionResultType** = [`AwsLambdaEventHandlerFunction`](../../declarations/type-aliases/AwsLambdaEventHandlerFunction.md)

The type representing the AWS Lambda event handler function.

#### Returns

`Promise`\<`ExecutionResultType`\>

A promise resolving to the AWS Lambda handler function.

#### Throws

If used outside the AWS Lambda environment.

#### Overrides

`Adapter.run`

#### Defined in

[src/AWSLambdaAdapter.ts:77](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/AWSLambdaAdapter.ts#L77)

***

### create()

> `static` **create**(`options`): [`AWSLambdaAdapter`](AWSLambdaAdapter.md)

Creates an instance of the `AWSLambdaAdapter`.

This factory method allows developers to instantiate the adapter with
the necessary configuration options, ensuring it is correctly set up for
AWS Lambda usage.

#### Parameters

##### options

`AdapterOptions`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md), `IncomingEvent`, `OutgoingResponse`\>

The configuration options for the adapter, including
                 handler resolver, error handling, and other settings.

#### Returns

[`AWSLambdaAdapter`](AWSLambdaAdapter.md)

A fully initialized `AWSLambdaAdapter` instance.

#### Defined in

[src/AWSLambdaAdapter.ts:60](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/AWSLambdaAdapter.ts#L60)
