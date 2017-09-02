function displayAccesskeys() {
    if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
    //取得所有a中accesskey属性值和text
    var links=document.getElementsByTagName("a");
    var akeys=new Array();
    for(var i=0;i<links.length;i++){
        var current_link=links[i];
        if(!current_link.getAttribute("accesskey")) continue;
        var key=current_link.getAttribute("accesskey");
        var text=current_link.lastChild.nodeValue;
        //把属性添加到数组
        akeys[key]=text;
    }
    //遍历数组，创建列表
    var list=document.createElement("ul");
    for(key in akeys){
        var text=akeys[key];
        var str=key+":"+text;
        var item=document.createElement("li");
        var item_text=document.createTextNode(str);
        item.appendChild(item_text);
        list.appendChild(item);
    }
    //创建标题，插入文档
    var header=document.createElement("h3");
    var header_text=document.createTextNode("Accesskeys");
    header.appendChild(header_text);
    document.body.appendChild(header);
    document.body.appendChild(list);
}
addLoadEvent(displayAccesskeys);