import { addBlueprint, ClassType } from '@stone-js/core'
import { awsLambaHttpAdapterBlueprint, AwsLambaHttpAdapterConfig } from '../options/AwsLambdaHttpAdapterBlueprint'

/**
 * Configuration options for the `AwsLambdaHttpAdapter` decorator.
 * These options extend the default AWS Lambda HTTP adapter configuration.
 */
export interface AwsLambdaHttpAdapterOptions extends Partial<AwsLambaHttpAdapterConfig> {}

/**
 * A Stone.js decorator that integrates the AWS Lambda HTTP Adapter with a class.
 *
 * This decorator modifies the class to seamlessly enable AWS Lambda HTTP as the
 * execution environment for a Stone.js application. By applying this decorator,
 * the class is automatically configured with the necessary blueprint for AWS Lambda HTTP.
 *
 * @template T - The type of the class being decorated. Defaults to `ClassType`.
 * @param options - Optional configuration to customize the AWS Lambda HTTP Adapter.
 *
 * @returns A class decorator that applies the AWS Lambda HTTP adapter configuration.
 *
 * @example
 * ```typescript
 * import { AwsLambdaHttpAdapter } from '@stone-js/aws-lambda-adapter';
 *
 * @AwsLambdaHttpAdapter({
 *   alias: 'MyAwsLambdaHttpAdapter',
 *   current: true,
 * })
 * class App {
 *   // Your application logic here
 * }
 * ```
 */
export const AwsLambdaHttpAdapter = <T extends ClassType = ClassType>(
  options: AwsLambdaHttpAdapterOptions = {}
): ((target: T, context: ClassDecoratorContext<T>) => void) => {
  return (target: T, context: ClassDecoratorContext<T>) => {
    if (awsLambaHttpAdapterBlueprint.stone?.adapters?.[0] !== undefined) {
      // Merge provided options with the default AWS Lambda HTTP adapter blueprint.
      awsLambaHttpAdapterBlueprint.stone.adapters[0] = {
        ...awsLambaHttpAdapterBlueprint.stone.adapters[0],
        ...options
      }
    }

    // Add the modified blueprint to the target class.
    addBlueprint(target, context, awsLambaHttpAdapterBlueprint)
  }
}
