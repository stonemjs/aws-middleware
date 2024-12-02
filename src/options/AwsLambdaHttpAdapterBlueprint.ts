import { AWS_LAMBDA_HTTP_PLATFORM } from '../constants'
import { AdapterConfig, StoneBlueprint } from '@stone-js/core'

/**
 * AwsLambaHttpAdapterConfig Interface.
 *
 * This interface defines the configuration options for the AWS Lambda HTTP adapter
 * within the Stone.js framework. It includes settings such as the adapter's alias,
 * resolver, middleware, hooks, and server configurations.
 */
export interface AwsLambaHttpAdapterConfig extends AdapterConfig {}

/**
 * Stone blueprint.
 *
 * This interface defines the main configuration options for the Stone.js framework.
 * It includes settings for the builder, adapters, and the main application,
 * while allowing additional custom options to be added.
 */
export interface AwsLambaHttpAdapterBlueprint extends StoneBlueprint {
  /**
   * Application-level settings, including environment, middleware, logging, and service registration.
   */
  stone: {
    adapters: AwsLambaHttpAdapterConfig[]
  }
}

/**
 * AWS Lambda HTTP adapter options.
 *
 * This object defines the configuration for the AWS Lambda HTTP adapter.
 */
export const awsLambaHttpAdapterBlueprint: AwsLambaHttpAdapterBlueprint = {
  stone: {
    adapters: [
      {
        alias: AWS_LAMBDA_HTTP_PLATFORM,
        resolver: () => {},
        middleware: [],
        hooks: {},
        current: false,
        default: false,
        preferred: false
      }
    ]
  }
}
