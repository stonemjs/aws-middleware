import { addBlueprint, ClassType } from '@stone-js/core'
import { awsLambaAdapterBlueprint, AwsLambaAdapterConfig } from '../options/AwsLambdaAdapterBlueprint'

/**
 * Configuration options for the `AwsLambdaAdapter` decorator.
 * These options extend the default AWS Lambda adapter configuration.
 */
export interface AwsLambdaAdapterOptions extends Partial<AwsLambaAdapterConfig> {}

/**
 * A Stone.js decorator that integrates the AWS Lambda Adapter with a class.
 *
 * This decorator modifies the class to seamlessly enable AWS Lambda as the
 * execution environment for a Stone.js application. By applying this decorator,
 * the class is automatically configured with the necessary blueprint for AWS Lambda.
 *
 * @template T - The type of the class being decorated. Defaults to `ClassType`.
 * @param options - Optional configuration to customize the AWS Lambda Adapter.
 *
 * @returns A class decorator that applies the AWS Lambda adapter configuration.
 *
 * @example
 * ```typescript
 * import { AwsLambdaAdapter } from '@stone-js/aws-lambda-adapter';
 *
 * @AwsLambdaAdapter({
 *   alias: 'MyAWSLambdaAdapter',
 * })
 * class App {
 *   // Your application logic here
 * }
 * ```
 */
export const AwsLambdaAdapter = <T extends ClassType = ClassType>(
  options: AwsLambdaAdapterOptions = {}
): ((target: T, context: ClassDecoratorContext<T>) => void) => {
  return (target: T, context: ClassDecoratorContext<T>) => {
    if (awsLambaAdapterBlueprint.stone?.adapters?.[0] !== undefined) {
      // Merge provided options with the default AWS Lambda adapter blueprint.
      awsLambaAdapterBlueprint.stone.adapters[0] = {
        ...awsLambaAdapterBlueprint.stone.adapters[0],
        ...options
      }
    }

    // Add the modified blueprint to the target class.
    addBlueprint(target, context, awsLambaAdapterBlueprint)
  }
}
