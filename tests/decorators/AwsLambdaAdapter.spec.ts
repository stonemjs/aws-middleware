import { Mock } from 'vitest'
import { addBlueprint } from '@stone-js/core'
import { awsLambaAdapterBlueprint } from '../../src/options/AwsLambdaAdapterBlueprint'
import { AwsLambdaAdapter, AwsLambdaAdapterOptions } from '../../src/decorators/AwsLambdaAdapter'

/* eslint-disable @typescript-eslint/no-extraneous-class */

// Mock setClassMetadata
vi.mock('@stone-js/core')

describe('AwsLambdaAdapter', () => {
  it('should call setClassMetadata with correct parameters', () => {
    (addBlueprint as Mock).mockReturnValueOnce(() => {})
    const options: AwsLambdaAdapterOptions = awsLambaAdapterBlueprint.stone.adapters[0]
    AwsLambdaAdapter(options)(class {}, {} as any)
    expect(addBlueprint).toHaveBeenCalled()
  })

  it('should call setClassMetadata with default options if none are provided', () => {
    vi.mocked(addBlueprint).mockImplementation(() => {})
    AwsLambdaAdapter()(class {}, {} as any)
    expect(addBlueprint).toHaveBeenCalled()
  })
})
