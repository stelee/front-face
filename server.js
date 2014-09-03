require("./dependencies");
var injector=require('./libs/injector').getInstance();

injector.process('http','http-proxy','basic-auth','config','Passport','logger','router',
function(http,httpProxy,basicAuth,config,Passport,logger,router){
  var proxy=httpProxy.createProxy();
  proxy.on('error', function (err, req, res) {
    logger.error(err);
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
  });
  logger.info("listen to the port "+config.port);
  http.createServer(function(req,res){
    var target=router.route(req);
    if(target.indexOf("@secure ") === 0){//secured url
      target=target.substring(8);
      var user=basicAuth(req);
      if(!!!user)
      {
        res.writeHead(401, {
          'WWW-Authenticate': 'Basic realm="lab.leesoft.ca"'
        })
        res.end()
        return;
      }
      var passport=new Passport(user.name,user.pass);
      passport.validate().then(function(pass){
        router.proxy(proxy,req,res,target);
      }).catch(function(pass){
        logger.warning(pass);
        res.writeHead(401, {
          'WWW-Authenticate': 'Basic realm="lab.leesoft.ca"'
        })
        res.end()
      })
    }else{
      router.proxy(proxy,req,res,target);
    }
  }).listen(config.port);
})
