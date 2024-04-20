import { config } from '../../../config.mock'
import { FilesMiddleware } from '../../../../src/adapter/http/input/FilesMiddleware.mjs'

jest.mock('@stone-js/middleware/utils', () => ({
  isMultipart: ({ headers }) => headers['content-type']?.includes('multipart/form-data'),
  getFilesFromMessage: () => ({ files: [{ filename: 'photo.png' }], fields: { name: 'Jonh' } })
}))

describe('FilesMiddleware', () => {
  describe('#handle', () => {
    const passable = {
      event: {},
      message: {
        body: 'lorem',
        encoding: 'base64',
        headers: {
          'content-length': 0,
          'content-type': 'multipart/form-data; boundary=---------------------------123456789012345678901234567890'
        }
      }
    }
    const passable2 = {
      event: {},
      message: {
        body: 'lorem',
        isBase64Encoded: true,
        headers: {
          'Content-Length': 0,
          'Content-Type': 'multipart/form-data; boundary=---------------------------123456789012345678901234567891'
        }
      }
    }
    const passable3 = {
      event: {},
      message: {
        body: 'lorem',
        isBase64Encoded: false,
        headers: {
          'Content-Length': 0,
          'Content-Type': 'multipart/form-data; boundary=---------------------------123456789012345678901234567892'
        }
      }
    }

    it('Must return uloaded files', async () => {
      // Arrange
      config.set({ 'app.adapter.files.upload': {} })
      const middleware = new FilesMiddleware({ config })

      // Act
      const output = await middleware.handle(passable, (stack) => stack)
      const response2 = await middleware.handle(passable2, (stack) => stack)
      const response3 = await middleware.handle(passable3, (stack) => stack)

      // Assert
      expect(output.event.body).toEqual({ name: 'Jonh' })
      expect(response2.event.body).toEqual({ name: 'Jonh' })
      expect(response3.event.body).toEqual({ name: 'Jonh' })
      expect(output.event.files).toEqual([{ filename: 'photo.png' }])
      expect(response2.event.files).toEqual([{ filename: 'photo.png' }])
      expect(response3.event.files).toEqual([{ filename: 'photo.png' }])
    })

    it('Must return empty when body is empty', async () => {
      // Arrange
      config.set({ 'app.adapter.files.upload': {} })
      const middleware = new FilesMiddleware({ config })

      // Act
      const output = await middleware.handle({ event: {}, message: { headers: {} } }, (stack) => stack)

      // Assert
      expect(output.event.body).toBeUndefined()
      expect(output.event.files).toBeUndefined()
    })
  })
})
