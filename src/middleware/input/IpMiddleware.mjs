import proxyAddr from 'proxy-addr'
import { isIpTrusted } from '@stone-js/adapters/utils'

/**
 * Class representing an IpMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class IpMiddleware {
  /**
   * Create an IpMiddleware.
   *
   * @param {Container} container
   * @param {Config} container.config
   */
  constructor ({ config }) {
    const proxy = config.get('app.adapter.proxy', { trusted: [], untrusted: [] })

    this._trusted = proxy.trusted
    this._untrusted = proxy.untrusted
  }

  /**
   * Handle platform-specific message and transform it to Stone.js IncomingEvent or HTTPEvent.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  handle (passable, next) {
    const message = this.#normalizeEvent(passable.message)
    const isTrusted = isIpTrusted(this._trusted, this._untrusted)
    const addrs = proxyAddr.all(message, isTrusted).filter((_, i) => i > 0)

    passable.event.ips = addrs.reverse()
    passable.event.ip = proxyAddr(message, isTrusted)

    return next(passable)
  }

  #normalizeEvent (message) {
    return {
      headers: {
        'x-forwarded-for': message.headers['x-forwarded-for'] ?? message.headers['X-Forwarded-For']
      },
      connection: {
        remoteAddress: message.requestContext?.identity?.sourceIp ?? message.requestContext?.http?.sourceIp
      }
    }
  }
}
