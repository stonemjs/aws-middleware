import { config } from '../../../config.mock'
import { CommonMiddleware } from '../../../../src/adapter/http/input/CommonMiddleware.mjs'

describe('CommonMiddleware', () => {
  describe('#handle', () => {
    const passable = {
      event: {},
      ctx: {
        name: 'lambda'
      },
      message: {
        httpMethod: 'POST',
        encrypted: true,
        url: '/user?name=jonh',
        requestContext: {
          identity: { sourceIp: '127.0.0.1' }
        },
        queryStringParameters: { name: 'Stone' },
        headers: {
          host: 'www.example.com',
          cookie: 'name=Stone; version=1.0.0',
          'x-forwarded-host': 'www.dev.example.com',
          'x-forwarded-proto': 'https'
        }
      }
    }
    const passable2 = {
      ...structuredClone(passable),
      message: {
        ...structuredClone(passable.message),
        httpMethod: null,
        requestContext: {
          http: { method: 'POST', sourceIp: '127.0.0.1' }
        }
      }
    }
    const passable3 = {
      ...structuredClone(passable),
      message: {
        ...structuredClone(passable.message),
        httpMethod: null,
        requestContext: {
          httpMethod: 'POST',
          http: { sourceIp: '127.0.0.1' }
        }
      }
    }
    const passable4 = {
      ...structuredClone(passable),
      message: {
        ...structuredClone(passable.message),
        httpMethod: null
      }
    }

    it('Must return common event items', () => {
      // Arrange
      const middleware = new CommonMiddleware({ config })

      // Act
      const output = middleware.handle(passable, (stack) => stack)
      const response2 = middleware.handle(passable2, (stack) => stack)
      const response3 = middleware.handle(passable3, (stack) => stack)
      const response4 = middleware.handle(passable4, (stack) => stack)

      // Assert
      expect(output.event.method).toBe('POST')
      expect(response2.event.method).toBe('POST')
      expect(response3.event.method).toBe('POST')
      expect(response4.event.method).toBe('GET')
      expect(output.event.protocol).toBe('https')
      expect(response2.event.protocol).toBe('https')
      expect(output.event.metadata.lambda.message.httpMethod).toBe('POST')
      expect(output.event.metadata.lambda.context.name).toBe('lambda')
      expect(output.event.headers['x-forwarded-host']).toBe('www.dev.example.com')
      expect(output.event.cookies.all()).toEqual({ name: 'Stone', version: '1.0.0' })
    })
  })
})
