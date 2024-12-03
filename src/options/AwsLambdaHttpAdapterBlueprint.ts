import { AWS_LAMBDA_HTTP_PLATFORM } from '../constants'
import { awsLambdaHttpAdapterResolver } from '../resolvers'
import { IncomingHttpEvent, OutgoingHttpResponse } from '@stone-js/http-core'
import { IncomingEventMiddleware } from '../middleware/IncomingEventMiddleware'
import { ServerResponseMiddleware } from '../middleware/ServerResponseMiddleware'
import { AdapterConfig, AdapterHandlerMiddleware, StoneBlueprint } from '@stone-js/core'
import { SetAwsLambdaHttpAdapterConfigMiddleware } from '../middleware/configurationMiddleware'

/**
 * Configuration interface for the AWS Lambda Http Adapter.
 *
 * Extends the `AdapterConfig` interface from the Stone.js framework and provides
 * customizable options specific to the AWS Lambda platform. This includes
 * alias, resolver, middleware, hooks, and various adapter state flags.
 */
export interface AwsLambaHttpAdapterConfig extends AdapterConfig {}

/**
 * Blueprint interface for the AWS Lambda Http Adapter.
 *
 * This interface extends `StoneBlueprint` and defines the structure of the
 * AWS Lambda Http adapter blueprint used in the Stone.js framework. It includes
 * a `stone` object with an array of `AwsLambaHttpAdapterConfig` items.
 */
export interface AwsLambaHttpAdapterBlueprint extends StoneBlueprint<IncomingHttpEvent, OutgoingHttpResponse> {}

/**
 * Default blueprint configuration for the AWS Lambda Http Adapter.
 *
 * This blueprint defines the initial configuration for the AWS Lambda Http adapter
 * within the Stone.js framework. It includes:
 * - An alias for the AWS Lambda platform (`AWS_LAMBDA_HTTP_PLATFORM`).
 * - A default resolver function (currently a placeholder).
 * - Middleware, hooks, and state flags (`current`, `default`, `preferred`).
 */
export const awsLambaHttpAdapterBlueprint: AwsLambaHttpAdapterBlueprint = {
  stone: {
    builder: {
      middleware: [
        { priority: 10, pipe: SetAwsLambdaHttpAdapterConfigMiddleware }
      ]
    },
    adapters: [
      {
        platform: AWS_LAMBDA_HTTP_PLATFORM,
        resolver: awsLambdaHttpAdapterResolver,
        middleware: [
          { priority: 0, pipe: IncomingEventMiddleware },
          { priority: 100, pipe: AdapterHandlerMiddleware },
          { priority: 200, pipe: ServerResponseMiddleware }
        ],
        hooks: {},
        current: false,
        default: false,
        preferred: false
      }
    ]
  }
}
