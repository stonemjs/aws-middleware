import bytes from 'bytes'
import typeIs from 'type-is'
import { Buffer } from 'safe-buffer'
import { HttpError } from '@stone-js/event-foundation'
import { isMultipart, getType, getCharset } from '@stone-js/event-foundation/utils'

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
 * Class representing a BodyMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class BodyMiddleware {
  /**
   * Create a BodyMiddleware.
   *
   * @param {Container} container
   * @param {Config} container.config
   */
  constructor ({ config }) {
    const body = config.get('app.adapter.body', {
      limit: '100kb',
      defaultCharset: 'utf-8',
      defaultType: 'text/plain'
    })

    this._limit = body.limit
    this._defaultType = body.defaultType
    this._defaultCharset = body.defaultCharset
  }

  /**
   * Handle platform-specific message and transform it to Stone.js IncomingEvent or HTTPEvent.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  handle (passable, next) {
    if (!isMultipart(passable.message)) {
      passable.event.body = this.#getBody(passable.message)
    }

    return next(passable)
  }

  #getBody (message) {
    if (!typeIs.hasBody(message)) {
      return {}
    }

    const limit = bytes.parse(this._limit)
    const type = getType(message, this._defaultType)
    const encoding = getCharset(message, this._defaultCharset)

    if (!typeIs.is(type, ['urlencoded', 'json', 'text', 'bin'])) {
      return {}
    }

    if (Buffer.byteLength(message.body, encoding) > limit) {
      throw new HttpError(
        400,
        'Invalid body.',
        `Body length exceed the limit ${limit}.`
      )
    }

    return message.body
  }
}
