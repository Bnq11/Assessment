import './ReadyS.css';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Background from '../../../Background/Background';
import Videopopup from '../../../Videopopup';
import demo from './CPT.mp4';
import { useSearchParams,useNavigate } from 'react-router-dom';


function ReadyS(){
    const [openPopup, setOpenPopup] = useState(false);
    const[cardin , setcardin]= useState(true);
    const [card1,setCard1] = useState(false)
    const [card2,setCard2] = useState(false)
    const [card3,setCard3] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("serial_number");
    const query2 = searchParams.get("assessment_id");
    const navigate = useNavigate();
   
    function handleOpen(){
        setOpenPopup(true)
    }

    function handleClose(){
        setOpenPopup(false)
    } 
    const handleClick = () => {
        const sid = `?serial_number=${query}&assessment_id=${query2}`
        navigate(`/Letters${sid}`)
    }
    return (

        <div className="" style={{height:'100vh'}}>

<h1 className='title'>  </h1> 

<div className="" style={{height:'80%',display:"flex"}}>
{cardin &&    <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
    <h3 className='tips-header'> 
    <br/><br/>
    !في هذه اللعبة، مهمتك بسيطة
<br/>خلال اللعبة سيعرض عليك مجموعة من الاحرف الابجدية
<br/>
X  بالإضافة على علامة </h3>
<div className="containerinf">
   
    
 </div>
 <div className='space w-100'>
    <button className='btntrvs m-0' onClick={()=>{setCard1(true);
   setcardin(() => false);}}>
        {'< '} التالي</button>
    {/* <button className='btntrvs m-0' onClick={()=>{setCard1(true);
   setcardin(() => false);}}>
        {'> '} السابق</button> */}
</div>
    </div>}
    {card1 &&
    <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
    <h3 className='tips-header'> 
    <br/>  <br/>  
    
    X  اضغط على زر "هدف"، إذا كان المعروض أي حرف غير علامة 
     <br/> 
     ."لا تضغط زر"هدف X  إذا ظهرت علامة 
     <br/>   
     انتظر حتى تختفي ويظهر حرف أخر
     <br/>  <br/>  
    </h3>
    {/* <button className='btntrvs m-0' onClick={()=>{setCard2(true);setCard1(false)}}>  {'< '} التالي</button> */}
    <div className='button-justifyer'>
    {/* <Link to="/Letters" className="btnt">ابدأ</Link> */}
    <div onClick={() => handleClick()} className="btnt"> ابدأ</div>
    <button className="btnt2" onClick={handleOpen}>مشاهدة تجربة</button>
    <button className='btntrvs m-0' onClick={()=>{setCard1(false);
   setcardin(() => true);}}>
       السابق  {'>'}</button>
</div>
    </div>
    }
  
</div>



<Videopopup
    title={"انتهى التقييم" }
    children= {
    <video autoPlay loop controls width="640" height="480" style={{zIndex:1,borderRadius:"25px"}}>
        <source src={demo} type='video/webm' ></source>
    </video>}
    openPopup={openPopup}
    handleClose={handleClose}
/> 



        {/* <Background/> */}
        <ul className="circlesAtt" style={{ height:"100%" }}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> 
    </div>
)





}export default ReadyS