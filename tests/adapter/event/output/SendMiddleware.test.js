import { SendMiddleware } from '../../../../src/adapter/event/output/SendMiddleware.mjs'

describe('SendMiddleware', () => {
  describe('#handle', () => {
    it('Must add send method when not defined', () => {
      // Arrange
      const passable = {
        response: {},
        result: {
          charset: 'utf8',
          content: 'ok'
        }
      }
      const middleware = new SendMiddleware()

      // Act
      const output = middleware.handle(passable, (stack) => stack)

      // Assert
      expect(output.response.send()).toEqual({ charset: 'utf8', content: 'ok' })
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
