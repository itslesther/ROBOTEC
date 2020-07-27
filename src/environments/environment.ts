const environment = {
  production: true,
  jwtSecret: 'my_secret',
  activeDirectoryConfig: {
    url: 'ldap://dc.domain.com',
    baseDN: 'dc=domain,dc=com'
  },
  mongodbConfig: {
    dbName: '',
    databaseURL: ''
  },
}
  
export default environment;