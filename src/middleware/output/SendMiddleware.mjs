import statuses from 'statuses'

/**
 * Class representing a SendMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class SendMiddleware {
  /**
   * Handle event result and transform it to platform-specific response.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  handle (passable, next) {
    if (!passable.response.send) {
      if (passable.event.isMethod('HEAD')) {
        passable.response.send = () => ({
          headers: passable.result.headers,
          statusCode: passable.result.statusCode ?? 500,
          statusMessage: passable.result.statusMessage ?? statuses.message[500]
        })
      } else {
        passable.response.send = () => ({
          body: passable.result.content,
          headers: passable.result.headers,
          statusCode: passable.result.statusCode ?? 500,
          statusMessage: passable.result.statusMessage ?? statuses.message[500]
        })
      }
    }

    return next(passable)
  }
}
