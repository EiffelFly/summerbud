// This eslint config is for nextjs app

module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`, we get all the extends lint rules about typescript there.
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
