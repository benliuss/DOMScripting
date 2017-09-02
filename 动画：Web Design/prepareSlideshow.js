function prepareSlideshow() {
    if(!document.getElementsByTagName||!document.getElementById||!document.getElementById("linklist")) return false;
    //创建div，img并插入文档
    var slideshow=document.createElement("div");
    var preview=document.createElement("img");
    slideshow.setAttribute("id","slideshow");
    preview.setAttribute("src","water.png");
    preview.setAttribute("alt","water");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    var list=document.getElementById("linklist");
    insertAfter(slideshow,list);
    //在a上调用moveElement
    var links=list.getElementsByTagName("a");
    links[0].onmouseover=function () {
        moveElement("preview",-356,0,10);
    }
    links[1].onmouseover=function () {
        moveElement("preview",-689,0,10);
    }
    links[2].onmouseover=function () {
        moveElement("preview",-1115,0,10);
    }
}
addLoadEvent(prepareSlideshow);