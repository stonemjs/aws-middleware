import { CookieCollection } from '@stone-js/http'
import { getProtocol } from '@stone-js/middleware/utils'

/**
 * Class representing a CommonMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class CommonMiddleware {
  /**
   * Create a CommonMiddleware.
   *
   * @param {Container} container
   * @param {Config} container.config
   */
  constructor ({ config }) {
    const cookie = config.get('app.adapter.cookie', { options: {} })
    const proxy = config.get('app.adapter.proxy', { trusted: [], untrusted: [] })

    this._options = {
      trustedIp: proxy.trusted,
      untrustedIp: proxy.untrusted
    }
    this._cookie = {
      options: cookie.options,
      secret: cookie.secret ?? config.get('app.secret', null)
    }
  }

  /**
   * Handle platform-specific message and transform it to Stone.js IncomingEvent or HTTPEvent.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  handle (passable, next) {
    passable.event.metadata ??= {}
    passable.event.headers = passable.message.headers
    passable.event.method = this.#getMethod(passable.message)
    passable.event.protocol = this.#getProtocol(passable.message)
    passable.event.queryString = passable.message.queryStringParameters
    passable.event.metadata.lambda = { message: passable.message, context: passable.ctx }
    passable.event.cookies = CookieCollection.create(passable.message.headers.cookie, this._cookie.options, this._cookie.secret)

    return next(passable)
  }

  #getMethod (message) {
    return message.httpMethod ??
      message.requestContext?.httpMethod ??
      message.requestContext?.http?.method ??
      'GET'
  }

  #getProtocol (message) {
    const remoteAddress = message.requestContext?.identity?.sourceIp ?? message.requestContext?.http?.sourceIp
    return getProtocol(remoteAddress, message.headers, true, this._options)
  }
}
