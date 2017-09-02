function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById||!document.getElementById(elementID)) return false;
    //xpos,ypos与final_x,final_y比较，增减一次值
    var elem=document.getElementById(elementID);
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if(xpos==final_x && ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        xpos++;
    }
    if(xpos>final_x){
        xpos--
    }
    if(ypos<final_y){
        ypos++;
    }
    if(ypos>final_y){
        ypos--;
    }
    //赋值
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    //循环调用
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement=setTimeout(repeat,interval);
}
