import { NextPipe } from '@stone-js/pipeline'
import { ConfigContext, IBlueprint } from '@stone-js/core'
import { AWS_LAMBDA_HTTP_PLATFORM, AWS_LAMBDA_PLATFORM } from '../constants'
import { awsLambdaErrorHandlerResolver, awsLambdaHttpErrorHandlerResolver } from '../resolvers'

/**
 * Middleware to set AWS Lambda specific configuration in the blueprint.
 *
 * This middleware checks the current platform from the blueprint. If the platform
 * is AWS Lambda, it sets the error handler resolver to `awsLambdaErrorHandlerResolver`.
 *
 * @param {ConfigContext} context - The configuration context containing modules and blueprint.
 * @param {NextPipe<ConfigContext, IBlueprint>} next - The next middleware function in the pipeline.
 * @returns {IBlueprint | Promise<IBlueprint>} - The modified blueprint or a promise that resolves to the modified blueprint.
 */
export const SetAwsLambdaAdapterConfigMiddleware = ({ modules, blueprint }: ConfigContext, next: NextPipe<ConfigContext, IBlueprint>): IBlueprint | Promise<IBlueprint> => {
  const currentPlatform = blueprint.get<string>('stone.adapter.platform')

  if (currentPlatform === AWS_LAMBDA_PLATFORM) {
    blueprint.set('stone.errorHandler.resolver', awsLambdaErrorHandlerResolver)
  }

  return next({ modules, blueprint })
}

/**
 * Middleware to set AWS Lambda HTTP specific configuration in the blueprint.
 *
 * This middleware checks the current platform from the blueprint. If the platform
 * is AWS Lambda HTTP, it sets the error handler resolver to `awsLambdaHttpErrorHandlerResolver`.
 *
 * @param {ConfigContext} context - The configuration context containing modules and blueprint.
 * @param {NextPipe<ConfigContext, IBlueprint>} next - The next middleware function in the pipeline.
 * @returns {IBlueprint | Promise<IBlueprint>} - The modified blueprint or a promise that resolves to the modified blueprint.
 */
export const SetAwsLambdaHttpAdapterConfigMiddleware = ({ modules, blueprint }: ConfigContext, next: NextPipe<ConfigContext, IBlueprint>): IBlueprint | Promise<IBlueprint> => {
  const currentPlatform = blueprint.get<string>('stone.adapter.platform')

  if (currentPlatform === AWS_LAMBDA_HTTP_PLATFORM) {
    blueprint.set('stone.errorHandler.resolver', awsLambdaHttpErrorHandlerResolver)
  }

  return next({ modules, blueprint })
}
