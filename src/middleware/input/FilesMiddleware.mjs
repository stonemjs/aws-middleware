import { isMultipart, getFilesFromMessage } from '@stone-js/event-foundation/utils'

/**
 * Class representing a FilesMiddleware.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class FilesMiddleware {
  /**
   * Create a FilesMiddleware.
   *
   * @param {Container} container
   * @param {Config} container.config
   */
  constructor ({ config }) {
    this._options = config.get('app.adapter.files.upload', {})
  }

  /**
   * Handle platform-specific message and transform it to Stone.js IncomingEvent or HTTPEvent.
   *
   * @param   {Passable} passable - Input data to transform via middleware.
   * @param   {Function} next - Pass to next middleware.
   * @returns {Passable}
   */
  async handle (passable, next) {
    const message = this.#normalizeEvent(passable.message)

    if (isMultipart(message)) {
      const response = await getFilesFromMessage(message, this._options)
      passable.event.files = response.files
      passable.event.body = response.fields
    }

    return next(passable)
  }

  #normalizeEvent (message) {
    return {
      body: message.body,
      encoding: message.encoding || (message.isBase64Encoded ? 'base64' : 'binary'),
      headers: {
        'content-type': message.headers['content-type'] ?? message.headers['Content-Type'],
        'content-length': message.headers['content-length'] ?? message.headers['Content-Length'],
        'transfer-encoding': message.headers['transfer-encoding'] ?? message.headers['Transfer-Encoding']
      }
    }
  }
}
