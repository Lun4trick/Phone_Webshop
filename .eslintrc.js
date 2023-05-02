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
				'xo-typescript/space',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
			rules: {
				'@typescript-eslint/object-curly-spacing': ['error', 'always'],
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'variable',
						format: [
							'camelCase',
							'PascalCase',
							'UPPER_CASE',
						],
					},
					{
						selector: 'function',
						format: [
							'camelCase',
							'PascalCase',
						],
					},
					{
						selector: 'typeLike',
						format: [
							'PascalCase',
						],
					},
				],
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
