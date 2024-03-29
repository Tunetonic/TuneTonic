module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
    ],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env.development",
        "blacklist": null,
        "whitelist": ['CLIENT_ID', 'REDIRECT_URI', 'NEST_URI'],
        "safe": false,
        "allowUndefined": true
      }]
    ]
  };
};
