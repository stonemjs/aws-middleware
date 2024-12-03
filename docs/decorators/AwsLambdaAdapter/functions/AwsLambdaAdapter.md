[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [decorators/AwsLambdaAdapter](../README.md) / AwsLambdaAdapter

# Function: AwsLambdaAdapter()

> **AwsLambdaAdapter**\<`T`\>(`options`): (`target`, `context`) => `void`

A Stone.js decorator that integrates the AWS Lambda Adapter with a class.

This decorator modifies the class to seamlessly enable AWS Lambda as the
execution environment for a Stone.js application. By applying this decorator,
the class is automatically configured with the necessary blueprint for AWS Lambda.

## Type Parameters

• **T** *extends* `ClassType` = `ClassType`

The type of the class being decorated. Defaults to `ClassType`.

## Parameters

### options

[`AwsLambdaAdapterOptions`](../interfaces/AwsLambdaAdapterOptions.md) = `{}`

Optional configuration to customize the AWS Lambda Adapter.

## Returns

`Function`

A class decorator that applies the AWS Lambda adapter configuration.

### Parameters

#### target

`T`

#### context

`ClassDecoratorContext`\<`T`\>

### Returns

`void`

## Example

```typescript
import { AwsLambdaAdapter } from '@stone-js/aws-lambda-adapter';

@AwsLambdaAdapter({
  alias: 'MyAWSLambdaAdapter',
})
class App {
  // Your application logic here
}
```

## Defined in

[src/decorators/AwsLambdaAdapter.ts:34](https://github.com/stonemjs/aws-middleware/blob/f8f28d71d5c0361fb5acf8a9a666be52d9e731c3/src/decorators/AwsLambdaAdapter.ts#L34)
