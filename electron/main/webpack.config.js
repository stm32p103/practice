module.exports = {
    mode: 'development',
    entry: `./src/main.ts`,
    target: 'electron-main',
    output : {
        path: `${__dirname}/../dist/main`,
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions:['.ts', '.webpack.js', '.web.js', '.js', '.json']
    },
    module : {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
              }
        ],
    },
    plugins:[],
    node: {
        __dirname: false,
        __filename: false
    }
};