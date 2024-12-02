import { addBlueprint, ClassType } from '@stone-js/core'
import { awsLambaAdapterBlueprint, AwsLambaAdapterConfig } from '../options/AwsLambdaAdapterBlueprint'

/**
 * Interface for configuring the `AwsLambdaAdapter` decorator.
 *
 * This interface extends `AwsLambdaAdapterConfig` and allows partial customization
 * of the Aws Lambda adapter blueprint configuration.
 */
export interface AwsLambdaAdapterOptions extends Partial<AwsLambaAdapterConfig> {}

/**
 * A class decorator for registering an Aws Lambda adapter in the Stone.js framework.
 *
 * The decorator modifies the `awsLambaAdapterBlueprint` by merging the provided options
 * with the default configuration. It also registers the blueprint to the target class using
 * the `addBlueprint` utility.
 *
 * @template T - The type of the class being decorated, defaulting to `ClassType`.
 *
 * @param options - An object containing configuration options for the Aws Lambda adapter.
 *
 * @returns A class decorator function.
 *
 * @example
 * ```typescript
 * import { AwsLambdaAdapter } from '@stone-js/aws-lambda-http';
 *
 * @AwsLambdaAdapter()
 * class MyService {
 *   // Service implementation
 * }
 * ```
 */
export const AwsLambdaAdapter = <T extends ClassType = ClassType>(
  options: AwsLambdaAdapterOptions = {}
): ((target: T, context: ClassDecoratorContext<T>) => void) => {
  return (target: T, context: ClassDecoratorContext<T>) => {
    // Merge the provided options with the default Aws Lambda adapter blueprint
    awsLambaAdapterBlueprint.stone.adapters[0] = {
      ...awsLambaAdapterBlueprint.stone.adapters[0],
      ...options
    }

    // Register the updated blueprint with the target class
    addBlueprint(target, context, awsLambaAdapterBlueprint)
  }
}
