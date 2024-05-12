import babel from '@rollup/plugin-babel'
import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'

const inputs = {
  config: 'src/config/*.mjs',
  decorators: 'src/decorators/*.mjs',
  index: [
    'src/AWSLambdaAdapter.mjs',
    'src/middleware/**/*.mjs',
    'src/constants.mjs'
  ],
}

export default Object.entries(inputs).map(([name, input]) => ({
	input,
	output: [
    { format: 'es', file: `dist/${name}.js` }
  ],
  plugins: [
    multi(),
    nodeExternals({
      include: ['@stonejs-community/aws-lambda-adapter']
    }), // Must always be before `nodeResolve()`.
    nodeResolve({
      exportConditions: ['node', 'import', 'require', 'default']
    }),
    babel({ babelHelpers: 'bundled' }),
    commonjs()
  ]
}))