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
        dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
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
