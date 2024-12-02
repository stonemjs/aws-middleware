import { IRawResponseWrapper } from '@stone-js/core'
import { RawHttpResponse, RawHttpResponseOptions } from './declarations'

export class RawHttpResponseWrapper implements IRawResponseWrapper<RawHttpResponse> {
  static create (options: Partial<RawHttpResponseOptions>): RawHttpResponseWrapper {
    return new this(options)
  }

  private constructor (
    private readonly options: Partial<RawHttpResponseOptions>
  ) {}

  respond (): RawHttpResponse {
    return {
      headers: this.options.headers,
      statusCode: this.options.statusCode ?? 500,
      statusMessage: this.options.statusMessage ?? '',
      body: typeof this.options.body === 'string' ? this.options.body : JSON.stringify(this.options.body)
    }
  }
}
