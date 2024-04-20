[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [RawResponseWrapper](../README.md) / RawResponseWrapper

# Class: RawResponseWrapper

Wrapper for generic raw responses.

The `RawResponseWrapper` is responsible for encapsulating a raw response
and returning it in a structure that aligns with the Stone.js framework's requirements.
It implements the `IRawResponseWrapper` interface, ensuring compatibility with the framework.

## Implements

- `IRawResponseWrapper`\<[`RawResponse`](../../declarations/type-aliases/RawResponse.md)\>

## Methods

### respond()

> **respond**(): [`RawResponse`](../../declarations/type-aliases/RawResponse.md)

Constructs and returns the raw response.

The `respond` method generates and returns the raw response based on
the provided options. The response is returned as-is, allowing for
maximum flexibility in defining its structure.

#### Returns

[`RawResponse`](../../declarations/type-aliases/RawResponse.md)

A `RawResponse` object containing the response options.

#### Example

```typescript
const responseWrapper = RawResponseWrapper.create({ body: 'Hello, world!' });
const response = responseWrapper.respond();
console.log(response); // { body: 'Hello, world!' }
```

#### Implementation of

`IRawResponseWrapper.respond`

#### Defined in

[src/RawResponseWrapper.ts:62](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/RawResponseWrapper.ts#L62)

***

### create()

> `static` **create**(`options`): [`RawResponseWrapper`](RawResponseWrapper.md)

Factory method to create an instance of `RawResponseWrapper`.

This method initializes the wrapper with a set of partial response options.

#### Parameters

##### options

`Partial`\<`RawResponseOptions`\>

Partial options to configure the raw response.

#### Returns

[`RawResponseWrapper`](RawResponseWrapper.md)

A new instance of `RawResponseWrapper`.

#### Example

```typescript
const responseWrapper = RawResponseWrapper.create({
  headers: { 'Content-Type': 'application/json' },
  body: { message: 'Success' },
  statusCode: 200,
});

const response = responseWrapper.respond();
console.log(response); // { headers: { 'Content-Type': 'application/json' }, body: { message: 'Success' }, statusCode: 200 }
```

#### Defined in

[src/RawResponseWrapper.ts:32](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/RawResponseWrapper.ts#L32)
