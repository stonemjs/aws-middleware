import mime from 'mime/lite'
import accepts from 'accepts'
import { AWSLambdaAdapter } from './AWSLambdaAdapter'
import { AWSLambdaHttpAdapter } from './AWSLambdaHttpAdapter'
import { HTTP_INTERNAL_SERVER_ERROR } from '@stone-js/http-core'
import { AwsLambdaAdapterError } from './errors/AwsLambdaAdapterError'
import { RawHttpResponseOptions, AwsLambdaHttpAdapterContext, RawHttpResponse, RawResponse } from './declarations'
import {
  AdapterHooks,
  AdapterResolver,
  defaultKernelResolver,
  defaultLoggerResolver,
  ErrorHandler,
  ErrorHandlerResolver,
  IBlueprint,
  LoggerResolver
} from '@stone-js/core'

/**
 * Resolves and renders an HTTP response for errors in the AWS Lambda HTTP adapter.
 *
 * This function handles errors by inspecting the error context and generating a
 * valid `RawHttpResponse`. It applies default values when necessary and adapts
 * the response headers and body to the client's expected content type.
 *
 * @param error - The error thrown by the AWS Lambda HTTP adapter.
 * @returns A `RawHttpResponse` representing the error.
 */
const awsLambdaHttpErrorHandlerRenderResponseResolver = (error: AwsLambdaAdapterError): RawHttpResponse => {
  const context = error.metadata as AwsLambdaHttpAdapterContext
  const rawResponse = context?.rawResponse

  if (context?.rawEvent === undefined || rawResponse === undefined) {
    throw new AwsLambdaAdapterError('Invalid error context provided for rendering response.')
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
    rawResponse.headers = { 'Content-Type': contentType }
  }

  if (httpError?.body !== undefined) {
    rawResponse.body = typeof httpError.body === 'string' ? httpError.body : JSON.stringify(httpError.body)
  }

  return rawResponse
}

/**
 * Resolves a logger for a blueprint.
 *
 * @param blueprint - The `IBlueprint` to retrieve the logger resolver from.
 * @returns A `LoggerResolver` for the given blueprint.
 */
const loggerResolver = (blueprint: IBlueprint): LoggerResolver => {
  return blueprint.get('stone.logger.resolver', defaultLoggerResolver)
}

/**
 * Error handler resolver for generic AWS Lambda adapter.
 *
 * Creates and configures an `ErrorHandler` for managing errors in the generic AWS Lambda adapter.
 *
 * @param blueprint - The `IBlueprint` providing configuration and dependencies.
 * @returns An `ErrorHandler` instance for handling AWS Lambda errors.
 */
export const awsLambdaErrorHandlerResolver: ErrorHandlerResolver<RawResponse> = (
  blueprint: IBlueprint
): ErrorHandler<RawResponse> => {
  return ErrorHandler.create<RawResponse>({
    blueprint,
    logger: loggerResolver(blueprint)(blueprint),
    renderResponseResolver: (error: AwsLambdaAdapterError): RawResponse => ({ message: error.message })
  })
}

/**
 * Error handler resolver for AWS Lambda HTTP adapter.
 *
 * Creates and configures an `ErrorHandler` for managing errors in the AWS Lambda HTTP adapter.
 *
 * @param blueprint - The `IBlueprint` providing configuration and dependencies.
 * @returns An `ErrorHandler` instance for handling AWS Lambda HTTP errors.
 */
export const awsLambdaHttpErrorHandlerResolver: ErrorHandlerResolver<RawHttpResponse> = (
  blueprint: IBlueprint
): ErrorHandler<RawHttpResponse> => {
  return ErrorHandler.create<RawHttpResponse>({
    blueprint,
    logger: loggerResolver(blueprint)(blueprint),
    renderResponseResolver: awsLambdaHttpErrorHandlerRenderResponseResolver
  })
}

/**
 * Adapter resolver for generic AWS Lambda adapter.
 *
 * Creates and configures an `AWSLambdaAdapter` for handling generic events in AWS Lambda.
 *
 * @param blueprint - The `IBlueprint` providing configuration and dependencies.
 * @returns An `AWSLambdaAdapter` instance.
 */
export const awsLambdaAdapterResolver: AdapterResolver = (blueprint: IBlueprint) => {
  const hooks = blueprint.get<AdapterHooks>('stone.adapter.hooks', {})
  const handlerResolver = blueprint.get('stone.kernel.resolver', defaultKernelResolver)
  const errorHandlerResolver = blueprint.get('stone.adapter.errorHandler.resolver', awsLambdaErrorHandlerResolver)

  return AWSLambdaAdapter.create({
    hooks,
    blueprint,
    handlerResolver,
    logger: loggerResolver(blueprint)(blueprint),
    errorHandler: errorHandlerResolver(blueprint)
  })
}

/**
 * Adapter resolver for AWS Lambda HTTP adapter.
 *
 * Creates and configures an `AWSLambdaHttpAdapter` for handling HTTP events in AWS Lambda.
 *
 * @param blueprint - The `IBlueprint` providing configuration and dependencies.
 * @returns An `AWSLambdaHttpAdapter` instance.
 */
export const awsLambdaHttpAdapterResolver: AdapterResolver = (blueprint: IBlueprint) => {
  const hooks = blueprint.get<AdapterHooks>('stone.adapter.hooks', {})
  const handlerResolver = blueprint.get('stone.kernel.resolver', defaultKernelResolver)
  const errorHandlerResolver = blueprint.get('stone.adapter.errorHandler.resolver', awsLambdaHttpErrorHandlerResolver)

  return AWSLambdaHttpAdapter.create({
    hooks,
    blueprint,
    handlerResolver,
    logger: loggerResolver(blueprint)(blueprint),
    errorHandler: errorHandlerResolver(blueprint)
  })
}
