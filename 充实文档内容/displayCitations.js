function displayCitations() {
    if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
    //取得所有blockquote的cite属性
    var quotes=document.getElementsByTagName("blockquote");
    for(var i=0;i<quotes.length;i++){
        if(!quotes[i].getAttribute("cite")) continue;
        var url=quotes[i].getAttribute("cite");
        //取得blockquote的最后一个子元素
        var quoteChildren=quotes[i].getElementsByTagName("*");
        if(quoteChildren.length<1) continue;
        var elem=quoteChildren[quoteChildren.length-1];
        //创建标记
        var superscript=document.createElement("sup");
        var link=document.createElement("a");
        var link_text=document.createTextNode("source");
        superscript.appendChild(link);
        link.appendChild(link_text);
        link.setAttribute("href",url);
        elem.appendChild(superscript);
    }
}
addLoadEvent(displayCitations);

