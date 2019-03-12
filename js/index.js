/*
* @Author: WZX
* @Date:   2018-11-30 14:47:11
* @Last Modified by:   WZX
* @Last Modified time: 2018-12-18 15:11:56
*/
Banner_transform("header .pic .pic_l", "header .pic .dotbox .dot", "header .pic .leftbtn", "header .pic .rightbtn", "header");


let list = document.querySelectorAll("main .list");
let lbtn = document.querySelector("main .leftbtn");
let rbtn = document.querySelector("main .rightbtn");
let listbox = document.querySelector("main .listbox");

// 定义四下标,now1，now2，now3:当前页面下标,next:下一张页面下标
let now1 = 0;
let now2 = 1;
let now3 = 2;
let next = 3;
// 定义开关
let flag = true;
// 设置图片默认显示前三张

list.forEach(val => {
    val.style.left = 1095 + "px";
});
for (let i = 0; i < 3; i++) {
    list[i].style.left = 365 * i + "px";
}
// 自动轮播
let t = setInterval(move, 1000);

function move() {
    next = next === list.length - 1 ? 0 : ++next;
    list[now1].style.left = 0;
    list[now2].style.left = 365 + "px";
    list[now3].style.left = 730 + "px";
    list[next].style.left = 1095 + "px";
    animate(list[now1], {left: -365});
    animate(list[now2], {left: 0});
    animate(list[now3], {left: 365});
    animate(list[next], {left: 730}, () => {
    });
    now1 = now2;
    now2 = now3;
    now3 = next;
}

// 点击左箭头，出现上一张
lbtn.onclick = () => {
    if (!flag) {
        return;
    }
    flag = false;
    let newnext=now1;
    newnext = newnext === 0 ? list.length - 1 : --newnext;
    list[now1].style.left = 0;
    list[now2].style.left = 365 + "px";
    list[now3].style.left = 730 + "px";
    list[newnext].style.left = -365 + "px";
    animate(list[now1], {left: 365});
    animate(list[now2], {left: 730});
    animate(list[now3], {left: 1095});
    animate(list[newnext], {left: 0}, () => {
        flag = true;
    });
    now3=now2;
    now2=now1;
    now1=newnext;
    next=now3;
};
// 点击右箭头，出现下一张
rbtn.onclick = () => {
    if (!flag) {
        return;
    }
    flag = false;
    next = next === list.length - 1 ? 0 : ++next;
    list[now1].style.left = 0;
    list[now2].style.left = 365 + "px";
    list[now3].style.left = 730 + "px";
    list[next].style.left = 1095 + "px";
    animate(list[now1], {left: -365});
    animate(list[now2], {left: 0});
    animate(list[now3], {left: 365});
    animate(list[next], {left: 730}, () => {
        flag=true;
    });
    now1 = now2;
    now2 = now3;
    now3 = next;
};
// 鼠标移入时停止轮播
listbox.onmouseover = () => {
    clearInterval(t);
};
// 鼠标移出时继续轮播
listbox.onmouseout = () => {
    t = setInterval(move, 1000);
};
// 窗口失去焦点时停止轮播
listbox = () => {
    clearInterval(t);
};
// 窗口获得焦点时继续轮播
listbox = () => {
    t = setInterval(move, 1000);
};

let back=document.querySelector(".button");
back.onclick=()=>{
    animate(document.documentElement, {scrollTop: 0});
};
