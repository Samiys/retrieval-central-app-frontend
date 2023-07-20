// vue.config.js
module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // Disable CSS minification
      config.optimization.minimize(false);
    }
  },
};
