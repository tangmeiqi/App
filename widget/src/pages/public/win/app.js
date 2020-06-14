import 'assets/css/sm.min.css';

import { fixStatusBar, getHeight } from 'public/public';
window.apiready = function() {
    var header = document.getElementById('header');
    var content = document.getElementById('content');
    fixStatusBar(header);
    var data = api.pageParam;
    var url = data.url;
    var title = data.title;
    document.getElementById('title').innerHTML = title;
    var pageload = 0;
    if (api.systemType == "ios") {
        api.openFrame({
            name: 'frame',
            url: url,
            rect: {
                x: 0,
                y: getHeight('header'),
                w: 'auto',
                h: 'auto'
            },
            pageParam: data,
            bounces: false,
            vScrollBarEnabled: true,
            hScrollBarEnabled: true
        });
    } else {
        //viewappear事件在ios中首次打开不会调用，在安卓使用以避免切换时加载frame造成卡顿。
        api.addEventListener({
            name: 'viewappear'
        }, function(ret, err) {
            if (pageload < 1) {
                api.openFrame({
                    name: 'frame',
                    url: url,
                    rect: {
                        x: 0,
                        y: getHeight('header'),
                        w: 'auto',
                        h: 'auto'
                    },
                    pageParam: data,
                    bounces: false,
                    vScrollBarEnabled: true,
                    hScrollBarEnabled: true
                });
            }
            pageload++;
        });
    }

    // document.getElementById('back').addEventListener('tap', function() {
    //     api.closeWin();
    // });
    api.addEventListener({
		name: 'keyback'
	}, function(ret, err){
		api.toast({
			msg: '在次点击返回键退出APP',
			duration:2000,
			location: 'bottom'
		});

		api.addEventListener({
			name: 'keyback'
		}, function(ret, err){
			$api.setStorage("gesture",false);
			api.closeWidget({
			id: 'A6061873897289', //这里需要修改为自己的应用ID
			retData: {name:'closeWidget'},
			silent:true
			});
		});

		setTimeout(function(){
			exitApp();
		},3000)
	});
}