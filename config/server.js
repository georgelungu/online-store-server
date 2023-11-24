module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 3306),
  options: {
    // Specify the authentication method here (e.g., 'caching_sha2_password' or 'mysql_native_password')
    authPlugins: {
      mysql_native_password: 'newIdentity99$',
    },
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
