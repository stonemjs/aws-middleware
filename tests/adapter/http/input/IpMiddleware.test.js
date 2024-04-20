import { config } from '../../../config.mock'
import { IpMiddleware } from '../../../../src/adapter/http/input/IpMiddleware.mjs'

describe('IpMiddleware', () => {
  describe('#handle', () => {
    const passable = {
      event: {},
      message: {
        requestContext: {
          identity: { sourceIp: '127.0.0.1' }
        },
        headers: {
          'x-forwarded-for': '223.19.23.0, 125.19.23.0, 125.19.23.55, 125.19.23.60'
        }
      }
    }
    const passable2 = {
      event: {},
      message: {
        requestContext: {
          http: { sourceIp: '127.0.0.1' }
        },
        headers: {
          'X-Forwarded-For': '223.19.23.0, 125.19.23.0, 125.19.23.55, 125.19.23.60'
        }
      }
    }

    it('Must return user proxied ips when they are trusted', () => {
      // Arrange
      config.set({ 'app.adapter.proxy': { trusted: ['127.0.0.1', '125.19.23.0/24'], untrusted: [] } })
      const middleware = new IpMiddleware({ config })

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const response2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.event.ip).toBe('223.19.23.0')
      expect(response2.event.ip).toBe('223.19.23.0')
      expect(output.event.ips).toEqual(['223.19.23.0', '125.19.23.0', '125.19.23.55', '125.19.23.60'])
      expect(response2.event.ips).toEqual(['223.19.23.0', '125.19.23.0', '125.19.23.55', '125.19.23.60'])
    })

    it('Must return remoteAddress ip when untrusted', () => {
      // Arrange
      config.set({ 'app.adapter.proxy': { trusted: ['125.19.23.0/24'], untrusted: [] } })
      const middleware = new IpMiddleware({ config })

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const response2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.event.ips).toEqual([])
      expect(response2.event.ips).toEqual([])
      expect(output.event.ip).toBe('127.0.0.1')
      expect(response2.event.ip).toBe('127.0.0.1')
    })

    it('Must return remoteAddress ip when no options provided', () => {
      // Arrange
      config.set({ 'app.adapter.proxy': { trusted: [], untrusted: [] } })
      const middleware = new IpMiddleware({ config })

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const response2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.event.ips).toEqual([])
      expect(response2.event.ips).toEqual([])
      expect(output.event.ip).toBe('127.0.0.1')
      expect(response2.event.ip).toBe('127.0.0.1')
    })
  })
})
