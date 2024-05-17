import { Mapper } from '@stone-js/adapters'
import { IncomingEvent } from '@stone-js/common'
import {
  AWSLambdaAdapter,
  AWS_LAMBDA_PLATFORM,
  SendResultMiddleware
} from '@stonejs-community/aws-lambda-adapter'

/**
 * Aws adapter options.
 *
 * @returns {Object}
*/
export const awsAdapterOptions = {
  // Adapters namespace
  adapters: [{
    // App namespace
    app: {

      // Adapter options to be merged with global adapter options.
      adapter: {

        // Here you can define your adapter alias name.
        alias: AWS_LAMBDA_PLATFORM,

        // Here you can define your default adapter
        default: false,

        // Adapter class constructor.
        type: AWSLambdaAdapter
      },

      // Adapter mapper options.
      mapper: {

        // Input mapper options
        // Use this mapper for incomming platform event.
        input: {

          // Mapper class constructor.
          type: Mapper,

          // Input mapper resolve
          resolver: (passable) => IncomingEvent.create(passable.event),

          // Input mapper middleware. Can be class constructor or alias.
          // Middleware must be registered before using it in the app middleware array.
          middleware: []
        },

        // Output mapper options
        // Use this mapper for outgoing app response.
        output: {

          // Mapper class constructor.
          type: Mapper,

          // Output mapper resolve
          resolver: (passable) => passable.response,

          // Output mapper middleware. Can be class constructor or alias.
          // Middleware must be registered before using it in the app middleware array.
          middleware: [
            { pipe: SendResultMiddleware, priority: 0 }
          ]
        }
      }
    }
  }]
}
