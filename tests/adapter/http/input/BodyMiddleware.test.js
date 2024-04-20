import bytes from 'bytes'
import { Buffer } from 'safe-buffer'
import { config } from '../../../config.mock'
import { BodyMiddleware } from '../../../../src/adapter/http/input/BodyMiddleware.mjs'

describe('BodyMiddleware', () => {
  beforeEach(() => {
    Buffer.byteLength = jest.fn(() => bytes.parse('10kb'))
  })

  afterEach(() => {
    Buffer.byteLength.mockRestore()
  })

  describe('#handle', () => {
    config.set({ 'app.adapter.body': { limit: '100kb', defaultType: 'text/plain', defaultCharset: 'utf-8' } })

    it('Must return body in different format', async () => {
      // Arrange
      const middleware = new BodyMiddleware({ config })
      const req = { headers: { 'content-type': 'application/json', 'content-length': 0 }, body: { name: 'Stone' } }
      const req2 = { headers: { 'content-type': 'text/plain; charset=utf-8', 'content-length': 0 }, body: 'Stone' }
      const req3 = { headers: { 'content-type': 'application/octet-stream', 'content-length': 0 }, body: 'rawbody' }
      const req4 = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'content-length': 0 }, body: { name: 'Stone' } }
      const req5 = { headers: { 'content-type': 'application/json' }, body: { name: 'Stone' } }
      const req6 = { headers: { 'content-type': 'text/html; charset=utf-8', 'content-length': 0 }, body: 'Stone' }
      const req7 = { headers: { 'content-type': 'multipart/form-data; boundary=--99', 'content-length': 0 }, body: 'rawbody' }

      // Act
      const output = await middleware.handle({ event: {}, message: req }, (stack) => stack)
      const response2 = await middleware.handle({ event: {}, message: req2 }, (stack) => stack)
      const response3 = await middleware.handle({ event: {}, message: req3 }, (stack) => stack)
      const response4 = await middleware.handle({ event: {}, message: req4 }, (stack) => stack)
      const response5 = await middleware.handle({ event: {}, message: req5 }, (stack) => stack)
      const response6 = await middleware.handle({ event: {}, message: req6 }, (stack) => stack)
      const response7 = await middleware.handle({ event: {}, message: req7 }, (stack) => stack)

      // Assert
      expect(response2.event.body).toBe('Stone')
      expect(output.event.body).toEqual({ name: 'Stone' })
      expect(response3.event.body).toBe('rawbody')
      expect(response4.event.body).toEqual({ name: 'Stone' })
      expect(response5.event.body).toEqual({})
      expect(response6.event.body).toEqual({})
      expect(response7.event.body).toBeUndefined()
    })

    it('Must throw an error when body is invalid', async () => {
      // Arrange
      Buffer.byteLength = jest.fn(() => bytes.parse('200kb'))
      const middleware = new BodyMiddleware({ config })
      const message = { headers: { 'content-type': 'application/json', 'content-length': 0 } }

      try {
        // Act
        const output = await middleware.handle({ event: {}, message }, (stack) => stack)
        expect(output).toBe(true)
      } catch (error) {
        expect(error.body).toBe('Invalid body.')
        expect(error.message).toBe('Body length exceed the limit 102400.')
      }
    })
  })
})
