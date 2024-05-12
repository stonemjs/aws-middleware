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
 * Class representing a SendResultMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class SendResultMiddleware {
  /**
   * Handle event result and transform it to platform-specific response.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  handle (passable, next) {
    if (!passable.response.send) {
      passable.response.send = () => passable.result
    }

    return next(passable)
  }
}
