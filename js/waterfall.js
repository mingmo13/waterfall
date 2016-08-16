window.onload=function(){
    waterfall('main','pin');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},]}
    window.onscroll=function(){
        if (checkscrollside()) {
            //将数据块渲染到当前页面尾部
            var oParent=document.getElementById('main');
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox=document.createElement('div');
                oBox.className='pin';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='box';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src='images/'+ dataInt.data[i].src ;
                oPic.appendChild(oImg);
            }
            waterfall('main','pin');
        }

    }
}

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent,pin){
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,pin);
    //计算列数
    var oBoxW=oBoxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽度
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;';
    var hArr=[];//存放每一列的高度
    for (var i = 0; i < oBoxs.length; i++) {
        if (i<cols) {
            hArr.push(oBoxs[i].offsetHeight);
        }
        else{
            var minH=Math.min.apply(null,hArr);
            var index=getminHIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            //oBoxs[i].style.left=oBoxW*index+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            //修改各列高度hArr
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}


function getByClass(parent,className){
    var boxArr=[];//用来存储所有class元素
    var oElement=parent.getElementsByTagName('*');
    for (var i = 0; i < oElement.length; i++) {
        if(oElement[i].className==className){
            boxArr.push(oElement[i]);
        }
    }
    return boxArr;
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,val){
    for(var i in arr)
    {
        if (arr[i]==val) {
            return i;
        }
    }
}

function checkscrollside(){
    //检测是否具备加载数据块的条件
    var oParent=document.getElementById('main');
    var oBox=getByClass(oParent,'pin');
    var lastBoxH=oBox[oBox.length-1].offsetTop;
    //创建【触发添加块框函数waterfall()】的高度：
    //最后一个块框的距离网页顶部(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    //注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastBoxH<scrollTop+documentH)?true:false;
    //到达指定高度后 返回true，触发waterfall()函数
}