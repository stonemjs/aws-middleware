import { RawHttpResponseWrapper } from './RawHttpResponseWrapper'
import { AwsLambdaAdapterError } from './errors/AwsLambdaAdapterError'
import { Adapter, AdapterEventBuilder, AdapterOptions } from '@stone-js/core'
import { IncomingHttpEvent, IncomingHttpEventOptions, OutgoingHttpResponse } from '@stone-js/http-core'
import { AwsLambdaContext, AwsLambdaHttpEvent, AwsLambdaHttpAdapterContext, AwsLambdaEventHandlerFunction, RawHttpResponse, RawHttpResponseOptions } from './declarations'

/**
 * Class representing a AWSLambdaHttpAdapter.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @extends Adapter
 */
export class AWSLambdaHttpAdapter extends Adapter<
AwsLambdaHttpEvent,
RawHttpResponse,
AwsLambdaContext,
IncomingHttpEvent,
IncomingHttpEventOptions,
OutgoingHttpResponse,
AwsLambdaHttpAdapterContext
> {
  static create (
    options: AdapterOptions<RawHttpResponse, IncomingHttpEvent, OutgoingHttpResponse>
  ): AWSLambdaHttpAdapter {
    return new this(options)
  }

  public async run<ExecutionResultType = AwsLambdaEventHandlerFunction<RawHttpResponse>>(): Promise<ExecutionResultType> {
    await this.onInit()

    const handler = (rawEvent: AwsLambdaHttpEvent, executionContext: AwsLambdaContext): Promise<RawHttpResponse> => {
      return this.eventListener(rawEvent, executionContext)
    }

    return handler as ExecutionResultType
  }

  protected async onInit (): Promise<void> {
    if (typeof window === 'object') {
      throw new AwsLambdaAdapterError(
        'This `AwsLambdaAdapter` must be used only in AWS Lambda context.'
      )
    }

    await super.onInit()
  }

  protected async eventListener (rawEvent: AwsLambdaHttpEvent, executionContext: AwsLambdaContext): Promise<RawHttpResponse> {
    const incomingEventBuilder = AdapterEventBuilder.create<IncomingHttpEventOptions, IncomingHttpEvent>({
      resolver: (options) => IncomingHttpEvent.create(options)
    })

    const rawResponseBuilder = AdapterEventBuilder.create<RawHttpResponseOptions, RawHttpResponseWrapper>({
      resolver: (options) => RawHttpResponseWrapper.create(options)
    })

    const rawResponse: RawHttpResponse = { statusCode: 500 }

    return await this.sendEventThroughDestination({
      rawEvent,
      rawResponse,
      executionContext,
      rawResponseBuilder,
      incomingEventBuilder,
    })
  }
}
