[**AWS Lambda Adapter Documentation v0.0.0**](../../README.md)

***

[AWS Lambda Adapter Documentation](../../modules.md) / [declarations](../README.md) / AwsLambdaHttpEvent

# Interface: AwsLambdaHttpEvent

Represents the structure of an AWS Lambda HTTP event.

This interface defines the standard properties of an HTTP event in AWS Lambda,
including headers, query parameters, the request context, and other metadata.

## Extends

- `Record`\<`string`, `unknown`\>

## Indexable

 \[`key`: `string`\]: `unknown`

## Properties

### body?

> `optional` **body**: `unknown`

The body of the HTTP request.

#### Defined in

[src/declarations.ts:52](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L52)

***

### encoding?

> `optional` **encoding**: `string`

The encoding format of the body, such as `base64`.

#### Defined in

[src/declarations.ts:57](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L57)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

The headers of the HTTP request as key-value pairs.

#### Defined in

[src/declarations.ts:72](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L72)

***

### httpMethod?

> `optional` **httpMethod**: `string`

The HTTP method of the request (e.g., `GET`, `POST`).

#### Defined in

[src/declarations.ts:77](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L77)

***

### isBase64Encoded?

> `optional` **isBase64Encoded**: `boolean`

Indicates whether the request body is base64-encoded.

#### Defined in

[src/declarations.ts:67](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L67)

***

### path?

> `optional` **path**: `string`

The path of the HTTP request.

#### Defined in

[src/declarations.ts:47](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L47)

***

### queryStringParameters?

> `optional` **queryStringParameters**: `Record`\<`string`, `string`\>

The query string parameters included in the request.

#### Defined in

[src/declarations.ts:82](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L82)

***

### rawPath?

> `optional` **rawPath**: `string`

The raw path of the HTTP request, as sent by the client.

#### Defined in

[src/declarations.ts:62](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L62)

***

### requestContext?

> `optional` **requestContext**: `object`

The context of the request, including identity and HTTP metadata.

#### http?

> `optional` **http**: `object`

##### http.method?

> `optional` **method**: `string`

##### http.sourceIp?

> `optional` **sourceIp**: `string`

#### httpMethod?

> `optional` **httpMethod**: `string`

#### identity?

> `optional` **identity**: `object`

##### identity.sourceIp?

> `optional` **sourceIp**: `string`

#### Defined in

[src/declarations.ts:87](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/declarations.ts#L87)
