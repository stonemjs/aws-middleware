[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [decorators/AwsLambdaHttpAdapter](../README.md) / AwsLambdaHttpAdapter

# Function: AwsLambdaHttpAdapter()

> **AwsLambdaHttpAdapter**\<`T`\>(`options`): (`target`, `context`) => `void`

A Stone.js decorator that integrates the AWS Lambda HTTP Adapter with a class.

This decorator modifies the class to seamlessly enable AWS Lambda HTTP as the
execution environment for a Stone.js application. By applying this decorator,
the class is automatically configured with the necessary blueprint for AWS Lambda HTTP.

## Type Parameters

• **T** *extends* `ClassType` = `ClassType`

The type of the class being decorated. Defaults to `ClassType`.

## Parameters

### options

[`AwsLambdaHttpAdapterOptions`](../interfaces/AwsLambdaHttpAdapterOptions.md) = `{}`

Optional configuration to customize the AWS Lambda HTTP Adapter.

## Returns

`Function`

A class decorator that applies the AWS Lambda HTTP adapter configuration.

### Parameters

#### target

`T`

#### context

`ClassDecoratorContext`\<`T`\>

### Returns

`void`

## Example

```typescript
import { AwsLambdaHttpAdapter } from '@stone-js/aws-lambda-adapter';

@AwsLambdaHttpAdapter({
  alias: 'MyAwsLambdaHttpAdapter',
  current: true,
})
class App {
  // Your application logic here
}
```

## Defined in

[src/decorators/AwsLambdaHttpAdapter.ts:35](https://github.com/stonemjs/aws-lambda-adapter/blob/f00bc5adf35a7d817c9d8d34c42561c4c82e758d/src/decorators/AwsLambdaHttpAdapter.ts#L35)
