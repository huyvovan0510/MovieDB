const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;


/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resetCache: true,
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/screens': path.resolve(__dirname, 'src/screens'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/stores': path.resolve(__dirname, 'src/stores'),
      '@/theme': path.resolve(__dirname, 'src/theme'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/navigation': path.resolve(__dirname, 'src/navigation'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
    },
  },
};

module.exports = mergeConfig(
  defaultConfig,
  wrapWithReanimatedMetroConfig(config),
);
