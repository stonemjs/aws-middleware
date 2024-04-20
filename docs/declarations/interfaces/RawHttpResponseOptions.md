[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [declarations](../README.md) / RawHttpResponseOptions

# Interface: RawHttpResponseOptions

Represents options for configuring a raw HTTP response.

Extends the `RawResponseOptions` interface to include additional properties
for managing response content, headers, status codes, and streaming files.

## Extends

- `RawResponseOptions`

## Indexable

 \[`k`: `string` \| `number` \| `symbol`\]: `unknown`

## Properties

### body?

> `optional` **body**: `unknown`

The body of the HTTP response. Can be of any type, including strings, objects, or buffers.

#### Defined in

[src/declarations.ts:149](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/declarations.ts#L149)

***

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Headers to include in the HTTP response.
Can be provided as key-value pairs.

#### Defined in

[src/declarations.ts:165](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/declarations.ts#L165)

***

### statusCode

> **statusCode**: `number`

The HTTP status code of the response (e.g., `200`, `404`).

#### Defined in

[src/declarations.ts:154](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/declarations.ts#L154)

***

### statusMessage?

> `optional` **statusMessage**: `string`

The status message accompanying the HTTP status code (e.g., `OK`, `Not Found`).

#### Defined in

[src/declarations.ts:159](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/declarations.ts#L159)
