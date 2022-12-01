window.onload = function () {
    if (document.getElementById("tabList")){
        tabListChange(0,"tabList")
    }
    if (document.getElementById("tabListOut")){
        tabListOutChange(0,"tabListOut")
    }

    //当前路径超出省略号
    if (document.getElementById("path_overflow")){
        pathOverflowInit();
    }

    //轮播图
    // const carouselDoms = document.getElementsByClassName("carousel-seamless")
    // if (carouselDoms.length!==0){
    //     for (let i = 0 ; i < carouselDoms.length ; i ++){
    //         carouselSeamless({dom:carouselDoms[i],offset:'center'});
    //     }
    // }
}
function tabListChange(index,id) {
    let dom = document.getElementById(id);
    for (let i = 0 ; i < dom.children[0].children.length; i ++){
        dom.children[0].children[i].classList.remove("active");
    }
    dom.children[0].children[index].classList.add("active")
    let text = dom.children[0].children[index].children[1].innerHTML;
    dom.children[1].children[0].innerHTML = text;
}
function tabListOutChange(index,id) {
    let dom = document.getElementById(id);
    for (let i = 0 ; i < dom.children[0].children.length; i ++){
        dom.children[0].children[i].classList.remove("active");
        dom.children[1].children[i].classList.remove("active");
    }
    dom.children[0].children[index].classList.add("active");
    dom.children[1].children[index].classList.add("active");
}
function dropDownClick(dom) {
    let parent = dom.parentNode;
    if (parent.className.indexOf("active")!== -1){
        parent.classList.remove("active");
    }else{
        parent.classList.add("active");
    }
}
//当前路径超出省略号显示
function pathOverflowInit() {
    let dom = document.getElementById("path_overflow")
    let widthParent = dom.clientWidth;
    let width = 0;
    let title = "";
    let able = true;
    let lastIndex = null;
    for (let i = 0 ; i < dom.children.length ; i++){
        let currentWidth = dom.children[i].offsetWidth;
        if ((width + currentWidth) < widthParent){
            width += currentWidth
        }else{
            title += dom.children[i].innerText;
            if (able) {
                width = 9999;
                dom.children[i].innerText = "...";
                dom.children[i].style.color = "#2191cf";
                lastIndex = i
                able = false;
            }else{
                dom.children[i].innerText = "";
            }
        }
    }
    if (!able){
        dom.children[lastIndex].setAttribute("title",title);
    }
}

function carouselSeamless(option) {
    if (option.dom.className.indexOf("init")===-1){
        //初始化
        let able = true;
        let index = 1;
        const imgsUL = option.dom.children[0].children[0];
        const imgs = imgsUL.children;
        const ulWidth = imgsUL.clientWidth;
        const imgOuterWidth = parseInt(getComputedStyle(imgs[0]).marginLeft) + parseInt(getComputedStyle(imgs[0]).marginRight) + imgs[0].clientWidth;
        let marginLeft = 0;
        let offsetWidth = 0;
        //如果判定这个元素处于display-none状态，则暂先挂起，以后再初始化
        if (ulWidth !== 0){option.dom.classList.add("init")}
        //克隆第一个和最后一个，以实现无缝效果
        // let [first1,first2] = imgs;
        // let [,,last1,last2] = imgs;
        const first1 = imgs[0];
        const first2 = imgs[1];
        const last1 = imgs[imgs.length-2];
        const last2 = imgs[imgs.length-1];
        imgsUL.appendChild(first1.cloneNode(true));
        imgsUL.appendChild(first2.cloneNode(true));
        imgsUL.insertBefore(last1.cloneNode(true),first1);
        imgsUL.insertBefore(last2.cloneNode(true),first1);
        if (option.offset === "center"){
            offsetWidth = ulWidth/2 -imgOuterWidth*1.5;
            imgsUL.style.marginLeft = offsetWidth - imgOuterWidth + 'px';
        }else if(option.offset === "left"){
            offsetWidth = 0;
        }else if (option.offset === "single"){
            offsetWidth = 0;
        }
        setInterval(function () {
            if (able){
                carouselDo(true);
            }
            },option.speed||3000)

        function carouselDo(next) {
            next?index+=1:index-=1;

            let transitionFlag = true;
            // imgsUL.classList.remove("reset")
            // console.log("*",index,imgs.length,index > imgs.length-4)
            if (index > imgs.length-4){index = 0;transitionFlag = false}
            else if (index < 1){index = imgs.length -3;transitionFlag = false}
            // console.log(index)
            if (transitionFlag) {
                imgsUL.style.marginLeft = offsetWidth - index*imgOuterWidth + "px";
            }else{
                imgsUL.classList.add("reset");
                imgsUL.style.marginLeft = offsetWidth - index*imgOuterWidth + "px";
                setTimeout(function () {
                    imgsUL.classList.remove("reset");
                    next?index+=1:index-=1;
                    imgsUL.style.marginLeft = offsetWidth - index*imgOuterWidth + "px";
                },0)

            }
        }

        //添加点击事件
        option.dom.addEventListener("mouseenter",function () {
            able = false;
        })
        option.dom.addEventListener("mouseleave",function () {
            able = true;
        })
        const btnPrev = option.dom.children[1].children[0];
        const btnNext = option.dom.children[1].children[1];
        btnPrev.addEventListener("click",function (event) {
            carouselDo(false);
        })
        btnNext.addEventListener("click",function (event) {
            carouselDo(true)
        })
    }
}

// review页面侧边菜单超出5条隐藏
function hideMenu() {
    let number = document.getElementsByClassName("menu-list");
    if (number.length > 5){
        number[4].style.borderBottom = "none";
        for (let i = 5; i < number.length; i++){
            number[i].style.display = 'none';
        }
    }
}
// review页面侧边菜单展示更多
function showMore() {
    let number = document.getElementsByClassName("menu-list");
    if (number.length > 5){
        number[4].style.borderBottom = "1px solid #b2c4d7";
        for (let i = 5; i < number.length; i++){
            number[i].style.display = 'block';
        }
    }
    document.getElementById("showMore").style.display = "none";
}
