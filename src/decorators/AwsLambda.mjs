import deepmerge from 'deepmerge'
import { classLevelDecoratorChecker } from '@stone-js/common'
import { AWS_LAMBDA_PLATFORM } from '@stonejs-community/aws-lambda-adapter'
import { awsAdapterOptions } from '@stonejs-community/aws-lambda-adapter/config'

/**
 * Interface for representing a Middleware.
 *
 * @typedef  Middlewareable
 * @property {Function} handle - Will be invoked by the pipeline.
 */

/**
 * Decorators, usefull for decorating classes.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @namespace Decorators
 */

/**
 * AwsLambda options.
 *
 * @typedef  {Object} adapterOptions
 * @property {string} alias
 * @property {Object} middleware
 * @property {(Middlewareable[]|string[])} middleware.input
 * @property {(Middlewareable[]|string[])} middleware.output
 */

/**
 * AwsLambda Decorator: Useful for customizing classes to ensure applications run smoothly on specific platforms.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @memberOf Decorators
 * @param  {adapterOptions} options
 * @return {Function}
 */
export const AwsLambda = (options = {}) => {
  return (target) => {
    classLevelDecoratorChecker(target)

    const metadata = {
      adapters: [
        deepmerge(awsAdapterOptions.adapters[0], {
          app: {
            adapter: {
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

    target.$$metadata$$ = deepmerge(target.$$metadata$$ ?? {}, metadata)

    return target
  }
}
