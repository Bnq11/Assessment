import "./CardF.css";
import React from "react";
function CardF({item, id}){
    if (item.stat === 'active'){
    return (
       <div className={"cardF"} >
            <img src={item.img} alt="" />
        </div>
    )}
    return(
        <div></div>
    )
}export default CardF
