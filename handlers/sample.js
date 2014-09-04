var Sample=function()
{

}
$I("BaseHandler",function(BaseHandler){
  Sample.prototype=new BaseHandler();
})
Sample.prototype.getTarget=function()
{
  return "http://leesoft.ca";
}
Sample.prototype.proxyRequest=function(proxyReq, req, res, options)
{
  proxyReq.setHeader('Authorization',"Basic "+new Buffer("user:pwd").toString('base64'));
}

exports.instance=function(proxy)
{
  return new Sample(proxy);
}
