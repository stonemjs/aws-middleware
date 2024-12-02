import { AWS_LAMBDA_PLATFORM } from '../constants'
import { awsLambdaAdapterResolver, awsLambdaErrorHandlerResolver, awsLambdaKernelResolver } from '../resolvers'
import { AdapterConfig, AdapterHandlerMiddleware, KernelHandlerMiddleware, StoneBlueprint } from '@stone-js/core'

/**
 * Configuration interface for the AWS Lambda Adapter.
 *
 * Extends the `AdapterConfig` interface from the Stone.js framework and provides
 * customizable options specific to the AWS Lambda platform. This includes
 * alias, resolver, middleware, hooks, and various adapter state flags.
 */
export interface AwsLambaAdapterConfig extends AdapterConfig {}

/**
 * Blueprint interface for the AWS Lambda Adapter.
 *
 * This interface extends `StoneBlueprint` and defines the structure of the
 * AWS Lambda adapter blueprint used in the Stone.js framework. It includes
 * a `stone` object with an array of `AwsLambaAdapterConfig` items.
 */
export interface AwsLambaAdapterBlueprint extends StoneBlueprint {}

/**
 * Default blueprint configuration for the AWS Lambda Adapter.
 *
 * This blueprint defines the initial configuration for the AWS Lambda adapter
 * within the Stone.js framework. It includes:
 * - An alias for the AWS Lambda platform (`AWS_LAMBDA_PLATFORM`).
 * - A default resolver function (currently a placeholder).
 * - Middleware, hooks, and state flags (`current`, `default`, `preferred`).
 */
export const awsLambaAdapterBlueprint: AwsLambaAdapterBlueprint = {
  stone: {
    adapters: [
      {
        alias: AWS_LAMBDA_PLATFORM,
        resolver: awsLambdaAdapterResolver,
        middleware: [
          { priority: 100, pipe: AdapterHandlerMiddleware }
        ],
        hooks: {},
        current: false,
        default: false,
        preferred: false
      }
    ],
    kernel: {
      resolver: awsLambdaKernelResolver,
      middleware: [
        { priority: 100, pipe: KernelHandlerMiddleware }
      ]
    },
    errorHandler: {
      levels: {} as any,
      dontReport: new Set([]),
      withoutDuplicates: true,
      resolver: awsLambdaErrorHandlerResolver
    }
  }
}
