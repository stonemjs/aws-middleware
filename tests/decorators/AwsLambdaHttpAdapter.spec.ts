import { Mock } from 'vitest'
import { addBlueprint } from '@stone-js/core'
import { awsLambaHttpAdapterBlueprint } from '../../src/options/AwsLambdaHttpAdapterBlueprint'
import { AwsLambdaHttpAdapter, AwsLambdaHttpAdapterOptions } from '../../src/decorators/AwsLambdaHttpAdapter'

/* eslint-disable @typescript-eslint/no-extraneous-class */

// Mock setClassMetadata
vi.mock('@stone-js/core')

describe('AwsLambdaHttpAdapter', () => {
  it('should call setClassMetadata with correct parameters', () => {
    (addBlueprint as Mock).mockReturnValueOnce(() => {})
    const options: AwsLambdaHttpAdapterOptions = awsLambaHttpAdapterBlueprint.stone.adapters?.[0] ?? {}
    AwsLambdaHttpAdapter(options)(class {}, {} as any)
    expect(addBlueprint).toHaveBeenCalled()
  })

  it('should call setClassMetadata with default options if none are provided', () => {
    vi.mocked(addBlueprint).mockImplementation(() => {})
    AwsLambdaHttpAdapter()(class {}, {} as any)
    expect(addBlueprint).toHaveBeenCalled()
  })
})
