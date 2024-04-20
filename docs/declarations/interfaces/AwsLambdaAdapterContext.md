[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [declarations](../README.md) / AwsLambdaAdapterContext

# Interface: AwsLambdaAdapterContext

Represents the context for the AWS Lambda Adapter.

This interface extends `AdapterContext` and includes additional properties
specific to generic AWS Lambda events.

## Extends

- `AdapterContext`\<[`AwsLambdaEvent`](../type-aliases/AwsLambdaEvent.md), [`RawResponse`](../type-aliases/RawResponse.md), [`AwsLambdaContext`](../type-aliases/AwsLambdaContext.md), `IncomingEvent`, `IncomingEventOptions`, `OutgoingResponse`\>

## Properties

### rawResponse

> **rawResponse**: [`RawResponse`](../type-aliases/RawResponse.md)

The raw response associated with the current context.

#### Defined in

[src/declarations.ts:136](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/declarations.ts#L136)
