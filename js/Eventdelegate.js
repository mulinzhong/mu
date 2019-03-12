let text = document.querySelector("textarea");
let num = document.querySelector("#num");
let btn = document.querySelector(".leave .con .right ul li .box");
let inp = document.querySelector("input");
let uls = document.querySelector(".leave .con .left	 ul");
console.log(btn)
text.oninput = function() {
	num.innerHTML = this.value.length;
} /* 实时监测输入内容的长度 */
btn.onclick = function() {
	let name = inp.value;
	let con = text.value;
	console.log(name, con)
	/* 不为空时才可以提交 */
	if (name != "" && con != "") {
		let lis = document.createElement("li");
		lis.innerHTML =
			`<div class="yuan">
										<i class="iconfont icon-iconzhucetouxiang"></i>
									</div>
									<div class="title">
										<h6>${name}
											<span>2018-11-09 09:10:59</span>
										</h6>
										<p>${con}</p>
									</div>`;
		uls.appendChild(lis);

	} else {
		alert("你是大帅逼");
	}

	/* 清空右边内容 */
	inp.value = "";
	num.value = 0;
	text.value = "";

	/* li的选中效果 */
	uls.addEventListener("mouseover", function(e) {
		if (e.target.nodeName /* 识别标签 */ == "LI") {
			e.target.style.background = "#b0b0b0";
		}
	}, false)
	uls.addEventListener("mouseout", function(e) {
		if (e.target.nodeName /* 识别标签 */ == "LI") {
			e.target.style.background = "#fff";
		}
	}, false)
} /* 当点击提交按钮时，获取input中输入的标题和内容，动态的插入到左侧的留言区 */

