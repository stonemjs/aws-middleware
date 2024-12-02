import typeIs from 'type-is'
import { Mock } from 'vitest'
import rawBody from 'raw-body'
import bodyParser from 'co-body'
import { NodeHttpAdapterContext } from '../../src/declarations'
import { isMultipart, getCharset, getHttpError } from '@stone-js/http-core'
import { NodeHttpAdapterError } from '../../src/errors/NodeHttpAdapterError'
import { BodyEventMiddleware } from '../../src/middleware/BodyEventMiddleware'

vi.mock('type-is')
vi.mock('raw-body')
vi.mock('co-body')

vi.mock('@stone-js/http-core', () => ({
  isMultipart: vi.fn(),
  getCharset: vi.fn(),
  getHttpError: vi.fn()
}))

describe('BodyEventMiddleware', () => {
  let middleware: BodyEventMiddleware
  let mockBlueprint: any
  let mockContext: NodeHttpAdapterContext
  let next: Mock

  beforeEach(() => {
    mockBlueprint = {
      get: vi.fn(() => ({
        limit: '100kb',
        defaultType: 'json',
        defaultCharset: 'utf-8'
      }))
    }

    middleware = new BodyEventMiddleware({ blueprint: mockBlueprint })

    mockContext = {
      rawEvent: {
        headers: { 'content-type': 'application/json', 'content-length': '123' }
      },
      incomingEventBuilder: {
        add: vi.fn()
      }
    } as unknown as NodeHttpAdapterContext

    next = vi.fn()
  })

  it('should throw an error if context is missing required components', async () => {
    // @ts-expect-error
    mockContext.rawEvent = undefined

    await expect(middleware.handle(mockContext, next)).rejects.toThrow(NodeHttpAdapterError)

    // @ts-expect-error
    mockContext.rawEvent = {}
    // @ts-expect-error
    mockContext.incomingEventBuilder = null

    await expect(middleware.handle(mockContext, next)).rejects.toThrow(NodeHttpAdapterError)
  })

  it('should skip body parsing if the request is multipart', async () => {
    vi.mocked(isMultipart).mockReturnValue(true)

    await middleware.handle(mockContext, next)

    expect(isMultipart).toHaveBeenCalledWith(mockContext.rawEvent)
    expect(mockContext.incomingEventBuilder?.add).not.toHaveBeenCalledWith('body', expect.anything())
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should parse and add empty object body to the event builder when request has no body', async () => {
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(false)

    await middleware.handle(mockContext, next)

    expect(mockContext.incomingEventBuilder?.add).toHaveBeenCalledWith('body', {})
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should parse and add empty object body to the event builder on invalid type', async () => {
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(true)
    vi.mocked(typeIs).mockReturnValue('html')

    await middleware.handle(mockContext, next)

    expect(mockContext.incomingEventBuilder?.add).toHaveBeenCalledWith('body', {})
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should parse and add JSON body to the event builder', async () => {
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(true)
    vi.mocked(getCharset).mockReturnValue('utf-8')
    vi.mocked(typeIs).mockReturnValue(null)
    vi.mocked(bodyParser.json).mockResolvedValue({ key: 'value' })

    await middleware.handle(mockContext, next)

    expect(mockBlueprint.get).toHaveBeenCalledWith('stone.http.body', expect.any(Object))
    expect(bodyParser.json).toHaveBeenCalledWith(mockContext.rawEvent, { limit: 102400, encoding: 'utf-8' })
    expect(mockContext.incomingEventBuilder?.add).toHaveBeenCalledWith('body', { key: 'value' })
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should parse and add text body to the event builder', async () => {
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(true)
    vi.mocked(getCharset).mockReturnValue('utf-8')
    vi.mocked(typeIs).mockReturnValue('text')
    vi.mocked(bodyParser.text).mockResolvedValue('Hello, world!')

    await middleware.handle(mockContext, next)

    expect(bodyParser.text).toHaveBeenCalledWith(mockContext.rawEvent, { limit: 102400, encoding: 'utf-8' })
    expect(mockContext.incomingEventBuilder?.add).toHaveBeenCalledWith('body', 'Hello, world!')
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should parse and add URL-encoded form body to the event builder', async () => {
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(true)
    vi.mocked(getCharset).mockReturnValue('utf-8')
    vi.mocked(typeIs).mockReturnValue('urlencoded')
    vi.mocked(bodyParser.form).mockResolvedValue({ name: 'test' })

    await middleware.handle(mockContext, next)

    expect(bodyParser.form).toHaveBeenCalledWith(mockContext.rawEvent, { limit: 102400, encoding: 'utf-8' })
    expect(mockContext.incomingEventBuilder?.add).toHaveBeenCalledWith('body', { name: 'test' })
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should parse binary body', async () => {
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(true)
    vi.mocked(getCharset).mockReturnValue('utf-8')
    vi.mocked(typeIs).mockReturnValue('bin')
    vi.mocked(rawBody).mockResolvedValue(Buffer.from('binary data'))

    await middleware.handle(mockContext, next)

    expect(rawBody).toHaveBeenCalledWith(mockContext.rawEvent, { length: '123', limit: 102400 })
    expect(mockContext.incomingEventBuilder?.add).toHaveBeenCalledWith('body', Buffer.from('binary data'))
    expect(next).toHaveBeenCalledWith(mockContext)
  })

  it('should handle body parsing errors and throw NodeHttpAdapterError', async () => {
    const mockError = new Error('Invalid JSON')
    vi.mocked(isMultipart).mockReturnValue(false)
    vi.mocked(typeIs.hasBody).mockReturnValue(true)
    vi.mocked(getCharset).mockReturnValue('utf-8')
    vi.mocked(typeIs).mockReturnValue('json')
    vi.mocked(bodyParser.json).mockRejectedValue(mockError)
    vi.mocked(getHttpError).mockReturnValue({ message: 'Invalid body', statusCode: 400 } as any)

    await expect(middleware.handle(mockContext, next)).rejects.toThrow(NodeHttpAdapterError)

    // @ts-expect-error
    expect(getHttpError).toHaveBeenCalledWith(400, 'Invalid body.', mockError.message, mockError.code, mockError)
  })
})
