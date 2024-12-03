import { Mock } from 'vitest'
import { ConfigContext, IBlueprint } from '@stone-js/core'
import { AWS_LAMBDA_PLATFORM, AWS_LAMBDA_HTTP_PLATFORM } from '../../src/constants'
import { awsLambdaErrorHandlerResolver, awsLambdaHttpErrorHandlerResolver } from '../../src/resolvers'
import { SetAwsLambdaAdapterConfigMiddleware, SetAwsLambdaHttpAdapterConfigMiddleware } from '../../src/middleware/configurationMiddleware'

describe('AWS Lambda Adapter Config Middlewares', () => {
  let mockNext: Mock
  let mockBlueprint: Partial<IBlueprint>

  beforeEach(() => {
    mockBlueprint = {
      get: vi.fn(),
      set: vi.fn()
    }
    mockNext = vi.fn((context) => context.blueprint)
  })

  describe('SetAwsLambdaAdapterConfigMiddleware', () => {
    it('should set awsLambdaErrorHandlerResolver when platform is AWS_LAMBDA_PLATFORM', async () => {
      mockBlueprint.get = vi.fn().mockReturnValue(AWS_LAMBDA_PLATFORM)

      const context: ConfigContext = {
        modules: [],
        blueprint: mockBlueprint as IBlueprint
      }

      const result = await SetAwsLambdaAdapterConfigMiddleware(context, mockNext)

      expect(result).toEqual(mockBlueprint)
      expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.platform')
      expect(mockNext).toHaveBeenCalledWith({ modules: context.modules, blueprint: mockBlueprint })
      expect(mockBlueprint.set).toHaveBeenCalledWith('stone.errorHandler.resolver', awsLambdaErrorHandlerResolver)
    })

    it('should not set anything when platform is not AWS_LAMBDA_PLATFORM', async () => {
      mockBlueprint.get = vi.fn().mockReturnValue('OTHER_PLATFORM')

      const context: ConfigContext = {
        modules: [],
        blueprint: mockBlueprint as IBlueprint
      }

      const result = await SetAwsLambdaAdapterConfigMiddleware(context, mockNext)

      expect(result).toEqual(mockBlueprint)
      expect(mockBlueprint.set).not.toHaveBeenCalled()
      expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.platform')
      expect(mockNext).toHaveBeenCalledWith({ modules: context.modules, blueprint: mockBlueprint })
    })
  })

  describe('SetAwsLambdaHttpAdapterConfigMiddleware', () => {
    it('should set awsLambdaHttpErrorHandlerResolver when platform is AWS_LAMBDA_HTTP_PLATFORM', async () => {
      mockBlueprint.get = vi.fn().mockReturnValue(AWS_LAMBDA_HTTP_PLATFORM)

      const context: ConfigContext = {
        modules: [],
        blueprint: mockBlueprint as IBlueprint
      }

      const result = await SetAwsLambdaHttpAdapterConfigMiddleware(context, mockNext)

      expect(result).toEqual(mockBlueprint)
      expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.platform')
      expect(mockNext).toHaveBeenCalledWith({ modules: context.modules, blueprint: mockBlueprint })
      expect(mockBlueprint.set).toHaveBeenCalledWith('stone.errorHandler.resolver', awsLambdaHttpErrorHandlerResolver)
    })

    it('should not set anything when platform is not AWS_LAMBDA_HTTP_PLATFORM', async () => {
      mockBlueprint.get = vi.fn().mockReturnValue('OTHER_PLATFORM')

      const context: ConfigContext = {
        modules: [],
        blueprint: mockBlueprint as IBlueprint
      }

      const result = await SetAwsLambdaHttpAdapterConfigMiddleware(context, mockNext)

      expect(result).toEqual(mockBlueprint)
      expect(mockBlueprint.set).not.toHaveBeenCalled()
      expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.platform')
      expect(mockNext).toHaveBeenCalledWith({ modules: context.modules, blueprint: mockBlueprint })
    })
  })
})
