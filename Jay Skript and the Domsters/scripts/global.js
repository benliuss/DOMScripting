function addLoadEvent(func) {
    var oldonload=window.onload;
    if(typeof window.onload!='function') {
        window.onload = func;
    }else{
        window.onload=function () {
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement) {
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addClass(element,value) {
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}


//突出显示当前页面
function highlightPage() {
    if(!document.getElementsByTagName) return false;
    var headers=document.getElementsByTagName("header");
    if(headers.length==0) return false;
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    //遍历nav a，匹配window.location.href，设置a的className和当前body的id
    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);


function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById||!document.getElementById(elementID)) return false;
    //xpos,ypos与final_x,final_y比较，增减一次值
    var elem=document.getElementById(elementID);
    if(elem.movement){//检测并复位
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    var dist=0;
    if(xpos==final_x && ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if(xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if(ypos>final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    //赋值
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    //循环调用
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}


//鼠标在p a上，图像移动
function prepareSlideshow() {
    //创建div，img
    if(!document.getElementsByTagName||!document.getElementById||!document.getElementById("intro")) return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    var preview=document.createElement("img");
    slideshow.setAttribute("id","slideshow");
    preview.setAttribute("src","images/slideshow.png");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    //遍历a，调用moveElement
    var links=intro.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function () {
            destination=this.getAttribute("href");
            if(destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1) {
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1) {
                moveElement("preview",-600,0,5);
            }
            if(destination.indexOf("photos.html")!=-1) {
                moveElement("preview",-800,0,5);
            }
            if(destination.indexOf("contact.html")!=-1) {
                moveElement("preview",-1195,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);
//鼠标在nav a上，图像移动
function huajimove() {
    if(!document.getElementsByTagName) return false;
    var header=document.getElementsByTagName("header");
    var headerlinks=header[0].getElementsByTagName("a");
    headerlinks[0].onmouseover=function () {
        moveElement("huaji",-120,120,10);
    }
    headerlinks[1].onmouseover=function () {
        moveElement("huaji",120,45,10);
    }
    headerlinks[2].onmouseover=function () {
        moveElement("huaji",320,100,10);
    }
    headerlinks[3].onmouseover=function () {
        moveElement("huaji",450,0,10);
    }
    headerlinks[4].onmouseover=function () {
        moveElement("huaji",600,70,10);
    }
}
addLoadEvent(huajimove);


//图片库
function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    //创建placeholder和p元素
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/gallery.png");
    placeholder.setAttribute("alt","my image gallery");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var desctext=document.createTextNode("Choose an image");
    description.appendChild(desctext);
    //插入到列表后面
    var gallery=document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}

function prepareGallery() {
    if(!document.getElementById) return false;
    if(!document.getElementsByName) return false;
    if(!document.getElementById("imagegallery")) return false;
    //创建onclick事件
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function () {
            return showPic(this);
        }

    }
}

function showPic(whichpic) {
    if(!document.getElementById("placeholder")) return false;
    if(!document.getElementById("imagegallery")) return false;
    //变更placeholder的src
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    //变更p的nodeValue
    if(whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    }else{
        var text="";
    }
    var description=document.getElementById("description");
    if(description.firstChild.nodeType==3){
        description.firstChild.nodeValue=text;
    }
    return false;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);


//内部导航
function prepareInternalnav() {
    if(!document.getElementsByTagName||!document.getElementById) return false;
    //取得a中href的#后字符串
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;

        document.getElementById(sectionId).style.display="none";

        //为links[i]创造destination属性，保存局部变量sectionID
        links[i].destination=sectionId;
        //调用onclick
        links[i].onclick=function () {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);
//遍历section，比较id,设置display
function showSection(id) {
    var sections=document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id")!=id){
            sections[i].style.display="none";
        }else{
            sections[i].style.display="block";
        }
    }
}


//live列表
function displayAbbreviations() {
    if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
    //遍历abbr，赋值给defs
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;//检测IE
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //遍历defs，创建定义列表
    var dlist=document.createElement("dl");
    for(key in defs){
        var definition=defs[key];
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    //插入文档
    if(dlist.childNodes.length<1) return false;//检测IE
    var header=document.createElement("h3");
    var header_text=document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}
addLoadEvent(displayAbbreviations);

function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows=document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function () {
            addClass(this,"highlight");
        }
        rows[i].onmouseout=function () {
            this.className=this.oldClassName;
        }
    }
}
addLoadEvent(highlightRows);

function stripeTables() {
    if(!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        //遍历rows，反复设置odd，改变样式
        for(var j=0;j<rows.length;j++){
            if(odd==true){
                addClass(rows[j],"odd");
                odd=false;
            }else{
                odd=true;
            }
        }
    }
}
addLoadEvent(stripeTables);


//表单
//点击label元素，获得焦点
function focusLabels() {
    if(!document.getElementsByTagName) return false;
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length,i++;) {
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick=function () {
            var id=this.getAttribute("for");
            if(!document.getElementById("for")) return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}
addLoadEvent(focusLabels);
//将placeholder值作为字段
function resetFields(whichform) {
    if(Modernizr.input.placeholder) return;
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit") continue;
        var check=element.placeholder||element.getAttribute("placeholder");
        if(!check) continue;
        //定义onfocus事件
        element.onfocus=function () {
            var text=this.placeholder||this.getAttribute("placeholder");
            if(this.velue==text){
                this.className="";
                this.value="";
            }
        }
        //定义onblur事件
        element.onblur=function () {
            if(this.value==""){
                this.className="placeholder";
                this.value=this.placeholder||this.getAttribute("placeholder");
            }
        }
        //定义onblur事件之后，调用之
        element.onblur();
    }
}
function prepareForms() {
    for(var i=0;i<document.forms.length;i++){
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit=function () {
            return validateForm(this);
        }
    }
}
addLoadEvent(prepareForms);
function validateForm(whichform) {
    for(var i=0;i<whichform.elements.length,i++;) {
        var element = whichform.elements[i];
        if (element.required == "required") {
            if (!isFilled(element)) {
                alert("Pleasefill in the " + element.name + "field.")
                return false;
            }
        }
    }
}
