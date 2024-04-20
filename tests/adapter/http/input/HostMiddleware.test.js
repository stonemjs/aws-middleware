import { config } from '../../../config.mock'
import { HostMiddleware } from '../../../../src/adapter/http/input/HostMiddleware.mjs'

describe('HostMiddleware', () => {
  describe('#handle', () => {
    const passable = {
      event: {},
      message: {
        path: '/user?name=jonh',
        requestContext: {
          identity: { sourceIp: '127.0.0.1' }
        },
        headers: {
          host: 'www.example.com',
          'x-forwarded-host': 'www.dev.example.com',
          'x-forwarded-proto': 'https'
        }
      }
    }
    const passable2 = {
      event: {},
      message: {
        rawPath: '/user?name=jonh',
        requestContext: {
          http: { sourceIp: '127.0.0.1' }
        },
        headers: {
          host: 'www.example.com',
          'X-Forwarded-Host': 'www.dev.example.com',
          'X-Forwarded-Proto': 'https'
        }
      }
    }

    it('Must return user url from proxy header when proxy is trusted', () => {
      // Arrange
      config.set({ 'app.adapter.domain': { trusted: [] }, 'app.adapter.proxy': { trusted: ['127.0.0.1', '125.19.23.0/24'], untrusted: [] } })
      const middleware = new HostMiddleware({ config })

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const response2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.event.url.hostname).toBe('www.dev.example.com')
      expect(response2.event.url.hostname).toBe('www.dev.example.com')
      expect(output.event.url.searchParams.get('name')).toBe('jonh')
      expect(response2.event.url.searchParams.get('name')).toBe('jonh')
    })

    it('Must return user url from host header when proxy is not trusted', () => {
      // Arrange
      config.set({ 'app.adapter.domain': { trusted: [] }, 'app.adapter.proxy': { trusted: ['125.19.23.0/24'], untrusted: [] } })
      const middleware = new HostMiddleware({ config })

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const response2 = middleware.handle(passable2, (stack) => stack)

      // Assert
      expect(output.event.url.hostname).toBe('www.example.com')
      expect(response2.event.url.hostname).toBe('www.example.com')
      expect(output.event.url.searchParams.get('name')).toBe('jonh')
      expect(response2.event.url.searchParams.get('name')).toBe('jonh')
    })
  })
})
