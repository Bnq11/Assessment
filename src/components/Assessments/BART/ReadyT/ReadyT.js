import './ReadyT.css';

// import 'react-html5video/dist/styles.css';
import React, { useState } from 'react';

// import { DefaultPlayer as Video } from 'react-html5video/dist';
import { useSearchParams,useNavigate } from 'react-router-dom';

import Background from '../../../Background/Background';
import Videopopup from '../../../Videopopup';
import demo from './BART.MP4';


function ReadyT(){
    const [openPopup, setOpenPopup] = useState(false);
    const [card1,setCard1] = useState(false)
    const [card2,setCard2] = useState(false)
    const [card3,setCard3] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("serial_number");
    const query2 = searchParams.get("assessment_id");
    const navigate = useNavigate();
    const[cardin , setcardin]= useState(true);


    function handleOpen(){
        setOpenPopup(true)
    }

    function handleClose(){
        setOpenPopup(false)
    } 
const handleClick = () => {
        const sid = `?serial_number=${query}&assessment_id=${query2}`
        navigate(`/Balloons${sid}`)
    }
    return (
        <div className="" style={{height:'100vh'}}>

        <h1 className='title'>  </h1> 
        
        <div className="" style={{height:'80%',display:"flex"}}>
        {cardin &&    <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
            <h3 className='tips-header'> 
            <br/><br/>
            !في هذه اللعبة، مهمتك بسيطة
        <br/>
        "خلال اللعبة سيعرض عليك بالون، وبإمكانك الضغط على زر "زيادة الحجم
        <br/>
          . لزيادة حجم البالون
        <br/>
    </h3>
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
           {card1&& <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
           <h3 className='tips-header'> 
            <br/>  <br/>  
            
            عند كل ضغطة على زر "زيادة الحجم"، ستحصل على ٥ ريالات
             <br/> 
             لكل بالون حد معين من الزيادة، يجب عليك التوقف قبل أن ينفجر البالون
             <br/>   
             .إذا انفجر البالون، ستخسر كل المال الذي جمعته
             <br/>  <br/>  
            </h3>
        <div className="containerinf">
           
            
         </div>
         <div className='space w-100'>
            <button className='btntrvs m-0' onClick={()=>{setCard2(true);
           setCard1(() => false);}}>
                {'< '} التالي</button>
            <button className='btntrvs m-0' onClick={()=>{setcardin(true);
           setCard1(() => false);}}>
                السابق{' > '} </button>
        </div>
            </div>}
            {card2 &&
            <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
            <h3 className='tips-header'> 
            <br/>  <br/>  
            
            .للتوقف وجمع المال، اضغط على "جمع". سيضاف مبلغ الجولة الى المبلغ الكلي
             <br/>   

             <br/>  <br/>  <br/>  
            </h3>
            {/* <button className='btntrvs m-0' onClick={()=>{setCard2(true);setCard1(false)}}>  {'< '} التالي</button> */}
            <div className='button-justifyer'>
            <div onClick={() => handleClick()} className="btnt"> ابدأ</div>
            <button className="btnt2" onClick={handleOpen}> مشاهدة تجربة</button>
            <button className='btntrvs m-0' onClick={()=>{setCard2(false);
           setCard1(() => true);}}>
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

            <div className='button-justifyer'>
                <div onClick={() => handleClick()} className="btnt"> ابدأ</div>
                <button className="btnt2" onClick={handleOpen}>فيديو توضيحى</button>
            </div>

   
             {/* <Background height="100%"/> */}
            <ul className="circlesRisk" style={{ height:"100%" }}>
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


}export default ReadyT
