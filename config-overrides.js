const { override, addWebpackAlias, useBabelRc, adjustStyleLoaders } = require('customize-cra')
const path = require('path')

const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
	useBabelRc(),
    addWebpackAlias({
		'@': resolve('src')
	}),
	adjustStyleLoaders(rule => {
		if (rule.test.toString().includes('scss')) {
			rule.use.push({
				loader: require.resolve('sass-resources-loader'),
				options: {
					resources: './src/assets/styles/output.scss'
				}
			})
		}
	})
)