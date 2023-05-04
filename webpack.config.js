const Dotenv = require('dotenv-webpack');
module.exports = (env) => {

  return {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: ['mapbox-gl/dist/mapbox-gl.css', './client/index.js'],
    output: {
      path: __dirname + '/public',
      filename: 'bundle.js',
    },
    context: __dirname,
    devtool: process.env.NODE_ENV === 'production' ? 'hidden-nosources-source-map' : 'source-map',
    // this allows .env to happen
    plugins: [
      new Dotenv({
        path: '.env', // or '.env.local', '.env.[mode]', etc.
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      }),
    ],
    module: {
      rules: [
        {
          // this allows css styling loader
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    },
  }
};
