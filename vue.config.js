// vue.config.js
module.exports = {
  untimeCompiler: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // Disable CSS minification
      config.optimization.minimize(false);
    }
  },
};
