import { IncomingHttpEvent, IncomingHttpEventOptions, OutgoingHttpResponse } from '@stone-js/http-core'
import { AdapterContext, IncomingEvent, IncomingEventOptions, OutgoingResponse, RawResponseOptions } from '@stone-js/core'

export type RawResponse = Record<string, unknown>
export type RawHttpResponse = RawHttpResponseOptions
export type AwsLambdaEvent = Record<string, unknown>
export type AwsLambdaContext = Record<string, unknown>
export type AwsLambdaEventHandlerFunction<RawResponseType = RawResponse> = (rawEvent: AwsLambdaEvent, context: AwsLambdaContext) => Promise<RawResponseType>

export interface AwsLambdaHttpEvent extends Record<string, unknown> {
  path?: string
  body?: unknown
  encoding?: string
  rawPath?: string
  isBase64Encoded?: boolean
  headers: Record<string, string>
  httpMethod?: string
  queryStringParameters?: Record<string, string>
  requestContext?: {
    identity?: {
      sourceIp?: string
    }
    httpMethod?: string
    http?: {
      method?: string
      sourceIp?: string
    }
  }
}

export interface AwsLambdaHttpAdapterContext extends AdapterContext<
AwsLambdaHttpEvent,
RawHttpResponse,
AwsLambdaContext,
IncomingHttpEvent,
IncomingHttpEventOptions,
OutgoingHttpResponse
> {
  /**
   * The raw HTTP response object associated with the current request.
   */
  rawResponse: RawHttpResponse
}

export interface AwsLambdaAdapterContext extends AdapterContext<
AwsLambdaEvent,
RawResponse,
AwsLambdaContext,
IncomingEvent,
IncomingEventOptions,
OutgoingResponse
> {
  /**
   * The raw HTTP response object associated with the current request.
   */
  rawResponse: RawResponse
}

/**
 * Represents options for configuring a raw HTTP response.
 *
 * Extends the `RawResponseOptions` interface to include additional properties
 * for managing response content, headers, status codes, and streaming files.
 */
export interface RawHttpResponseOptions extends RawResponseOptions {
  /**
   * The body of the HTTP response. Can be of any type, including strings, objects, or buffers.
   */
  body?: unknown

  /**
   * The HTTP status code of the response (e.g., `200`, `404`).
   */
  statusCode: number

  /**
   * The status message accompanying the HTTP status code (e.g., `OK`, `Not Found`).
   */
  statusMessage?: string

  /**
   * Headers to include in the HTTP response.
   * Can be provided as a `Map<string, string>` or `Headers` object.
   */
  headers?: Record<string, string>
}
