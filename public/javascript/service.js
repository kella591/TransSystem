(function() {
    'use strict';
    var haiyunServices = angular.module('haiyunServices', []);
    var  myAlert= function(msg,type) {
    	//IE7 use default alert
    	if(navigator.appName=="Microsoft Internet Explorer" && (navigator.appVersion.match(/7./i)=="7."||navigator.appVersion.match(/8./i)=="8.")){
    		alert(msg);
    	}else{
    		
    		swal(msg,type);
    	}
    };
    
    haiyunServices.service('checkService', [function() {
        return {
            checkEmail: function(email) {
                var reg = /\w@\w*\.\w/;
                return reg.test(email);
            },
            checkPhone: function(phone) {
                var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                return reg.test(phone);
            },
            checkPassword: function(password) {
                return password && password.length > 5;
            },
            checkCheckNum: function(checkNum) {
                var reg = /^[0-9]{6}$/;
                return reg.test(checkNum);
            },
            checkRole: function(type) {
                var reg = /^(ADMINISTOR)|(PERSON)|(TRADE)|(TRANSPORT)$/;
                return reg.test(type);
            },
            checkUsername: function(username) {
            	var reg = /^[^0-9]+\w*$/;
                return reg.test(username) && username.length > 5;
            }
        }
    }]);

    

    haiyunServices.service('httpService', ['$http', function($http) {
        var handleResponse = function(responseData,callback) {
        	if (responseData.err_code) {
        		myAlert(responseData.err_msg, "error");
        		return;
        	}
                callback(responseData);
            };

        return {
            doPost: function(url, data, callback,asy) {
                data.locale = $.cookie("language")||"cn";
            	$.ajax({
            		async:!!!asy,
                    type: "POST",
                    url: url,
                    data: $.param(data),
                    datatype: "json",
                    success: function(data) {
                        handleResponse(data,callback);
                    },
                    error: function() {
                    	myAlert({'cn':'http 错误！','en':"http error!"}[data.locale], "error");
                    }
                });
            }
        }
    }]);
    
    haiyunServices.service('alertService', [function() {
        return {
            myAlert: myAlert
        };
    }]);
    
    haiyunServices.factory('redirectService', ['$rootScope', '$location', function($rootScope, $location) {
        return {
            redirect: function(path) {
                $rootScope.$apply(function() {
                    $location.path(path);
                });
            }
        };
    }]);
})();