import './Letters.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  toast,
  ToastContainer,
} from 'react-toastify';
import {useNavigate} from "react-router-dom"
import {useSearchParams} from 'react-router-dom';
import { addScore } from '../../../../API';

import Swal from 'sweetalert2';

import Background from '../../../Background/Background';
// import 'bootstrap/dist/css/bootstrap.css';
import Popup from '../../VSGame/Popup/Popup';
import Timer from "./Timer"

function Letters(){
// const notify = () => toast.success('اجابة صحيحة', {
// position: "bottom-left",
// autoClose: 2000,
// hideProgressBar: true,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "colored",
// });
const error = ()=> toast.error('اجابة خاطئة', {
position: "bottom-right",
autoClose: 2000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
});
const navigate = useNavigate();

const [currentLetter, setCurrentLetter] = useState('');
const [count, setCount] = useState(0);
const [responseTime, setResponseTime] = useState(0);
const [correctCount, setCorrectCount] = useState(0);
const [incorrectCount, setIncorrectCount] = useState(0);
const [oneAns , setOneAns] = useState(0)
const [openPopup, setOpenPopup] = useState(false);
const [TotalResponseTime , setTotalResponseTime]= useState(0);
const [searchParams,setSearchParams] = useSearchParams();
const query = searchParams.get("serial_number");
const query2 = searchParams.get("assessment_id");




const [startTimer , setStartTimer] = useState(true);
const [Time , setTime]= useState(0);

useEffect(() => {
  if(startTimer){
    const timerId = setInterval(() => {
      setTime(t => t + 1)
    }, 1000);
   return () => clearInterval(timerId)
  }
}, [ startTimer ] )
//===============================================
const [minutes, setMinutes] = useState(14);
const [seconds, setSeconds] = useState(0);
const [milliseconds, setMilliseconds] = useState(0);
const [isRunning, setIsRunning] = useState(true);

const [showEndScreen, setShowEndScreen] = useState({
  show: false,
  // message: 
  //======================================
});

useEffect(() => {
  let interval;
  if (isRunning) {
    interval = setInterval(() => {
      if (milliseconds > 0) {
        setMilliseconds((milliseconds) => milliseconds - 1);
      } else if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
        setMilliseconds(99);
      } else if (minutes > 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
        setMilliseconds(99);
      } 
    }, 10);
  }

  if (minutes === 0 && seconds === 0 && milliseconds === 1) {
    setShowEndScreen({ ...showEndScreen, show: true });
    CalculateScore ();
  }
  return () => clearInterval(interval);
}, [milliseconds, seconds, minutes, , showEndScreen.show]);
const changeSeconds = (e) => {
  setSeconds(e.target.value);
};
const changeMinutes = (e) => {
  setMinutes(e.target.value);
};

//==================================================
useEffect(() => {
    const interval = setInterval(() => {
      const letters= ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","هـ","و","ي","X","X","X","X","X"];
      const letter = letters[Math.floor(Math.random() * 33)]; // generate a random letter from A to Z

      // const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // generate a random letter from A to Z
    setCurrentLetter(letter);
    console.log(letter);
    setOneAns(1);
  }, 1500); // show each letter for 1.5 seconds
  return () => clearInterval(interval);
}, []);

const handleResponse = (Letter) => {
  if (Time > 1092){
    CalculateScore ();
    //1092
    Swal.fire({
      title: "!ممتاز ",
      text: "أنهيت الاختبار بنجاح",
      icon: "success",
      confirmButtonColor: "#2E7105",
      confirmButtonText: "حسنا",
      width: "400px",
      showConfirmButton:true,
  }).then(() => {
  // Reload the page to restart the game
  //  window.location.reload();
  // navigate("/Done")
})
    //  setOpenPopup(true); /////////////// Finish Game
    
  } 
  
 
  const responseDelay = (Time%1.5) ;
  setTotalResponseTime(TotalResponseTime+responseDelay)
  if (  ( Letter !== 'X') && oneAns === 1) {
    setCorrectCount(correctCount + 1);
    // notify()
    console.log('Correct! Response time:', responseDelay);
  } else {
    if (  Letter === 'X' && oneAns === 1) {
    setIncorrectCount(incorrectCount + 1);
    error()
    console.log('Incorrect. Response time:', responseDelay);
    }
  }
  setOneAns(0);
}
async function CalculateScore (){
  const requestBody = {
    serial_number: query,
    assessment_id: query2,
    type: 'attention',
    attention: [
      { total_time: ConsumedTime, total_score: averageResponseTime, score_64: correctCount,time_64: notTarget }
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
   err_alert();
   //TODO: show an error alert here 
  }
  var numOfLetters = Math.floor(Time / 1.5) ;
  var Target = correctCount ;
  var notTarget = incorrectCount ;
  var numOfnotTarget = numOfLetters - (Target+notTarget) ;
  var averageResponseTime = TotalResponseTime/(Target+notTarget)+" ثوانٍ ";
  var hour = Math.floor((Time / 60 )/ 60);
  var min = Math.floor((Time / 60)- (hour*60)) ;
  var sec = Math.floor(Time - (min*60)) ;
  var ConsumedTime = hour + ':' + min + ':' + sec ;
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
// const handleKeyPress = (event) => {
//   if (event.key === 'j') {
//     handleResponse(target);
//   } else if (event.key === 'f') {
//     handleResponse(!target);
//   }
// }

// const handleButtonClick = (isTarget) => {
//   handleResponse(Letter);
// }

return (
  <>  
    <ToastContainer position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      />        
  <div className="container5">
    <div className="row mt-5">
      <div className="col-12 text-center">
      <br/><br/>
        <h1 className='letter'>{currentLetter}</h1>
        <br/><br/> <br/><br/> <br/><br/> <br/><br/>
        <button className='btntcpt ' onClick={()=>handleResponse(currentLetter)}>هدف</button>
      </div>
    </div>
    <div 
    className='time-card '
    >
      {/* <h1 className='timer'>  */}
     <Timer
        milliseconds={milliseconds}
        seconds={seconds}
        minutes={minutes}
        // hours={hours}
        // changeSeconds={changeSeconds}
        // changeMinutes={changeMinutes}
        // changeHours={changeHours}
      />
      {/* الوقت <br/> {(Time / 60).toFixed(0) } : {(Time - ((Time / 60)*60)).toFixed(0)} */}
      {/* </h1>  */}
    </div>
    {showEndScreen.show && (
        <h1 className="title text-light">
         {/* {showEndScreen.message} */}
        </h1>
    )}
    {/* <Background/> */}
    {/* <Popup
      title={"انتهى التقييم" }
      // children = {"النقاط : "+ Score}
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >      
    </Popup> */}
  </div>
  </>
);
}
export default Letters