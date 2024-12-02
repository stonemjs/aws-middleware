import { addBlueprint, ClassType } from '@stone-js/core'
import { awsLambaHttpAdapterBlueprint, AwsLambaHttpAdapterConfig } from '../options/AwsLambdaHttpAdapterBlueprint'

/**
 * Interface for configuring the `AwsLambdaHttpAdapter` decorator.
 *
 * This interface extends `AwsLambdaHttpAdapterConfig` and allows partial customization
 * of the Aws Lambda HTTP adapter blueprint configuration.
 */
export interface AwsLambdaHttpAdapterOptions extends Partial<AwsLambaHttpAdapterConfig> {}

/**
 * A class decorator for registering an Aws Lambda HTTP adapter in the Stone.js framework.
 *
 * The decorator modifies the `awsLambaHttpAdapterBlueprint` by merging the provided options
 * with the default configuration. It also registers the blueprint to the target class using
 * the `addBlueprint` utility.
 *
 * @template T - The type of the class being decorated, defaulting to `ClassType`.
 *
 * @param options - An object containing configuration options for the Aws Lambda HTTP adapter.
 *
 * @returns A class decorator function.
 *
 * @example
 * ```typescript
 * import { AwsLambdaHttpAdapter } from '@stone-js/aws-lambda-http';
 *
 * @AwsLambdaHttpAdapter()
 * class MyHttpService {
 *   // Service implementation
 * }
 * ```
 */
export const AwsLambdaHttpAdapter = <T extends ClassType = ClassType>(
  options: AwsLambdaHttpAdapterOptions = {}
): ((target: T, context: ClassDecoratorContext<T>) => void) => {
  return (target: T, context: ClassDecoratorContext<T>) => {
    // Merge the provided options with the default Aws Lambda HTTP adapter blueprint
    awsLambaHttpAdapterBlueprint.stone.adapters[0] = {
      ...awsLambaHttpAdapterBlueprint.stone.adapters[0],
      ...options
    }

    // Register the updated blueprint with the target class
    addBlueprint(target, context, awsLambaHttpAdapterBlueprint)
  }
}
