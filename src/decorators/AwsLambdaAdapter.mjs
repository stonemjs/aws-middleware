import { classLevelDecoratorChecker, merge } from '@stone-js/common'
import { AWS_LAMBDA_PLATFORM } from '@stonejs-community/aws-lambda-adapter'
import { awsAdapterOptions } from '@stonejs-community/aws-lambda-adapter/config'

/**
 * Interface for representing a Middleware.
 *
 * @typedef  Middlewareable
 * @property {Function} handle - Will be invoked by the pipeline.
 */

/**
 * Decorators, Useful for decorating classes.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @namespace Decorators
 */

/**
 * AwsLambda options.
 *
 * @typedef  {Object} adapterOptions
 * @property {string} [alias]
 * @property {boolean} [default]
 * @property {Object} [middleware]
 * @property {(Middlewareable[]|string[])} [middleware.input]
 * @property {(Middlewareable[]|string[])} [middleware.output]
 */

/**
 * AwsLambda adapter Decorator: Useful for customizing classes to ensure applications run smoothly on specific platforms.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @memberOf Decorators
 * @param  {adapterOptions} [options]
 * @return {Function}
 */
export const AwsLambdaAdapter = (options = {}) => {
  return (target) => {
    classLevelDecoratorChecker(target)

    const metadata = {
      adapters: [
        merge(awsAdapterOptions.adapters[0], {
          app: {
            adapter: {
              default: options.default ?? false,
              alias: options.alias ?? AWS_LAMBDA_PLATFORM
            },
            mapper: {
              input: {
                middleware: options.input ?? []
              },
              output: {
                middleware: options.output ?? []
              }
            }
          }
        })
      ]
    }

    target.$$metadata$$ = merge(target.$$metadata$$ ?? {}, metadata)

    return target
  }
}
