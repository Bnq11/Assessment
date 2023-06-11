import './Cards.css';

import React, {
  useEffect,
  useState,
} from 'react';
import {useNavigate} from "react-router-dom"

import Swal from 'sweetalert2';

import Card from '../Card/Card';
import CardF from '../CardF/CardF';
import Popup from '../Popup/Popup';
import {useSearchParams} from 'react-router-dom';
import { addScore } from '../../../../API';

function Cards(props){
    const [items] = useState([
            { id: 1, img: '/img/1bb.png', stat: "" },
            { id: 2, img: '/img/1bc.png', stat: "" },
            { id: 3, img: '/img/1bs.png', stat: "" },
            { id: 4, img: '/img/1bt.png', stat: "" },
            { id: 5, img: '/img/1gb.png', stat: "" },
            { id: 6, img: '/img/1gc.png', stat: "" },
            { id: 7, img: '/img/1gs.png', stat: "" },
            { id: 8, img: '/img/1gt.png', stat: "" },
            { id: 9, img: '/img/1rb.png', stat: "" },
            { id: 10, img: '/img/1rc.png', stat: "" },
            { id: 11, img: '/img/1rs.png', stat: "" },
            { id: 12, img: '/img/1rt.png', stat: "" },
            { id: 13, img: '/img/1yb.png', stat: "" },
            { id: 14, img: '/img/1yc.png', stat: "" },
            { id: 15, img: '/img/1ys.png', stat: "" },
            { id: 16, img: '/img/1yt.png', stat: "" },
            { id: 17, img: '/img/2bb.png', stat: "" },
            { id: 18, img: '/img/2bc.png', stat: "" },
            { id: 19, img: '/img/2bs.png', stat: "" },
            { id: 20, img: '/img/2bt.png', stat: "" },
            { id: 21, img: '/img/2gb.png', stat: "" },
            { id: 22, img: '/img/2gc.png', stat: "" },
            { id: 23, img: '/img/2gs.png', stat: "" },
            { id: 24, img: '/img/2gt.png', stat: "" },
            { id: 25, img: '/img/2rb.png', stat: "" },
            { id: 26, img: '/img/2rc.png', stat: "" },
            { id: 27, img: '/img/2rs.png', stat: "" },
            { id: 28, img: '/img/2rt.png', stat: "" },
            { id: 29, img: '/img/2yb.png', stat: "" },
            { id: 30, img: '/img/2yc.png', stat: "" },
            { id: 31, img: '/img/2ys.png', stat: "" },
            { id: 32, img: '/img/2yt.png', stat: "" },
            { id: 33, img: '/img/3bb.png', stat: "" },
            { id: 34, img: '/img/3bc.png', stat: "" },
            { id: 35, img: '/img/3bs.png', stat: "" },
            { id: 36, img: '/img/3bt.png', stat: "" },
            { id: 37, img: '/img/3gb.png', stat: "" },
            { id: 38, img: '/img/3gc.png', stat: "" },
            { id: 39, img: '/img/3gs.png', stat: "" },
            { id: 40, img: '/img/3gt.png', stat: "" },
            { id: 41, img: '/img/3rb.png', stat: "" },
            { id: 42, img: '/img/3rc.png', stat: "" },
            { id: 43, img: '/img/3rs.png', stat: "" },
            { id: 44, img: '/img/3rt.png', stat: "" },
            { id: 45, img: '/img/3yb.png', stat: "" },
            { id: 46, img: '/img/3yc.png', stat: "" },
            { id: 47, img: '/img/3ys.png', stat: "" },
            { id: 48, img: '/img/3yt.png', stat: "" },
            { id: 49, img: '/img/4bb.png', stat: "" },
            { id: 50, img: '/img/4bc.png', stat: "" },
            { id: 51, img: '/img/4bs.png', stat: "" },
            { id: 52, img: '/img/4bt.png', stat: "" },
            { id: 53, img: '/img/4gb.png', stat: "" },
            { id: 54, img: '/img/4gc.png', stat: "" },
            { id: 55, img: '/img/4gs.png', stat: "" },
            { id: 56, img: '/img/4gt.png', stat: "" },
            { id: 57, img: '/img/4rb.png', stat: "" },
            { id: 58, img: '/img/4rc.png', stat: "" },
            { id: 59, img: '/img/4rs.png', stat: "" },
            { id: 60, img: '/img/4rt.png', stat: "" },
            { id: 61, img: '/img/4yb.png', stat: "" },
            { id: 62, img: '/img/4yc.png', stat: "" },
            { id: 63, img: '/img/4ys.png', stat: "" },
            { id: 64, img: '/img/4yt.png', stat: "" },
            { id: 1, img: '/img/1bb.png', stat: "" },
            { id: 2, img: '/img/1bc.png', stat: "" },
            { id: 3, img: '/img/1bs.png', stat: "" },
            { id: 4, img: '/img/1bt.png', stat: "" },
            { id: 5, img: '/img/1gb.png', stat: "" },
            { id: 6, img: '/img/1gc.png', stat: "" },
            { id: 7, img: '/img/1gs.png', stat: "" },
            { id: 8, img: '/img/1gt.png', stat: "" },
            { id: 9, img: '/img/1rb.png', stat: "" },
            { id: 10, img: '/img/1rc.png', stat: "" },
            { id: 11, img: '/img/1rs.png', stat: "" },
            { id: 12, img: '/img/1rt.png', stat: "" },
            { id: 13, img: '/img/1yb.png', stat: "" },
            { id: 14, img: '/img/1yc.png', stat: "" },
            { id: 15, img: '/img/1ys.png', stat: "" },
            { id: 16, img: '/img/1yt.png', stat: "" },
            { id: 17, img: '/img/2bb.png', stat: "" },
            { id: 18, img: '/img/2bc.png', stat: "" },
            { id: 19, img: '/img/2bs.png', stat: "" },
            { id: 20, img: '/img/2bt.png', stat: "" },
            { id: 21, img: '/img/2gb.png', stat: "" },
            { id: 22, img: '/img/2gc.png', stat: "" },
            { id: 23, img: '/img/2gs.png', stat: "" },
            { id: 24, img: '/img/2gt.png', stat: "" },
            { id: 25, img: '/img/2rb.png', stat: "" },
            { id: 26, img: '/img/2rc.png', stat: "" },
            { id: 27, img: '/img/2rs.png', stat: "" },
            { id: 28, img: '/img/2rt.png', stat: "" },
            { id: 29, img: '/img/2yb.png', stat: "" },
            { id: 30, img: '/img/2yc.png', stat: "" },
            { id: 31, img: '/img/2ys.png', stat: "" },
            { id: 32, img: '/img/2yt.png', stat: "" },
            { id: 33, img: '/img/3bb.png', stat: "" },
            { id: 34, img: '/img/3bc.png', stat: "" },
            { id: 35, img: '/img/3bs.png', stat: "" },
            { id: 36, img: '/img/3bt.png', stat: "" },
            { id: 37, img: '/img/3gb.png', stat: "" },
            { id: 38, img: '/img/3gc.png', stat: "" },
            { id: 39, img: '/img/3gs.png', stat: "" },
            { id: 40, img: '/img/3gt.png', stat: "" },
            { id: 41, img: '/img/3rb.png', stat: "" },
            { id: 42, img: '/img/3rc.png', stat: "" },
            { id: 43, img: '/img/3rs.png', stat: "" },
            { id: 44, img: '/img/3rt.png', stat: "" },
            { id: 45, img: '/img/3yb.png', stat: "" },
            { id: 46, img: '/img/3yc.png', stat: "" },
            { id: 47, img: '/img/3ys.png', stat: "" },
            { id: 48, img: '/img/3yt.png', stat: "" },
            { id: 49, img: '/img/4bb.png', stat: "" },
            { id: 50, img: '/img/4bc.png', stat: "" },
            { id: 51, img: '/img/4bs.png', stat: "" },
            { id: 52, img: '/img/4bt.png', stat: "" },
            { id: 53, img: '/img/4gb.png', stat: "" },
            { id: 54, img: '/img/4gc.png', stat: "" },
            { id: 55, img: '/img/4gs.png', stat: "" },
            { id: 56, img: '/img/4gt.png', stat: "" },
            { id: 57, img: '/img/4rb.png', stat: "" },
            { id: 58, img: '/img/4rc.png', stat: "" },
            { id: 59, img: '/img/4rs.png', stat: "" },
            { id: 60, img: '/img/4rt.png', stat: "" },
            { id: 61, img: '/img/4yb.png', stat: "" },
            { id: 62, img: '/img/4yc.png', stat: "" },
            { id: 63, img: '/img/4ys.png', stat: "" },
            { id: 64, img: '/img/4yt.png', stat: "" },
        ].sort(() => Math.random() - 0.5))
        const navigate = useNavigate();

        const [cards] = useState([
        { id: 1, img: '/img/1rt.png', stat:"active" },
        { id: 2, img: '/img/2gs.png',  stat:"active"},
        { id: 3, img: '/img/3yb.png',  stat:"active"},
        { id: 4, img: '/img/4bc.png',  stat:"active"},
    ]);
    const [starts] = useState([
        { id: 1, img:  '/img/1bb.png',stat:"active" },
        
    ]);
   
  
    const [openPopupT, setOpenPopupT] = useState(false);
    const [openPopupF, setOpenPopupF] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [isStarted, setisStarted] = useState(true);
    const [Category , setCategory ] = useState(Math.floor(Math.floor((Math.random()*3)+1)));
    const [Count , setCount] =  useState(1);
    const [num, setnum] = useState(0);
    const [Score , setScore] = useState(0);
    const [WCST64 , setWCST64] = useState(0);
    const [startTimer , setStartTimer] = useState(props);
    const [Time , setTime]= useState(0);
    const [ConsumedTime , setConsumedTime]= useState(0);
    const [TotalTime , setTotalTime]= useState(0);
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("serial_number");
    const query2 = searchParams.get("assessment_id");
    
   
    useEffect(() => {
        if(startTimer){
          const timerId = setInterval(() => {
            setTime(t => t + 1)
          }, 1000);
         return () => clearInterval(timerId)
        }
      }, [ startTimer ] )

function handleClick(id){
setisStarted (false);
  if(num < 128 ) { 
   
    if( Count%10 === 0 ){
        setCategory( Math.floor((Math.random()*3)+1));
      }
      setCount( Count + 1); 
      console.log(Category , Count , num);


if (Category === 1){ // 1: Number / (1-16)==1 / (17-32)==2 / (33-48)==3 / (49-64)==4
//First
if (Count ===1){
    if(cards[id].id === 1 ){
  Correct();
    }else {
        Wrong();
    }
}
    // All ------------------------------------------------------
if(cards[id].id === 1 && items[num].id <=16 ){
Correct();
}else {
if(cards[id].id === 2 && items[num].id > 16 && items[num].id <= 32 ){
Correct();
}else {
    if(cards[id].id === 3 && items[num].id > 32 && items[num].id <= 48 ){
  Correct();
                if ( num < 63 ){
                    setWCST64(WCST64+1)
                }
    }  else{  if(cards[id].id === 4 && items[num].id > 48 && items[num].id <= 64 ){
  Correct();
    } else{
        Wrong();
    }
    }
}}
}else{
    if (Category === 2){ // 2: Color // red == 1 // green ==2 // yallow == 3 // blue == 4
   //First
        if (Count ===1){
            if(cards[id].id === 4 ){
             Correct();
            }else {
                Wrong();
            }
        }

// All ------------------------------------------------------

if(cards[id].id === 1 && ( ( items[num].id >= 9 && items[num].id <= 12) ||
 ( items[num].id >= 25 && items[num].id <= 28)|| ( items[num].id >= 41 && items[num].id <= 44)||
  ( items[num].id >= 57 && items[num].id <= 60)) ){
Correct();
}else {
if(cards[id].id === 2 &&  ( ( items[num].id >= 5 && items[num].id <= 8) ||
 ( items[num].id >= 21 && items[num].id <= 24)|| ( items[num].id >= 37 && items[num].id <= 40)||
  ( items[num].id >= 53 && items[num].id <= 56)) ){
Correct();
}else {
    if(cards[id].id === 3 &&  ( ( items[num].id >= 13 && items[num].id <= 16) || 
    ( items[num].id >= 29 && items[num].id <= 32)|| ( items[num].id >= 45 && items[num].id <= 48)||
     ( items[num].id >= 61 && items[num].id <= 64)) ){
  Correct();
    }  else{  if(cards[id].id === 4 && ( items[num].id <= 4 || ( items[num].id >= 17 && items[num].id <= 20)||
         ( items[num].id >= 33 && items[num].id <= 36)|| ( items[num].id >= 49 && items[num].id <= 52)) ){
  Correct();
    } else{
        Wrong();
    }

    }
}}

}
else {
    if (Category === 3){ // 3: Shape
    //First
    if (Count ===1){
        if(cards[id].id === 3 ){
         Correct();
        }else {
            Wrong();
        }
    } 
    // All ------------------------------------------------------

if(cards[id].id === 1 && ( ( items[num].id === 4 || items[num].id === 8 || 
    items[num].id === 12|| items[num].id === 16|| items[num].id === 20||
    items[num].id === 24|| items[num].id === 28|| items[num].id === 32|| 
     items[num].id === 36|| items[num].id === 40|| items[num].id === 44|| 
     items[num].id === 48|| items[num].id === 52|| items[num].id === 56|| 
     items[num].id === 60|| items[num].id === 64 ) )){
Correct();
}else {
if(cards[id].id === 2 &&  ( ( items[num].id === 3 || items[num].id === 7 || 
    items[num].id === 11|| items[num].id === 15|| items[num].id === 19||
     items[num].id === 23|| items[num].id === 27|| items[num].id === 31|| 
     items[num].id === 35|| items[num].id === 39|| items[num].id === 43|| 
     items[num].id === 47|| items[num].id === 51|| items[num].id === 55|| 
     items[num].id === 59|| items[num].id === 63 ) ) ){
Correct();
}else {
    if(cards[id].id === 3 &&  (  ( items[num].id === 1 || items[num].id === 5 || 
        items[num].id === 9|| items[num].id === 13|| items[num].id === 17||
         items[num].id === 21|| items[num].id === 25|| items[num].id === 29|| 
         items[num].id === 33|| items[num].id === 37|| items[num].id === 41|| 
         items[num].id === 45|| items[num].id === 49|| items[num].id === 53|| 
         items[num].id === 57|| items[num].id === 61) ) ){
  Correct();
               
    }  else{  if(cards[id].id === 4 && ( ( items[num].id === 2 || items[num].id === 6 || 
        items[num].id === 10|| items[num].id === 14|| items[num].id === 18||
         items[num].id === 22|| items[num].id === 26|| items[num].id === 30|| 
         items[num].id === 34|| items[num].id === 38|| items[num].id === 42|| 
         items[num].id === 46|| items[num].id === 50|| items[num].id === 54|| 
         items[num].id === 58|| items[num].id === 62 ) ) ){
  Correct();
    } else{
        Wrong();
    }

    }
}}

}
}
}

if ( num < 127 ){
        items[num].stat="";
        items[num+1].stat = "active";
        setnum(num+1);
        console.log(items);
        if (num === 63 ){
            CalculateScore();}
   
   } else {if (num === 127 ){
    CalculateScore();
    // setOpenPopup(true);
    setStartTimer(false);
    Swal.fire({
        title: "!ممتاز ",
        text: "أنهيت الاختبار بنجاح",
        icon: "success",
        confirmButtonColor: "#32437c",
        confirmButtonText: "حسنا",
        width: "400px",
        showConfirmButton:true,
    }).then(() => {
    // Reload the page to restart the game
    //  window.location.reload();
    // navigate("/Done")
    }); 
   }}
}else {
    // Swal.fire({
    //     title: "!ممتاز ",
    //     text: "أنهيت الاختبار بنجاح",
    //     icon: "success",
    //     confirmButtonColor: "#32437c",
    //     confirmButtonText: "حسنا",
    //     width: "400px",
    //     showConfirmButton:true,
    // }).then(() => {
    // // Reload the page to restart the game
    //  window.location.reload();
    // }); // final score
   }     
}
async function CalculateScore (){
   
    if ( num < 65 ){
    // Correct cards %
     setWCST64((WCST64/64) * 100);
     // Time taken to perform the test.
     var hour = Math.floor((Time / 60 )/ 60);
     var min = Math.floor((Time / 60)- (hour*60)) ;
     var sec = Math.floor(Time - (min*60)) ;
     setConsumedTime (hour + ':' + min + ':' + sec );
     console.log("========",WCST64,ConsumedTime)
    }else{
     // Correct cards %
    setScore(Math.floor((Score/128) * 100 ));
    var ScoreI = Math.floor((Score/128) * 100);
     // Time taken to perform the test.
     var hour = Math.floor((Time / 60 )/ 60);
     var min = Math.floor((Time / 60)- (hour*60)) ;
     var sec = Math.floor(Time - (min*60)) ;
     setTotalTime (hour + ':' + min + ':' + sec );
     var TotalTimeI = hour + ':' + min + ':' + sec;
     console.log("========",WCST64,ConsumedTime,ScoreI,TotalTimeI)

     const requestBody = {
      serial_number: query,
      assessment_id: query2,
      type: 'attention',
      attention: [
        { total_time: TotalTimeI, total_score: ScoreI, score_64: WCST64,time_64:ConsumedTime }
      ]
    };
    try{
      const res = await addScore(requestBody)
  
      if(res.status ===200){
        console.log('success')
        navigate("/Done")
        //TODO: navigate to last page here 
  
      }
    }
    catch(e){
     console.log(e)
    //  err_alert();
     //TODO: show an error alert here 
    }
  }
 
}
function err_alert() {
    return Swal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'حدث خطأ، الرجاء المحاولة مرة أخرى',
      confirmButtonColor: "BLUE",
      confirmButtonText: "حسناً",
      width: "Swidth",
      iconColor: "RED"
    })
  }
function Correct(){
    // setTimeout(()=>{
    //     setOpenPopupT(false);
    //    },2000);
    //    setOpenPopupT(true);
    //    setScore(Score + 1);
       if ( num < 63 ){
           setWCST64(WCST64+1)
       }
        setScore(Score + 1);
        Swal.fire({
        title: "!ممتاز ",
        text: "اختيار صحيح",
        icon: "success",
        confirmButtonColor: "#2E7105",
        confirmButtonText: "حسنا",
        width: "400px",
        showConfirmButton:true,
    })
}
function Wrong(){
    // setTimeout(()=>{
    //     setOpenPopupF(false);
    //    },2000);
    //    setOpenPopupF(true);
    Swal.fire({
        title: "!حاول مرة اخرة ",
        text: "اختيار خاطى",
        icon: 'error',
        confirmButtonColor: "#2E7105",
        confirmButtonText: "حسنا",
        width: "400px",
        showConfirmButton:true,
    })
}

    return (
        
       <div className=''>
       <div className="containers">
       {/* <div className='ProgressBar'>
         <Line percent={num*0.78} />
         </div>  */}
          <div className="progressbar">
        <div className="progressbar">
        <div className="progressbar__label">{Math.floor((num*0.78))}%</div>
        <progress className="progressbar__fillvs" value={num} max={128} />
    </div>
      </div>
       {isStarted && starts.map((start, index) => (
                 <CardF key={index} item={start} id={index} />))}

        { items.map((item, index) => (
                  <CardF key={index} item={item} id={index}  />
              )) } 
              </div>
              <br/>   <br/>
              <br/>   <br/>
        <div className="container">

        { cards.map((card, index) => (
                 <Card key={index} item={card} id={index} handleClick={handleClick} />
             )) }
             <Popup
                title="صحيح"
                openPopup={openPopupT}
                setOpenPopup={setOpenPopupT}
            >      
            </Popup>
            <Popup
                title="خطأ"
                openPopup={openPopupF}
                setOpenPopup={setOpenPopupF}
            >      
            </Popup>
            <Popup
                title={"انتهى التقييم" }
                children = {"النقاط : "+ Score +' الوقت :' + ConsumedTime }
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >      
            </Popup>
             </div>
             
             </div>
   
     )
 }
 
 export default Cards