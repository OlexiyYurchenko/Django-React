
module.exports = {
    entry: __dirname +  '/src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          exclude: /\.useable\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                disable: true, 
              },
            },
          ],
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '../../first_project/static/first_project',
      publicPath: '/',
      filename: 'app.js'
    },
    devServer: {
      contentBase: '../first_project/static/first_project'
    }
  };