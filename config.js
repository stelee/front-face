//You also need to change the password in ./libs/securityContex.js
exports.config={
  port: 9000,
  handlers: "./handlers",
  users: {
    'stelee' : {
      username : 'stelee'
      ,password : 'test'
      ,groups : [
        'user'
      ]
    },
    'admin' : {
      username : 'admin'
      ,password : 'admin'
      ,groups : [
        'user'
        , 'admin'
      ]
    },
    'twister' : {
      username : 'twister'
      ,password: 'changeyourpassword'
      ,groups : [
        'user'
        ,'twister'
      ]
    }
  },
  route_table:
  {
    "localhost" : {
      "/ifanr/" : "@secure http://www.ifanr.com",
      "/leesoft/" : "http://leesoft.ca",
      "/twister/" : "@secure twister",
      "_" : "http://www.google.com"
    },
    "127.0.0.1" : {
      "_" : "http://leesoft.ca"
    },
    "dev.lab.leesoft.ca" :
    {
      "_" : "http://leesoft.ca"
    },
    "_" :
    {
      "_" : "http://leesoft.ca"
    }
  }
}
