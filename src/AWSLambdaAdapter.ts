import { RawResponseWrapper } from './RawResponseWrapper'
import { AwsLambdaAdapterError } from './errors/AwsLambdaAdapterError'
import { AwsLambdaContext, AwsLambdaEvent, AwsLambdaEventHandlerFunction, RawResponse, AwsLambdaAdapterContext } from './declarations'
import { Adapter, AdapterEventBuilder, AdapterOptions, IncomingEvent, IncomingEventOptions, OutgoingResponse, RawResponseOptions } from '@stone-js/core'

/**
 * Class representing a AWSLambdaAdapter.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @extends Adapter
 */
export class AWSLambdaAdapter extends Adapter<
AwsLambdaEvent,
RawResponse,
AwsLambdaContext,
IncomingEvent,
IncomingEventOptions,
OutgoingResponse,
AwsLambdaAdapterContext
> {
  static create (
    options: AdapterOptions<RawResponse, IncomingEvent, OutgoingResponse>
  ): AWSLambdaAdapter {
    return new this(options)
  }

  public async run<ExecutionResultType = AwsLambdaEventHandlerFunction>(): Promise<ExecutionResultType> {
    await this.onInit()

    const handler = (rawEvent: AwsLambdaEvent, executionContext: AwsLambdaContext): Promise<RawResponse> => {
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

  protected async eventListener (rawEvent: AwsLambdaEvent, executionContext: AwsLambdaContext): Promise<RawResponse> {
    const incomingEventBuilder = AdapterEventBuilder.create<IncomingEventOptions, IncomingEvent>({
      resolver: (options) => IncomingEvent.create(options)
    })

    const rawResponseBuilder = AdapterEventBuilder.create<RawResponseOptions, RawResponseWrapper>({
      resolver: (options) => RawResponseWrapper.create(options)
    })

    const rawResponse: RawResponse = {}

    return await this.sendEventThroughDestination({
      rawEvent,
      rawResponse,
      executionContext,
      rawResponseBuilder,
      incomingEventBuilder,
    })
  }
}
