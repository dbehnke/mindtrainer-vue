module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/mindtrainer-vue/demo/'
    : '/',
    outputDir: "demo"
}