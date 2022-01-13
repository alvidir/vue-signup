const path = require('path')

module.exports = {
    chainWebpack: config => {
        config.resolve.symlinks(false)
        config.resolve.alias.set('vue', path.resolve('./node_modules/vue'))
        config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => ({
            ...options,
            compilerOptions: {
            // treat all tags with a dash as custom elements
            //isCustomElement: tag => tag.includes('-'),
            },
        }))
    }
}