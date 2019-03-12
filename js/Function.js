// 透明度轮播图
// img:轮播图片
// dot:轮播点
// lbtn:左箭头
// rbtn:右箭头
// banner:轮播盒子
// active:轮播点选中效果类名
// time:自动轮播时间
function Banner_opacity(img, dot, lbtn, rbtn, banner, active = "active", time = 2000) {
    // 获取元素
    let imgs = document.querySelectorAll(img);
    let dots = document.querySelectorAll(dot);
    let leftbtn = document.querySelector(lbtn);
    let rightbtn = document.querySelector(rbtn);
    let ban = document.querySelector(banner);
    // 定义下标
    let num = 0;
    // 定义开关
    let flag = true;
    // 设置图片默认显示第一张
    imgs[0].style.opacity = 1;
    // 设置轮播点默认显示第一个
    dots[0].classList.add(active);
    // 自动轮播
    let t = setInterval(move, time);

    function move() {
        num = num === imgs.length - 1 ? 0 : ++num;
        imgs.forEach((val, index) => {
            val.style.opacity = 0;
            dots[index].classList.remove(active);
        });
        imgs[num].style.opacity = 1;
        dots[num].classList.add(active);
    }

    // 点击轮播点，会出现对应的图片
    dots.forEach((val, index) => {
        val.onclick = () => {
            num = index - 1;
            move();
        };
    });
    // 点击左箭头，出现上一张
    leftbtn.onclick = () => {
        if (!flag) {
            return;
        }
        flag = false;
        imgs[num].style.opacity = 0;
        dots[num].classList.remove(active);
        num = num === 0 ? imgs.length - 1 : --num;
        dots[num].classList.add(active);
        imgs[num].style.opacity = 1;
        setTimeout(() => {
            flag = true;
        }, 1000);
    };
    // 点击右箭头，出现下一张
    rightbtn.onclick = () => {
        if (!flag) {
            return;
        }
        flag = false;
        move();
        setTimeout(() => {
            flag = true;
        }, 1000);
    };
    //鼠标移入停止轮播
    ban.onmouseover = () => {
        clearInterval(t);
    };
    //鼠标移出继续轮播
    ban.onmouseout = () => {
        t = setInterval(move, time);
    };
    // 页面失去焦点时停止轮播
    onblur = () => {
        clearInterval(t);
    };
    // 页面获得焦点时继续轮播
    onfocus = () => {
        t = setInterval(move, time);
    };
}

// 双下标轮播图(左右平移）
// img:轮播图片
// dot:轮播点
// leftbtn:左箭头
// rightbtn:右箭头
// ban:轮播盒子
// active:轮播点选中效果类名
// time:自动轮播时间
function Banner_transform(img, dot, leftbtn, rightbtn, ban, active = "active", time = 2000) {
    // 获取元素
    let imgs = document.querySelectorAll(img);
    let dots = document.querySelectorAll(dot);
    let lbtn = document.querySelector(leftbtn);
    let rbtn = document.querySelector(rightbtn);
    let banner = document.querySelector(ban);
    // 获取轮播图的宽度
    let widths = parseInt(getComputedStyle(banner).width);
    // 定义双下标,now:当前页面下标,next:下一张页面下标
    let now = 0;
    let next = 0;
    // 定义开关
    let flag = true;
    // 设置图片默认显示第一张
    imgs.forEach(val => {
        val.style.left = widths + "px";
    });
    imgs[0].style.left = 0;
    // 设置轮播点默认显示第一个
    dots[0].classList.add(active);
    // 自动轮播
    let t = setInterval(move, time);

    function move() {
        next = next === imgs.length - 1 ? 0 : ++next;
        imgs[now].style.left = 0;
        imgs[next].style.left = widths + "px";
        animate(imgs[now], {left: -widths});
        animate(imgs[next], {left: 0}, () => {
            dots.forEach(val => {
                val.classList.remove(active);
            });
            dots[next].classList.add(active);
        });
        now = next;
    }

    // 点击轮播点，会出现对应的图片
    dots.forEach((val, index) => {
        val.onclick = () => {
            dots.forEach((val, index) => {
                imgs[index].style.left = widths + "px";
                val.classList.remove(active);
            });
            imgs[index].style.left = 0;
            val.classList.add(active);
            now = next = index;
        };
    });
    // 点击左箭头，出现上一张
    lbtn.onclick = () => {
        if (!flag) {
            return;
        }
        flag = false;
        next = next === 0 ? imgs.length - 1 : --next;
        imgs[now].style.left = 0;
        imgs[next].style.left = -widths + "px";
        animate(imgs[now], {left: widths});
        animate(imgs[next], {left: 0}, () => {
            dots.forEach(val => {
                val.classList.remove(active);
            });
            dots[next].classList.add(active);
            flag = true;
        });
        now = next;
    };
    // 点击右箭头，出现下一张
    rbtn.onclick = () => {
        if (!flag) {
            return;
        }
        flag = false;
        next = next === imgs.length - 1 ? 0 : ++next;
        imgs[now].style.left = 0;
        imgs[next].style.left = widths + "px";
        animate(imgs[now], {left: -widths});
        animate(imgs[next], {left: 0}, () => {
            dots.forEach(val => {
                val.classList.remove(active);
            });
            dots[next].classList.add(active);
            flag = true;
        });
        now = next;
    };
    // 鼠标移入时停止轮播
    banner.onmouseover = () => {
        clearInterval(t);
    };
    // 鼠标移出时继续轮播
    banner.onmouseout = () => {
        t = setInterval(move, time);
    };
    // 窗口失去焦点时停止轮播
    onblur = () => {
        clearInterval(t);
    };
    // 窗口获得焦点时继续轮播
    onfocus = () => {
        t = setInterval(move, time);
    };
}

// 选项卡
// select1:鼠标移入的元素
// select2:要显示的选项卡
function Tab_card(select1, select2) {
    let li = document.querySelectorAll(select1);
    let box = document.querySelectorAll(select2);
    // 鼠标移入select1，显示select2
    li.forEach((val, index) => {
        val.onmouseover = () => {
            box[index].style.display = "block";
        };
        val.onmouseout = () => {
            box[index].style.display = "none";
        };
    });
}

// 左右滑动列表
// leftbtn:左箭头
// rightbtn:右箭头
// con:列表元素
// page:页数
function List_slide(leftbtn, rightbtn, con, page = 3) {
    // 获取元素
    let lbtn = document.querySelector(leftbtn);
    let rbtn = document.querySelector(rightbtn);
    let cons = document.querySelector(con);
    // 计算一页宽度
    let widths = parseInt(getComputedStyle(cons, null).width) / page;
    // 定义下标
    let num = 0;
    // 定义箭头的默认样式
    lbtn.style.color = "#ccc";
    lbtn.style.cursor = "not-allowed";
    // 点击右箭头，向后翻页
    rbtn.onclick = () => {
        lbtn.style.color = "#666";
        lbtn.style.cursor = "pointer";
        num++;
        if (num >= page - 1) {
            num = page - 1;
            rbtn.style.color = "#ccc";
            rbtn.style.cursor = "not-allowed";
        }
        cons.style.transform = "translateX(-" + num * widths + "px)";
    };
    // 点击左箭头，向前翻页
    lbtn.onclick = () => {
        rbtn.style.color = "#666";
        rbtn.style.cursor = "pointer";
        num--;
        if (num <= 0) {
            num = 0;
            lbtn.style.color = "#ccc";
            lbtn.style.cursor = "not-allowed";
        }
        cons.style.transform = "translateX(-" + num * widths + "px)";
    };
}

// 遮盖
// select1:鼠标移入的元素
// select2:移入显示的遮盖元素
function Cover(select1, select2) {
    // 获取元素
    let box = document.querySelector(select1);
    let cover = document.querySelector(select2);
    // 鼠标移入，显示遮盖
    box.onmouseover = () => {
        cover.style.opacity = 1;
    };
    // 鼠标移出，隐藏遮盖
    box.onmouseout = () => {
        cover.style.opacity = 0;
    };
}

