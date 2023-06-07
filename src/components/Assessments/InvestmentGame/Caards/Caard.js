import './caard.css';

function Caard({item, id, handleClick}){
    const itemClass = item.stat ? " active " + item.stat : ""
if (item.stat === ""){
    return (
        <div className={"caard active shadow"} onClick={() => handleClick(id)}>
            <img src='/img/back.png' className='card-adds' alt="" />
        </div>
    )
}
    else {
        return (
        <div className={"caard shadow" + itemClass} onClick={() => handleClick(id)}>
            <img src={item.img} className='card-adds' alt="" />
        </div>
    )
}
}

export default Caard