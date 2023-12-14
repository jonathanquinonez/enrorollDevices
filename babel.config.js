module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            assets: './assets',
            components: './src/components',
            config: './src/config',
            adapter: './src/adapter',
            domain: './src/domain',
            i18n: './src/i18n',
            hooks: './src/hooks',
            icons: './assets/icons',
            infrastructure: './src/infrastructure',
            "ui-core": './src/ui-core'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
