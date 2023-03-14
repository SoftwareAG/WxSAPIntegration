app.service('myserv', function() {
          this.getServiceList = function () {
    return [];
}
this.getISEndpoint = function() { 
 return 'http://daedcprod01.eur.ad.sag:5555/';
}
this.getAPIList = function() { 
 return [];
}
this.getCreatedTime = function() { 
 return "09-03-2023 07:47:36 CET";
}
this.getPackageInfo = function(){
 return{"packageName":"WxSAPIntegration","version":"1.0"};
}
});
