var Promise = require('promise');
var Passport=function(username,password)
{
  this.username=username;
  this.password=password;
  var that=this;
  injector.process("securityContext",function(sc)
  {
    that.securityContext=sc;
  })
}
Passport.prototype.validate=function(username,password)
{
  this.username=username || this.username;
  this.password=password || this.password;
  var that=this;
  return new Promise(function(resolve,reject)
  {
    var sc=that.securityContext;
    var user=sc[that.username];
    if(!!!user)
    {
      that.valid=false;
      that.msg = "user doesn't exist"
      reject(that);
    }else if(user.password != that.password)
    {
      that.valid=false;
      that.msg = "username or password doesn't match"
      reject(that);
    }else
    {
      that.valid=true;
      that.user=user
      resolve(that);
    }
  })
}
Passport.prototype.belongsToGroup=function(group)
{
  return this.user.groups.indexOf(group)>=0;
}


exports.Passport=Passport;
