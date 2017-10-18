const webpack = require('webpack');

module.exports = () => {
    return {
        siteBasePath: '/mapbox-gl-js',
        siteOrigin: 'https://www.mapbox.com',
        pagesDirectory: `${__dirname}/docs/pages`,
        stylesheets: [
            `${__dirname}/vendor/dotcom-page-shell/page-shell-styles.css`
        ],
        applicationWrapperPath: `${__dirname}/docs/components/application-wrapper.js`,
        webpackLoaders: [
            // Use raw loader to get the HTML string contents of examples
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ],
        webpackPlugins: [
            // Make environment variables available within JS that Webpack compiles.
            new webpack.DefinePlugin({
                // DEPLOY_ENV is used in config to pick between staging/production.
                'process.env.DEPLOY_ENV': `"${process.env.DEPLOY_ENV}"`
            })
        ],
        inlineJs: [
            {
                filename: `${__dirname}/vendor/dotcom-page-shell/page-shell-script.js`
            }
        ],
        dataSelectors: {
            examples: ({pages}) => {
                return pages
                    .filter(({path, frontMatter}) => /\/example\//.test(path) && frontMatter.tags)
                    .map(({frontMatter}) => frontMatter);
            }
        }
    };
};
