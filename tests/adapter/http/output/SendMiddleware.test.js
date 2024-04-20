import statuses from 'statuses'
import { SendMiddleware } from '../../../../src/adapter/http/output/SendMiddleware.mjs'

describe('SendMiddleware', () => {
  describe('#handle', () => {
    it('Must add send method when http verb is `head`', () => {
      // Arrange
      const passable = {
        response: {},
        event: {
          isMethod: jest.fn(() => true)
        },
        result: {
          statusCode: 200,
          statusMessage: 'ok',
          headers: { 'Content-Type': 'application/json' }
        }
      }
      const passable2 = {
        response: {},
        event: {
          isMethod: jest.fn(() => true)
        },
        result: {
          headers: { 'Content-Type': 'application/json' }
        }
      }
      const middleware = new SendMiddleware()

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const output2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.response.send()).toEqual(passable.result)
      expect(passable.event.isMethod).toHaveBeenCalledWith('HEAD')
      expect(output2.event.isMethod).toHaveBeenCalledWith('HEAD')
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
        result: {
          statusCode: 200,
          content: 'Hello',
          statusMessage: 'ok',
          headers: { 'Content-Type': 'text/plain' }
        }
      }
      const passable2 = {
        response: {},
        event: {
          isMethod: jest.fn(() => false)
        },
        result: {
          content: 'Hello',
          headers: { 'Content-Type': 'text/plain' }
        }
      }
      const middleware = new SendMiddleware()

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
      const middleware = new SendMiddleware()

      // Act
      const output = middleware.handle(passable, (stack) => stack)

      // Assert
      expect(output.response.send()).toBe('ok')
    })
  })
})
