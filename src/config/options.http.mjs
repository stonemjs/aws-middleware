import { Mapper } from '@stone-js/adapters'
import { IncomingHttpEvent } from '@stone-js/http'
import {
  IpMiddleware,
  BodyMiddleware,
  HostMiddleware,
  SendMiddleware,
  FilesMiddleware,
  AWSLambdaAdapter,
  CommonMiddleware,
  SendFileMiddleware,
  AWS_LAMBDA_PLATFORM
} from '@stonejs-community/aws-lambda-adapter'

/**
 * Aws http adapter options.
 *
 * @returns {Object}
*/
export const awsHttpAdapterOptions = {
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
          resolver: (passable) => IncomingHttpEvent.create(passable.event),

          // Input mapper middleware. Can be class constructor or alias.
          // Middleware must be registered before using it in the app middleware array.
          middleware: [BodyMiddleware, CommonMiddleware, FilesMiddleware, HostMiddleware, IpMiddleware]
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
          middleware: [SendFileMiddleware, SendMiddleware]
        }
      }
    }
  }]
}
