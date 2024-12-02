import { AWS_LAMBDA_PLATFORM } from '../constants'
import { AdapterConfig, StoneBlueprint } from '@stone-js/core'

/**
 * AwsLambaAdapterConfig Interface.
 *
 * This interface defines the configuration options for the AWS Lambda adapter
 * within the Stone.js framework. It includes settings such as the adapter's alias,
 * resolver, middleware, hooks, and server configurations.
 */
export interface AwsLambaAdapterConfig extends AdapterConfig {}

/**
 * Stone blueprint.
 *
 * This interface defines the main configuration options for the Stone.js framework.
 * It includes settings for the builder, adapters, and the main application,
 * while allowing additional custom options to be added.
 */
export interface AwsLambaAdapterBlueprint extends StoneBlueprint {
  /**
   * Application-level settings, including environment, middleware, logging, and service registration.
   */
  stone: {
    adapters: AwsLambaAdapterConfig[]
  }
}

/**
 * AWS Lambda adapter options.
 *
 * This object defines the configuration for the AWS Lambda adapter.
 */
export const awsLambaAdapterBlueprint: AwsLambaAdapterBlueprint = {
  stone: {
    adapters: [
      {
        alias: AWS_LAMBDA_PLATFORM,
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
