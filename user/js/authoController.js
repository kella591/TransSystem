(function () {
	'use strict';
	var name = $.cookie("language")||"cn";
	var haiyun = angular.module('haiyun', ['ngRoute','pascalprecht.translate','haiyunControllers','haiyunServices','angularFileUpload']);
    haiyun.config(function($translateProvider) {
		 $translateProvider.translations('en',en).translations('cn',cn);
		 $translateProvider.preferredLanguage(name);
		 name = name+"Name";
    }).config(function($sceProvider){
		 $sceProvider.enabled(false);
    });

	 
	var haiyunControllers = angular.module('haiyunControllers', []);

    haiyunControllers.controller("authoCtrl",['$scope','$rootScope','httpService','alertService',function($scope,$rootScope,httpService,alertService) {

        $scope.authoData = {
            'aptitudeList': [
                //{"aptitudeID":1,
                //"aptitudeName":"营业执照",
                //"attachmentID":117,
                //"state":"PASS"
            //}
            ],
            //'aptStateList': [],
            //UNVALIDATE((byte)0,"未认证",'0'),
            //UNHANDLE((byte)1,"未处理",'1'),
            //PASS((byte)2,"通过",'2'),
            //REJECT((byte)3,"拒绝",'3');
            'aptitudeIds_upload': [],
            'fieldIds_upload': []
        };


        //var getAptState = function () {
            httpService.doPost('./struts/getAptitudeCode.action', {}, function (ret) {
              $scope.authoData.aptitudeList = ret.aptitudeState
                $scope.$apply();
                console.info('stateReturn', ret);
                console.info('authoData.aptitudeList in', $scope.authoData.aptitudeList);

                var aptList = $scope.authoData.aptitudeList;
                for (var i in aptList){
                    aptList[i].uped = false;
                    aptList[i].imageUrl="attach_img.action?id=" + aptList[i].attachmentID;
                    //if (aptList[i].state == 'UNHANDLE') aptList[i].state='处理中';
                }
                $scope.$apply();
            })
        //};
        $scope.submitHandler = function(){
            $scope.authoData.aptitudeIds_upload = [];
            $scope.authoData.fieldIds_upload = [];

            var apt;
            for (apt in $scope.authoData.aptitudeList){
                if ($scope.authoData.aptitudeList[apt].uped) {
                    $scope.authoData.aptitudeIds_upload.push($scope.authoData.aptitudeList[apt].aptitudeID);
                    $scope.authoData.fieldIds_upload.push($scope.authoData.aptitudeList[apt].fileId)
                }
            }

            var uploadData={
                'fileIds':$scope.authoData.fieldIds_upload.join(),
                'aptitudeIds':$scope.authoData.aptitudeIds_upload.join()
            };
            console.log(uploadData);
            console.log(uploadData.fileIds);
            console.log(uploadData.aptitudeIds);

            httpService.doPost('./struts/userAuthorization.action', uploadData, function(ret){
            	alertService.myAlert("^-^,认证提交成功！", "success");
            });
        };
        //var initData = function() {
        //    getAptState();
        //    var aptList = $scope.authoData.aptitudeList;
        //    for (var i in aptList){
        //        aptList[i].uped = false;
        //        console.info('index',(aptList[i].ids.id-1));
        //        console.info('authoData.aptStateList arr',$scope.authoData.aptStateList[(aptList[i].ids.id-1)]);
        //        aptList[i].state = $scope.authoData.aptStateList[(aptList[i].ids.id-1)];
        //        console.info('state',aptList[i].state);
        //    }
        //    $scope.$apply();
        //};
        //initData();
    }]);

    haiyunControllers.controller("UploadController", ['$scope','$rootScope', 'FileUploader', function($scope,$rootScope,FileUploader) {
        //$scope.aptitude = 0;
        var uploader = $scope.uploader = new FileUploader({
            url : "attach_upload.action",
            autoUpload : true,
            removeAfterUpload : true,
            alias : "upload",
            formData : [{uploadModuleId : 1}]
        });
        //console.info('upload',uploader);
        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            if(fileItem.file.size > 2 * 1024 * 1024) {
            	alertService.myAlert("文件大小超过2M", "error");
                uploader.removeFromQueue (fileItem);
            }
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            $scope.apt.uped = true;
            $scope.apt.fileId = response.attach.id;
            //$scope.authoData.aptitudeIds_upload.push(apt.ids.id);
            if(response.attach != undefined&&(response.attach.fileType.indexOf("image")>=0)) {
                $scope.apt.imageUrl = "attach_img.action?id=" + response.attach.id;
            }
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        console.info('uploader', uploader);

    }]);


    haiyun.filter('TypeToName',function(){
        return function(data,item){
            if (item == 'APTSTATE'){//
                //UNVALIDATE((byte)0,"未认证",'0'),
                //UNHANDLE((byte)1,"未处理",'1'),
                //PASS((byte)2,"通过",'2'),
                //REJECT((byte)3,"拒绝",'3');
                if (data == "0") return '未认证';
                if (data == "1") return '处理中';
                if (data == "2") return '已认证';
                if (data == "3") return '已拒绝';
            }

        }
    })

})();