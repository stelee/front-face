var BaseHandler=function(proxy)
{
  var that=this;
  this.proxy=proxy;
  $I("logger",function(logger){
    that.logger=logger;
  })
}
BaseHandler.prototype.proxyRequest=function(proxyReq, req, res, options)
{
  //DO nothing
}
BaseHandler.prototype.error=function(error,req,res)
{
  that.logger.error(error);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
}
BaseHandler.prototype.proxyResponse=function(proxyRes,req,res)
{
  //Do nothing
}

BaseHandler.prototype.handle=function(request,response)
{
  var that=this;
  var target=this.getTarget();
  var urlObject=null;
  $I('url',function(url)
  {
    urlObject=url.parse(target);
  });
  request.url=urlObject.path
  this.proxy.on('proxyReq', function(proxyReq, req, res, options)
  {
    proxyReq.setHeader("Host",urlObject.host);
    that.proxyRequest.call(that,proxyReq,req,res,options)
  });
  this.proxy.on('error',function(e){
    that.error.call(that,e);
  });
  this.proxy.on('proxyRes', function (proxyRes, req, res) {
    that.proxyResponse.call(that,proxyRes,req,res);
  });
  this.proxy.web(request,response,{target: target})
}
exports.BaseHandler=BaseHandler;
