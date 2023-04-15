module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'xo',
	],
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],

			rules: {
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'enum',
						format: ['UPPER_CASE'],
					},
				],
				'@typescript-eslint/object-curly-spacing': ['error', 'always'],
				'@typescript-eslint/indent': ['error', 2],
				'no-unused-vars': 'error',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
	},
};
