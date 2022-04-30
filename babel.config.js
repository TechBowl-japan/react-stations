module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      ...(api.env('test') ? ['@babel/preset-typescript'] : []),
    ],
    ...(api.env('development') && { plugins: ['react-refresh/babel'] }),
  }
}
