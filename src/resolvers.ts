import mime from 'mime/lite'
import accepts from 'accepts'
import { Container } from '@stone-js/service-container'
import { AwsLambdaAdapterError } from './errors/AwsLambdaAdapterError'
import { RawHttpResponseOptions, AwsLambdaHttpAdapterContext, RawHttpResponse } from './declarations'
import { HTTP_INTERNAL_SERVER_ERROR, IncomingHttpEvent, OutgoingHttpResponse } from '@stone-js/http-core'
import {
  AdapterHooks,
  AdapterResolver,
  defaultLoggerResolver,
  ErrorHandler,
  ErrorHandlerResolver,
  EventEmitter,
  IBlueprint,
  Kernel,
  KernelResolver,
  LoggerResolver
} from '@stone-js/core'
import { AWSLambdaHttpAdapter } from './AWSLambdaHttpAdapter'


const awsLambdaHttpErrorHandlerRenderResponseResolver = (error: AwsLambdaAdapterError): RawHttpResponse => {
  const context = error.metadata as AwsLambdaHttpAdapterContext
  const rawResponse = context?.rawResponse

  if (context?.rawEvent === undefined || rawResponse === undefined) {
    return {
      statusCode: HTTP_INTERNAL_SERVER_ERROR,
      statusMessage: 'Internal Server Error',
      body: 'Internal Server Error'
    }
  }

  const httpError = error.cause as RawHttpResponseOptions | undefined

  if (httpError?.statusCode !== undefined) {
    rawResponse.statusCode = httpError.statusCode
    rawResponse.statusMessage = httpError.statusMessage
  } else {
    rawResponse.statusCode = HTTP_INTERNAL_SERVER_ERROR
    rawResponse.statusMessage = 'Internal Server Error'
  }

  if (httpError?.headers !== undefined) {
    rawResponse.headers = httpError.headers
  } else {
    const type = accepts(context.rawEvent as any).type(['json', 'html']) as string | false
    const contentType = mime.getType(type !== false ? type : 'txt') ?? 'text/plain'
    rawResponse.headers = {'Content-Type': contentType }
  }

  if (httpError?.body !== undefined) {
    rawResponse.body = typeof httpError.body === 'string' ? httpError.body : JSON.stringify(httpError.body)
  }

  return rawResponse
}

const loggerResolver = (blueprint: IBlueprint): LoggerResolver => {
  return blueprint.get('stone.logger.resolver', defaultLoggerResolver)
}

export const awsLambdaHttpErrorHandlerResolver: ErrorHandlerResolver<RawHttpResponse> = (
  blueprint: IBlueprint
): ErrorHandler<RawHttpResponse> => {
  return ErrorHandler.create<RawHttpResponse>({
    blueprint,
    logger: loggerResolver(blueprint)(blueprint),
    renderResponseResolver: awsLambdaHttpErrorHandlerRenderResponseResolver
  })
}

export const awsLambdaHttpKernelResolver: KernelResolver<IncomingHttpEvent, OutgoingHttpResponse> = (
  blueprint: IBlueprint
): Kernel<IncomingHttpEvent, OutgoingHttpResponse> => {
  return Kernel.create({
    blueprint,
    container: Container.create(),
    eventEmitter: new EventEmitter(),
    logger: loggerResolver(blueprint)(blueprint)
  })
}

export const awsLambdaHttpAdapterResolver: AdapterResolver = (blueprint: IBlueprint) => {
  const hooks = blueprint.get<AdapterHooks>('stone.adapter.hooks', {})

  return AWSLambdaHttpAdapter.create({
    hooks,
    blueprint,
    handlerResolver: awsLambdaHttpKernelResolver,
    logger: loggerResolver(blueprint)(blueprint),
    errorHandler: awsLambdaHttpErrorHandlerResolver(blueprint)
  })
}
