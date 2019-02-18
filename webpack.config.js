var path = require('path');

module.exports = {
    mode: "production",
    devtool: false,
    entry: './src/file-uploader-server.ts',
    target: 'node',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'file-uploader-server.js', // output file
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [
            'src'
            //'./node_modules',
            //'node_modules'
        ]
    },
    resolveLoader: {
        //root: [`${root}/node_modules`],
    },
    module: {
        rules: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        compilerOptions: {
                            noEmit: false,
                        }
                    }
                }
            ],
        }]
    }
};