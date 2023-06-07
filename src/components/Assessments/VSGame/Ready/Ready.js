import './Ready.css';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';


import Background from '../../../Background/Background';
import Videopopup from '../../../Videopopup';
import demo from './VSGame.mp4';
import Card from '../Card/Card';
import { useSearchParams,useNavigate } from 'react-router-dom';


function Ready(){
    const [openPopup, setOpenPopup] = useState(false);
    function handleOpen(){
        setOpenPopup(true)
    }
    const[cardin , setcardin]= useState(true);
    const [card1,setCard1] = useState(false)
    const [card2,setCard2] = useState(false)
    const [card3,setCard3] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("serial_number");
    const query2 = searchParams.get("assessment_id");
    const navigate = useNavigate();

    
    function handleClose(){
        setOpenPopup(false)
    } 
    const [cards] = useState([
        { id: 1, img: '/img/1rt.png', stat:"active" },
        { id: 2, img: '/img/2gs.png',  stat:"active"},
        { id: 3, img: '/img/3yb.png',  stat:"active"},
        { id: 4, img: '/img/4bc.png',  stat:"active"},
    ]);

    const handleClick = () => {
        const sid = `?serial_number=${query}&assessment_id=${query2}`
        navigate(`/Cards${sid}`)
    }
    return (        
        <div className="" style={{height:'100vh'}}>
            <h1 className='title'>  </h1> 
            <div className="" style={{height:'80%',display:"flex"}}>
            {cardin &&    <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
                <h3 className='tips-header'> 
                !في هذه اللعبة، مهمتك بسيطة <br/>
                خلال هذه اللعبة سنعرض عليك بطاقة وعليك تصنيفها <br/>
                :الى أحد مجموعات البطاقات المعروضة </h3>
            <div className="containerinf">
                { cards.map((card, index) => ( <Card key={index} item={card} id={index}/>  )) }  
             </div>
             <div className='space w-100'>
                <button className='btntrvs m-0' onClick={()=>{setCard1(true); setcardin(() => false);}}> {'< '} التالي</button>
            </div>
                </div>}
                {card1 &&
                <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
                <h3 className='tips-header'> 
                <br/>  <br/> اذا فرزت البطاقة بشكل صحيح، سيظهر كلمة "صحيح". اذا فرزتها بشكل خاطئ سيظهر "خاطئ"
                عليك الحصول على أكبر عدد ممكن من الفرز الصحيح <br/><br/><br/>  
                </h3>
                <div className='button-justifyer'>
                <div onClick={() => handleClick()} className="btnt"> ابدأ</div>
                <button className="btnt2" onClick={handleOpen}>مشاهدة تجربة</button>
                <button className='btntrvs m-0' onClick={()=>{setCard1(false); setcardin(() => true);}}>السابق {' >'}</button>
            </div>
                </div>
                }
            </div>
            <Videopopup
                title={"انتهى التقييم" }
                children= { <video autoPlay loop controls width="640" height="480" style={{zIndex:1,borderRadius:"25px"}}>
                    <source src={demo} type='video/webm' ></source></video>}
                openPopup={openPopup}
                handleClose={handleClose}
            /> 
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

}export default Ready