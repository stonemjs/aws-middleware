import statuses from 'statuses'
import { BinaryFileResponse } from '@stone-js/http'

/**
 * Input data to transform via middleware.
 *
 * @typedef  Passable
 * @property {Object} message - Incomming message.
 * @property {Object} response - Outgoing response.
 * @property {Object} event - IncomingEvent's constructor options.
 * @property {Object} result - Result after processing the IncomingEvent.
 */

/**
 * Class representing a SendFileMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class SendFileMiddleware {
  /**
   * Handle event result and transform it to platform-specific response.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  handle (passable, next) {
    if (passable.result instanceof BinaryFileResponse) {
      if (passable.event.isMethod('HEAD')) {
        passable.response.send = () => ({
          headers: passable.result.headers,
          statusCode: passable.result.statusCode ?? 500,
          statusMessage: passable.result.statusMessage ?? statuses.message[500]
        })
      } else {
        passable.response.send = () => ({
          headers: passable.result.headers,
          body: passable.result.getFile().getContent(),
          statusCode: passable.result.statusCode ?? 500,
          statusMessage: passable.result.statusMessage ?? statuses.message[500]
        })
      }
    }

    return next(passable)
  }
}
