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
    'test' : {
      username : 'test'
      ,password: 'test'
      ,groups : [
        'user'
        ,'test'
      ]
    }
  },
  route_table:
  {
    "localhost" : {
      "/yahoo/" : "http://www.yahoo.com",
      "/leesoft/" : "@secure http://leesoft.ca",
      "/sample/" : "@secure(user,test) sample",
      "_" : "http://www.google.com"
    },
    "127.0.0.1" : {
      "_" : "http://www.google.com"
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
