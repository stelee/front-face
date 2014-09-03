var Router=function()
{

}

Router.prototype.route=function(request)
{
  var host=request.headers.host.replace(/:\d+$/,""); //remove the port number
  var path=request.url;
  var ret;
  injector.process("route_table","config",function(t,config)
  {
    var hostNode=t[host] || t["_"];
    var pathNode=hostNode[path] || hostNode["_"];
    ret=pathNode;
  })
  return ret;
}

Router.prototype.proxy=function(proxy,request,response,target)
{
  var url;
  injector.process("url",function(u)
  {
    url=u;
  })
  if(target.indexOf("http://")===0
      || target.indexOf("https://")===0)
  {
      var ulrObject=url.parse(target);
      request.headers.host=ulrObject.host;
      request.url=ulrObject.path;
      proxy.web(request,response,{target:ulrObject.href});
  }else
  {
    var handler = require("../"+ config.handlers + "/" + target).instance();
    handler.proxy=proxy;
    handler.handle(request,response);
  }
}

exports.router=new Router();
