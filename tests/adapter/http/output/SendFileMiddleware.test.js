import statuses from 'statuses'
import { SendFileMiddleware } from '../../../../src/adapter/http/output/SendFileMiddleware.mjs'

const BinaryFileResponse = class {
  constructor (statusCode, statusMessage, headers, file) {
    this.file = file
    this.headers = headers
    this.statusCode = statusCode
    this.statusMessage = statusMessage
  }

  getFile () {
    return this.file
  }
}

jest.mock('@stone-js/http', () => ({
  BinaryFileResponse
}))
describe('SendFileMiddleware', () => {
  describe('#handle', () => {
    it('Must add send method when http verb is `head`', () => {
      // Arrange
      const passable = {
        response: {},
        event: {
          isMethod: jest.fn(() => true)
        },
        result: new BinaryFileResponse(200, 'ok', { 'Content-Type': 'application/json' })
      }
      const passable2 = {
        response: {},
        event: {
          isMethod: jest.fn(() => true)
        },
        result: new BinaryFileResponse(null, null, { 'Content-Type': 'application/json' })
      }
      const middleware = new SendFileMiddleware()

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const output2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.response.send()).toEqual(passable.result)
      expect(passable.event.isMethod).toHaveBeenCalledWith('HEAD')
      expect(passable2.event.isMethod).toHaveBeenCalledWith('HEAD')
      expect(output2.response.send()).toEqual({
        statusCode: 500,
        statusMessage: statuses.message[500],
        headers: { 'Content-Type': 'application/json' }
      })
    })

    it('Must add send method when http verb is not `head`', () => {
      // Arrange
      const passable = {
        response: {},
        event: {
          isMethod: jest.fn(() => false)
        },
        result: new BinaryFileResponse(200, 'ok', { 'Content-Type': 'text/plain' }, { getContent: () => 'Hello' })
      }
      const passable2 = {
        response: {},
        event: {
          isMethod: jest.fn(() => false)
        },
        result: new BinaryFileResponse(null, null, { 'Content-Type': 'text/plain' }, { getContent: () => 'Hello' })
      }
      const middleware = new SendFileMiddleware()

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const output2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(passable.event.isMethod).toHaveBeenCalledWith('HEAD')
      expect(output.response.send()).toEqual({
        body: 'Hello',
        statusCode: 200,
        statusMessage: 'ok',
        headers: { 'Content-Type': 'text/plain' }
      })
      expect(passable2.event.isMethod).toHaveBeenCalledWith('HEAD')
      expect(output2.response.send()).toEqual({
        body: 'Hello',
        statusCode: 500,
        statusMessage: statuses.message[500],
        headers: { 'Content-Type': 'text/plain' }
      })
    })

    it('Must not add send method when already defined', () => {
      // Arrange
      const passable = {
        response: {
          send: () => 'ok'
        }
      }
      const middleware = new SendFileMiddleware()

      // Act
      const output = middleware.handle(passable, (stack) => stack)

      // Assert
      expect(output.response.send()).toBe('ok')
    })
  })
})
