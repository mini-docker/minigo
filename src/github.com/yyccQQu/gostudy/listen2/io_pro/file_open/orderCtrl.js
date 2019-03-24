
angular.module('app.order').controller('orderCtrl',
    function ($scope, popupSvc, $rootScope, APP_CONFIG, orderService, commonService, $state) {

        //获取页面权限,配置功能点权限
        var routes = commonService.getAuth($state.current.name);
        if (routes != undefined) {
            var config = APP_CONFIG.apiUrls;
            $scope.auth = {
                export: routes.indexOf(config.BETRECORD_EXCEL) >= 0
            };
        } else {
            popupSvc.smallBox("fail", "请重新登录");
            $state.go("realLogin");
        }
        $scope.json = APP_CONFIG.option;
        $scope.RegExp = APP_CONFIG.RegExp;
        $scope.siteArr = $scope.siteIndexIdArr = [];
        $scope.dateTest = {
            startTime:'', //开始时间
            endTime:'' //结束时间
        }
        $scope.payTime = {
            startTime: "",
            endTime: ""
        };

        $scope.searchObj = {
            status: 0,
            indexId: null,
            betTimelineBegin: 0,
            betTimelineEnd: 0,
            username: "",
            gUsername: "",
            order: "",
            gameName: "",
            asc: false,
            orderBy: "",
            gameType: 0,
            isMatch: 2,
            refreshTime: '',
            platform: "",
            orderType:0
        }
        //获取站点
        commonService.getSiteIndexIdList().then(function (res) {
            var Wid = res
            Wid = Wid.map(v => {
                v.name = v.siteName
                return v;
            })
            Wid.unshift({
                siteIndexId: '',
                name: '全部'
            })
            $scope.searchObj.indexId = Wid[0].siteIndexId;

            $scope.websiteList = Wid;
        })

        //获取头部菜单方法
        orderService.getGamearr().then(function (res) {
            if (res.status === 200) {
                $scope.productSelect = res.data.data.types;
                console.log($scope.productSelect,'$scope.productSelect')
                //判断是否是彩票 1是彩票 其他不是彩票
                getPlatform($scope.productSelect[0].gameType)
                
            } else {
                popupSvc.smallBox('fail', res.data.msg)
            }
        })

        $scope.inow_lei = 0;
        $scope.inow_chang = 0;

        setTimeout(function () {
            var height = angular.element(".changshang-ul").height();
            if (height > 48) {
                $scope.isShowSpread = true;
                angular.element(".changshang-ul").height(48);
                angular.element(".changshang-ul").css({
                    "overflow": "hidden"
                });
            }
        }, 100);


        $scope.isShowSpread = false; //是否显示展开，收起按钮
        $scope.isSpread = true; //控制上下箭头


        $scope.tyid = '';
        $scope.searchList = [
        {
            name: "注单号",
            value: 3
        },
        {
            name: "期数",
            value: 4
        }
        ];
        $scope.searchListpro = [
          {
            name: "账号",
            value: 1
          },
          {
            name: "玩法",
            value: 2
          }
        ];
        $scope.keyWord = $scope.searchList[0].value;
        $scope.keyWordpro = $scope.searchListpro[0].value;

        
        var makenone = function() {
            $scope.orderId = "";
            $scope.gameId = "";
            $scope.searchStr="";
        }
        var makeonepro = function() {
            $scope.username = "";
            $scope.gUsername = "";
            $scope.searchStrpro="";
        }

        $scope.placeholder = "请输入注单号";
        $scope.reg = "letter-number";
        $scope.placeholderpro = "请输入期数";
        $scope.regpro = "letter-number-chinese";
        $scope.$watch('keyWord',function(v){
            makenone();
            console.log(1234567)
            if(v==3){
                
                $scope.placeholder = "请输入注单号";
                $scope.reg = "letter-number";
            }else if(v==4){
                
                $scope.placeholder = "请输入期数";
                $scope.reg = "letter-number-chinese";
            }
            console.log($scope.orderId, 'orderId', $scope.searchStr)

        })
        $scope.$watch('keyWordpro', function (v) {
            makeonepro();
            if (v == 1) {
                $scope.placeholderpro = "请输入账号";
                $scope.regpro = "letter-number-chinese";
            } else if (v == 2) {
                $scope.placeholderpro = "请输入玩法";
                $scope.regpro = "letter-number-chinese";
            }
        })
        $scope.spaceAndenter = function (obj){
            return commonService.spaceAndenter(obj)
        }

        $scope.dishList = [
            {
                name:"A盘",
                value:"1"
            },
            {
                name: "B盘",
                value: "2"
            },
        ];
        $scope.statusList = [
            {
                name: "未结算",
                value: "1"
            },
            {
                name: "已结算",
                value: "2"
            },
            {
                name: "输",
                value: "3"
            },
            {
                name: "赢",
                value: "4"
            },
            {
                name: "和",
                value: "5"
            },
        ]
        $scope.fromList = [
            {
                name: "PC",
                value: "1"
            },
            {
                name: "WAP",
                value: "2"
            },
            {
                name: "APP",
                value: "3"
            },
        ]





        //获取分类下拉
        function getPlatform(params) {
            orderService.getGameTypearr({
                gameType: params
            }).then(function (res) {
                $scope.platfromSelect = res.data.data.platforms;
                $scope.searchObj.platform = $scope.platfromSelect[0];
                // 初始类别
                getGbpList($scope.searchObj.platform).then(function (res) {
                    $scope.getGbpListArr = res
                });
                console.log(123456)
            })
        }

        //头部菜单方法
        $scope.clickLei = function (item, idx) {
            $scope.inow_lei = idx;
            console.log(item, 'item')
            
            $scope.getGbpListArr = ''
            $scope.inow_chang = 0
            var url = item.linkUrl;
            $state.go(url);
        }
        $scope.clickChang = function (item, idx) {
            $scope.inow_chang = idx;
            //console.log(idx, 'idx', item)
            $scope.searchObj.gameType = ''
            $scope.searchObj.platform = item;
            // GetAllEmployee()
            getGbpList($scope.searchObj.platform).then(function (res) {
                $scope.getGbpListArr = res
                // $scope.searchObj.gameType = $scope.getGbpListArr[0].gameType
                //console.log(res, 'ressss')
            });
            $scope.getGbpListArr = ''
            // var url = item.linkUrl;
            // $state.go(url);
        }

        $scope.comminTime = 0;
        //获取列表数据
        $scope.defaultNoData = true;
        $scope.loadig = false;
        var GetAllEmployee = function () {
            if ($scope.defaultNoData) return;
            $scope.loadig = true;
            var postData = {}
            $scope.postData = $.extend(postData, $scope.searchObj)
            postData.page = $scope.paginationConf.currentPage;
            postData.pageSize = $scope.paginationConf.itemsPerPage;
            postData.status = parseInt(postData.status);
            postData.gameType = parseInt(postData.gameType);
            postData.startTime = commonService.Timestamp($scope.dateTest.startTime) < 0 ? 0 : commonService.Timestamp($scope.dateTest.startTime);
            postData.endTime = commonService.Timestamp($scope.dateTest.endTime) < 0 ? 0 : commonService.Timestamp($scope.dateTest.endTime);
            console.log($scope.searchStr,'$scope.orderId')
            if($scope.keyWord==3){
                $scope.orderId = $scope.searchStr;
            }else if($scope.keyWord==4){
                $scope.gameId = $scope.searchStr;
            }   
            if ($scope.keyWordpro == 1) {
                $scope.username = $scope.searchStrpro;
            } else if ($scope.keyWordpro == 2) {
                $scope.gUsername = $scope.searchStrpro;
            }  
            postData.orderId = $scope.orderId;
            postData.gameId = $scope.gameId;
            postData.username = $scope.username;
            postData.gUsername = $scope.gUsername;
            if ($scope.intervalId != null) {
                clearInterval($scope.intervalId)
                console.log($scope.intervalId)
            }
            if (postData.betTimelineEnd==""){
                postData.betTimelineEnd=0
            }
            orderService.getOrderList(postData).then(function (res) {
                if (res.status === 200) {
                    $scope.paginationConf.totalItems = res.data.meta.count;
                    $scope.list = res.data.data.Records;
                    $scope.SubTotal = res.data.data.SubTotal
                    $scope.Total = res.data.data.Total
                } else {
                    $scope.isAvailableBatch = true;
                    popupSvc.smallBox("fail", res.data.msg);
                }
                $scope.loadig = false;
                setTimeout(function () {
                    if ($scope.intervalId != null) {
                        clearInterval($scope.intervalId)
                        console.log($scope.intervalId)
                    }
                    $scope.intervalId = setInterval(function () {
                        console.log($scope.comminTime, '$scope.comminTime')
                        if ($scope.comminTime === 0 || $scope.comminTime === '2') {
                            clearInterval($scope.intervalId);
                            return
                        }
                        $scope.search();
                    }, $scope.comminTime * 1000);
                }, .1)
            })
        };
        //分页初始化
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
            onChange: function () {
                if ($scope.paginationConf.currentPage === 0) {
                    $scope.paginationConf.currentPage = 1
                };
            }
        };
        //点击搜索
        $scope.search = function () {
            $scope.defaultNoData = false;
            if ($scope.paginationConf.currentPage === 1) {
                GetAllEmployee();
            } else {
                $scope.paginationConf.currentPage = 1;
            }
        };

        //重置搜索按钮
        $scope.resetSearch = function () {
            $scope.siteArr = $scope.siteIndexIdArr = [];
            $scope.searchObj.status = 1;
            // $scope.searchObj.siteId = $scope.oldOption[0].siteId;
            $scope.searchObj.indexId = $scope.websiteList[0].siteIndexId;
            $scope.searchObj.gameDevice = "";
            // $scope.searchObj.betTimelineBegin = "";
            // $scope.searchObj.betTimelineEnd = "";
            $scope.searchObj.username = "";
            $scope.searchObj.gUsername = "";
            $scope.searchObj.orderId = "";
            $scope.searchObj.gameName = "";
            $scope.searchObj.gameType = "";
            $scope.searchObj.gameId = "";
            $scope.searchObj.isMatch = 2;
            $scope.searchObj.refreshTime = $scope.json.time_type[0].key;
            $scope.dateTest = {
                startTime: commonService.forMataDates(1), //开始时间
                endTime: commonService.forMataDates(2) //结束时间
            }
            //重置切换下拉框
            makenone();
            makeonepro();
            $scope.keyWord = $scope.searchList[0].value;
            $scope.keyWordpro = $scope.searchListpro[0].value;
            $scope.searchObj.orderType = 0;
        };

        //导出
        $scope.export = function () {
            $scope.searchObj.betTimelineBegin = $scope.dateTest.startTime
            $scope.searchObj.betTimelineEnd = $scope.dateTest.endTime
            localStorage.setItem("operationPwd", $scope.operationPwd);
            console.log($scope.searchObj,'$scope.searchObj')
            $scope.searchObj.page = $scope.paginationConf.currentPage
            $scope.searchObj.pageSize = $scope.paginationConf.itemsPerPage
            $scope.searchObj.betTimelineEnd = $scope.searchObj.betTimelineEnd == '' ? null : $scope.searchObj.betTimelineEnd;
            orderService.postFileExport($scope.searchObj).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    $("#myModal_adds").modal('hide')
                    downLoadFile(res.data);
                } else {
                    var enc = new TextDecoder("utf-8");
                    var arr = new Uint8Array(res.data);
                    var html = enc.decode(arr);
                    var msg = JSON.parse(html).msg;
                    popupSvc.smallBox("fail", msg);
                }
                localStorage.setItem("operationPwd", "");
            });
        }


        //下载
        function downLoadFile(data) {
            var blob = new Blob([data], {
                type: "application/vnd.ms-excel"
            });
            var objectUrl = URL.createObjectURL(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display:none");
            a.setAttribute("href", objectUrl);
            var filename = `${new Date().valueOf()}.xlsx`;
            a.setAttribute("download", filename);
            a.click();
            URL.revokeObjectURL(objectUrl);
            popupSvc.smallBox("success", $rootScope.getWord("操作成功"));
        }

        $scope.$watch("dateTest.startTime", function (v1, v2) {
            $scope.searchObj.betTimelineBegin = v1
        })
        $scope.$watch("dateTest.endTime", function (v1, v2) {
            $scope.searchObj.betTimelineEnd = v1;

        })
        $scope.$watch(
            "paginationConf.currentPage + paginationConf.itemsPerPage",
            GetAllEmployee
        );
        //请求类别接口
        function getGbpList(platform) {
            var post = {
                platform: platform
            }
            return new Promise(function (resolve, reject) {
                orderService.getGbpList(post).then(function (res) {
                    if (res.status === 200) {
                        resolve(res.data.data)
                    } else {
                        popupSvc.smallBox('fail', res.data.msg)
                    }
                })
            })
        }

        $scope.intervalId = 0;
        //页面刷新
        $scope.$watch('searchObj.refreshTime', function (v1, v2) {
            console.log(v1);
            if (!v1) {
                return;
            }
            if (v1 === '2') {
                console.log(v1, "v1 ==12345")
                clearInterval($scope.intervalId);
                $scope.intervalId = null;
                return;
            }
            $scope.comminTime = v1;
            console.log($scope.comminTime, '$scope.comminTimev1')
            $scope.intervalId = setInterval(function () {
                $scope.search();
            }, v1 * 1000);
        })
        $scope.resetAddData = function (addForm) {
            $scope.operationPwd = ""
            addForm.$setPristine();
        }

        $('.tab-auto-cent').scroll(function () {
            $('.tab-auto-header').css({
                "transform": "translateX(-" + $(this).scrollLeft() + "px)"
            });
            $('.tab-fixed-cent  form').css({
                "transform": "translateY(-" + $(this).scrollTop() + "px)"
            })
        });
        $scope.opeModal = function(str){
            $(str).modal('show')
        }
        //判断如果跳页面则要清空该方法。
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $scope.intervalId = null;
            clearInterval($scope.intervalId);
            $scope.comminTime = '2'
            // console.log('toState.name:', toState.name)
            // console.log('toParams:', toParams)
            // console.log('$state.current.name:', $state.current.name)
        });
    })