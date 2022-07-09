const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
const publicPath = '/';
const isEnvProduction = false;
const isEnvDevelopment = true;

module.exports = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // Stop compilation early in production
  bail: isEnvProduction,
  devtool: isEnvProduction
    ? 'eval-source-map'
    : isEnvDevelopment && 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    path: isEnvProduction ? path.resolve(__dirname, 'build') : undefined,
    filename: isEnvProduction ? '[name].[contenthash:8].js' : '[name].bundle.js',
    publicPath: publicPath,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js\.map$/,
        use: 'source-map',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    //isEnvProduction ? new CleanWebpackPlugin() : {},
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'public', 'index.html'),
          favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        },
        isEnvProduction
          ? {
            minify: {
              html5: true,
              removeTagWhitespace: true,
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined
      )
    ),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '',
    }),
    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    /*new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),*/
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
    }),
  ],
  optimization: {
    minimize: isEnvProduction,
    // Automatically split vendor and commons
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, './src/config/'),
      '@layout': path.resolve(__dirname, './src/layout/'),
      '@providers': path.resolve(__dirname, './src/providers/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
      '@assets': path.resolve(__dirname, './src/shared/assets/'),
      '@constants': path.resolve(__dirname, './src/shared/constants/'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks/'),
      '@libs': path.resolve(__dirname, './src/shared/libs/'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: path.join(__dirname, 'public'),
    //contentBasePublicPath: path.join(__dirname, 'public'),
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/',
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebook/create-react-app/issues/293
    // src/node_modules is not ignored to support absolute imports
    // https://github.com/facebook/create-react-app/issues/1065
    watchOptions: {
      ignored: ignoredFiles(path.join(__dirname, 'src')),
    },
    port: 8080,
    open: false,
    historyApiFallback: true,
  },
};
