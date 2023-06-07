import "./Card.css";
import React from "react";
function Card({item, id, handleClick}){
    if (item.stat === 'active'){
    return (
       <div className={"card"} onClick={() => handleClick(id)}>
            <img src={item.img} alt="" />
        </div>
    )}
    return(
        <div></div>
    )
}export default Card

