import { AdapterMapper } from '@stone-js/core'
import { IncomingHttpEvent } from '@stone-js/http-core'
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
          type: AdapterMapper,

          // Input mapper resolve
          resolver: (passable) => IncomingHttpEvent.create(passable.event),

          // Input mapper middleware. Can be class constructor or alias.
          // Middleware must be registered before using it in the app middleware array.
          middleware: [
            { pipe: IpMiddleware, priority: 0 },
            { pipe: CommonMiddleware, priority: 0.1 },
            { pipe: HostMiddleware, priority: 0.2 },
            { pipe: BodyMiddleware, priority: 0.3 },
            { pipe: FilesMiddleware, priority: 0.4 }
          ]
        },

        // Output mapper options
        // Use this mapper for outgoing app response.
        output: {

          // Mapper class constructor.
          type: AdapterMapper,

          // Output mapper resolve
          resolver: (passable) => passable.response,

          // Output mapper middleware. Can be class constructor or alias.
          // Middleware must be registered before using it in the app middleware array.
          middleware: [
            { pipe: SendMiddleware, priority: 0 },
            { pipe: SendFileMiddleware, priority: 0.1 }
          ]
        }
      }
    }
  }]
}
