var $oul=$('.ulBox'),
    $listBox=$('.listBox');


/*
* 实现  轮播图
* */
function bannerFn() {
    var mySwiper=new Swiper('.bannerBox',{
        autoplay:{
            //用户操作后，仍然自动播放
            disableOnInteraction:false,
            //一个图  在当前窗口的停留时间
            delay:3000,
            // autoplay:false
        },
        loop:true,//是否无缝滚动
        pagination: {//分页器
            el: '.swiper-pagination',//分页器的盒子
            type: 'fraction',//分页器的类型  分数类型
            currentClass:'currentPage',//变动数字的盒子的类名
            totalClass:'totalPage'//总共数字盒子的类名
            //type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },

    })
}

/*
* 获取数据
* */
// $.ajax({
//     type:'post',//请求方式
//     url:'./data/banner.json',//请求路径
//     data:{t:123,q:234},
//     success:function (data) {
//     //    请求成功后执行的函数
//         console.log(data);
//         giveHtml(data);//把数据放到页面
//     },
//     error:function () {
//         //    请求失败后执行的函数
//         console.log('请求失败');
//     }
// });
//把数据转成页面可见的元素
function giveHtml(data) {
    data=data||[];
    var str='';//存储拼接好的解构字符串
    data.forEach((item)=>{
        str+=`  <li class="swiper-slide">
                    <a href="##">
                        <img src="${item.img}" alt="">
                        <div>${item.title}</div>
                    </a>
                </li>`;

    })
    $oul.html(str);
    // bannerFn();

}
//先请求数据  再把数据放到页面上  再执行轮播图函数


//promise  写法
var p=new Promise(function (resolve,reject) {
    $.ajax({
        type:'get',
        url:'./data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
p.then(function (data) {
//    第一个参数是promise执行成功函数
//     console.log(data);
giveHtml(data);
return data;
},function () {
//    第二个函数promise执行失败的函数
}).then(function (data) {
    // console.log(data);
    bannerFn();
},function () {

});

/*
* 新闻列表部分
* */
var listPro=new Promise(function (resolve,reject) {
    $.ajax({
        type:'post',
        url:'./data/list.json',
        data:{t:1},
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
//把数据放到列表中
function giveList(data) {
    data=data||[];
    var str='';

    data.forEach((item,index)=>{
       switch (item.type){
           //第一种  无图解构
           case 0:
               str+=`<a href="##">
            <div class="textBox">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
               break;
           //    第二种  一张图
           case 1:
               str+=`<a href="##">
            <div class="img_Box">

                <img src="${item.img}" alt="">
            </div>
            <div class="textBox">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
               break;
       //        第三种   三张图
           case 3:
               str+=` <a href="##">
            <div class="img_Box">

                <img src="https://k.sinaimg.cn/n/default/transform/266/w640h426/20180901/691q-hinpmnr2819175.jpg/w200h134f1t10l50q90c55.jpg" alt="">
            </div>
            <div class="textBox">
                <p>这是文字title</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">12</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>
        <!--三张图-->
        <a class="three_box" href="##">

            <p>${item.title}}</p>
            <div class="three_pic">
                <div>
                    <img src="${item.img[0]}" alt="">
                </div>
               <div>
                   <img src="${item.img[1]}" alt="">
               </div>
                <div>
                    <img src="${item.img[2]}" alt="">
                </div>

            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
               break;

       }

    });
    $listBox.html(str);

}
listPro.then(function (data) {
    giveList(data);
},function () {

});
