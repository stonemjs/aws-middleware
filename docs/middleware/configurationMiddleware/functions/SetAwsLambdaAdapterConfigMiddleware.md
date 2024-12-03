[**AWS Lambda Adapter Documentation v0.0.0**](../../../README.md)

***

[AWS Lambda Adapter Documentation](../../../modules.md) / [middleware/configurationMiddleware](../README.md) / SetAwsLambdaAdapterConfigMiddleware

# Function: SetAwsLambdaAdapterConfigMiddleware()

> **SetAwsLambdaAdapterConfigMiddleware**(`context`, `next`): `IBlueprint` \| `Promise`\<`IBlueprint`\>

Middleware to set AWS Lambda specific configuration in the blueprint.

This middleware checks the current platform from the blueprint. If the platform
is AWS Lambda, it sets the error handler resolver to `awsLambdaErrorHandlerResolver`.

## Parameters

### context

`ConfigContext`

The configuration context containing modules and blueprint.

### next

`NextPipe`\<`ConfigContext`, `IBlueprint`\>

The next middleware function in the pipeline.

## Returns

`IBlueprint` \| `Promise`\<`IBlueprint`\>

- The modified blueprint or a promise that resolves to the modified blueprint.

## Defined in

src/middleware/configurationMiddleware.ts:16
