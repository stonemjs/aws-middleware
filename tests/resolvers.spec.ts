import mime from 'mime/lite'
import accepts from 'accepts'
import { Mock } from 'vitest'
import { Config } from '@stone-js/config'
import { ErrorHandler } from '@stone-js/core'
import { AWSLambdaAdapter } from '../src/AWSLambdaAdapter'
import { AWSLambdaHttpAdapter } from '../src/AWSLambdaHttpAdapter'
import { AwsLambdaAdapterError } from '../src/errors/AwsLambdaAdapterError'
import { awsLambdaAdapterResolver, awsLambdaErrorHandlerResolver, awsLambdaHttpAdapterResolver, awsLambdaHttpErrorHandlerResolver } from '../src/resolvers'

const mockBlueprint = Config.create()

// Mock dependencies
vi.mock('mime/lite')

vi.mock('accepts', () => {
  return {
    default: vi.fn(() => ({
      type: vi.fn(() => 'txt')
    }))
  }
})

describe('AwsLambdaAdapter Resolvers', () => {
  describe('awsLambdaErrorHandlerResolver', () => {
    it('should create an ErrorHandler and populate server response with `httpError` when there is a context', () => {
      const rawResponse = {}
      const httpError = { statusCode: 404, statusMessage: 'Not Found', headers: { 'Content-Type': 'application/json' }, body: 'Not Found' } as unknown as Error
      const handler = awsLambdaErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new AwsLambdaAdapterError('simple error', { cause: httpError, metadata: { rawResponse, rawEvent: {} } }))).toEqual({ message: 'simple error' })
    })
  })
  describe('awsLambdaHttpErrorHandlerResolver', () => {
    it('should create an ErrorHandler and return `HTTP_INTERNAL_SERVER_ERROR` when there is no context', () => {
      const handler = awsLambdaHttpErrorHandlerResolver(mockBlueprint)
      expect(handler).toBeInstanceOf(ErrorHandler)
      expect(handler.report).toBeInstanceOf(Function)
      expect(() => handler.render(new AwsLambdaAdapterError('simple error'))).toThrow(AwsLambdaAdapterError)
    })

    it('should create an ErrorHandler and populate server response with `httpError` when there is a context', () => {
      const rawResponse = { statusCode: 0, statusMessage: '', headers: {}, body: '' }
      const httpError = { statusCode: 404, statusMessage: 'Not Found', headers: { 'Content-Type': 'application/json' }, body: 'Not Found' } as unknown as Error
      const handler = awsLambdaHttpErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new AwsLambdaAdapterError('simple error', { cause: httpError, metadata: { rawResponse, rawEvent: {} } }))).toBe(rawResponse)
      expect(rawResponse.statusCode).toBe(404)
      expect(rawResponse.statusMessage).toBe('Not Found')
      expect(rawResponse.headers).toEqual({ 'Content-Type': 'application/json' })
    })

    it('should create an ErrorHandler and populate server response with `httpError` and json body when there is a context', () => {
      const rawResponse = { statusCode: 0, statusMessage: '', headers: {}, body: '' }
      const httpError = { statusCode: 404, statusMessage: 'Not Found', headers: { 'Content-Type': 'application/json' }, body: { foo: 'bar' } } as unknown as Error
      const handler = awsLambdaHttpErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new AwsLambdaAdapterError('simple error', { cause: httpError, metadata: { rawResponse, rawEvent: {} } }))).toBe(rawResponse)
      expect(rawResponse.statusCode).toBe(404)
      expect(rawResponse.statusMessage).toBe('Not Found')
      expect(rawResponse.headers).toEqual({ 'Content-Type': 'application/json' })
    })

    it('should create an ErrorHandler and populate server response with `httpError` with empty body when there is a context', () => {
      const rawResponse = { statusCode: 0, statusMessage: '', headers: {}, body: '' }
      const httpError = { statusCode: 404, statusMessage: 'Not Found', headers: { 'Content-Type': 'application/json' } } as unknown as Error
      const handler = awsLambdaHttpErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new AwsLambdaAdapterError('simple error', { cause: httpError, metadata: { rawResponse, rawEvent: {} } }))).toEqual(rawResponse)
      expect(rawResponse.statusCode).toBe(404)
      expect(rawResponse.statusMessage).toBe('Not Found')
      expect(rawResponse.headers).toEqual({ 'Content-Type': 'application/json' })
    })

    it('should create an ErrorHandler and populate server response with default and `rawEvent` values when there is a context', () => {
      (mime.getType as Mock).mockReturnValueOnce('application/json')
      const rawResponse = { statusCode: 0, statusMessage: '', headers: {}, body: '' }
      const handler = awsLambdaHttpErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new AwsLambdaAdapterError('simple error', { metadata: { rawResponse, rawEvent: {} } }))).toBe(rawResponse)
      expect(rawResponse.statusCode).toBe(500)
      expect(rawResponse.statusMessage).toBe('Internal Server Error')
      expect(rawResponse.headers).toEqual({ 'Content-Type': 'application/json' })
    })

    it('should create an ErrorHandler and populate server response with default and `rawEvent` values when there is a context on invalid mimetype', () => {
      (accepts as Mock).mockReturnValueOnce({ type: vi.fn(() => false) });
      (mime.getType as Mock).mockReturnValueOnce(undefined)
      const rawResponse = { statusCode: 0, statusMessage: '', headers: {}, body: '' }
      const handler = awsLambdaHttpErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new AwsLambdaAdapterError('simple error', { metadata: { rawResponse, rawEvent: {} } }))).toBe(rawResponse)
      expect(rawResponse.statusCode).toBe(500)
      expect(rawResponse.statusMessage).toBe('Internal Server Error')
      expect(rawResponse.headers).toEqual({ 'Content-Type': 'text/plain' })
    })
  })

  describe('awsLambdaAdapterResolver', () => {
    it('should create a Kernel instance with the correct configuration', () => {
      const adapter = awsLambdaAdapterResolver(mockBlueprint)
      expect(adapter).toBeInstanceOf(AWSLambdaAdapter)
    })
  })

  describe('awsLambdaHttpAdapterResolver', () => {
    it('should create a Kernel instance with the correct configuration', () => {
      const adapter = awsLambdaHttpAdapterResolver(mockBlueprint)
      expect(adapter).toBeInstanceOf(AWSLambdaHttpAdapter)
    })
  })
})
