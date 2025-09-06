module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/stores': './src/stores',
          '@/theme': './src/theme',
          '@/utils': './src/utils',
          '@/types': './src/types',
          '@/navigation': './src/navigation',
          '@/constants': './src/constants',
          '@/assets': './src/assets',
        },
      },
    ],
  ],
};
