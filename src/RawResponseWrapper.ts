import { RawResponse } from './declarations'
import { IRawResponseWrapper, RawResponseOptions } from '@stone-js/core'

export class RawResponseWrapper implements IRawResponseWrapper<RawResponse> {
  static create (options: Partial<RawResponseOptions>): RawResponseWrapper {
    return new this(options)
  }

  private constructor (
    private readonly options: Partial<RawResponseOptions>
  ) {}

  respond (): RawResponse {
    return this.options
  }
}
