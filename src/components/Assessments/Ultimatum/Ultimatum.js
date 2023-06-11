import 'react-toastify/dist/ReactToastify.css';
import './Ultimatum.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from 'react-bootstrap';
import Fade from 'react-reveal';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import Background from '../../Background/Background';
import Videopopup from '../../Videopopup';
import demo from './ult.mp4';
import moneybagImage from './moneybag.png';
import Done from './../Done';
import {useNavigate} from "react-router-dom"
import { addScore } from '../../../API';
import {useSearchParams} from 'react-router-dom';


function Ultimatum() {
  const [scenarios, setScenarios] = useState([]);
  const [cash, setCash] = useState(0);
  const [count, setCount] = useState(-1);
  const [Start, setStart] = useState(false);
  const [accept, setAccept] = useState(0);
  const [reject, setReject] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["rgba(255, 255, 255, 0.75)", "rgb(200,200,219, 0.75)"];
    const [openPopup, setOpenPopup] = useState(false);
    const [card1,setCard1] = useState(false)
    const [card2,setCard2] = useState(false)
    const [card3,setCard3] = useState(false)
    const navigate = useNavigate();
    const [report, setReport] = useState('');
    const [info, setInfo] = useState('');
    const[cardin , setcardin]= useState(true);
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("serial_number");
    const query2 = searchParams.get("assessment_id");

    function handleOpen(){
        setOpenPopup(true)
    }

    function handleClose(){
        setOpenPopup(false)
    } 
    const handleClick1 = () => {
      const sid = `?serial_number=${query}&assessment_id=${query2}`
      navigate(`/Ultimatum${sid}`)
  }

  function handleButtonClicksuccess(totalAmount) {
    Swal.fire({
    title: '!مبروك',
    text:  `لقد ربحت ${totalAmount} ريال`,
    imageUrl: moneybagImage,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Custom image',
    background: '#dadada', // Set the background to a semi-transparent black color
    confirmButtonColor: "#89760F",
    confirmButtonText: "تم",  
  })
  }

  function handleButtonClickfailure(totalAmount) {
    Swal.fire({
    title: '!حظ أوفر',
    text:  `لقد خسرت ${totalAmount} ريال`,
    background: '#dadada',
    confirmButtonColor: "#89760F",
    confirmButtonText: "تم",  
    }) 
  }

  function generateProposal(fairness) {
    const minAmount = 100; // minimum offer amount
    const maxAmount = 4000; // maximum offer amount
    const range = (maxAmount - minAmount) * (fairness / 10); // range of offer amounts based on fairness
    const offerAmount = minAmount + Math.floor(Math.random() * range); // generate random offer amount within range
    const proposerSplit = fairness / 10; // percentage of offer amount that the proposer will receive if the offer is accepted
    const proposerAmount = Math.floor(offerAmount * proposerSplit); // calculate proposer split amount
    const recipientAmount = offerAmount - proposerAmount; 

    const splitAmount = proposerAmount;
    const totalAmount = proposerAmount;
    const Info='\n'+"المبلغ المعروض: "+ offerAmount +"\n المبلغ الحاصل عليه: "+proposerAmount+"\n المبلغ المعطى: "+ recipientAmount;
    const description = (
        <div class="message-container">
          <div class="message">
            <div class="offer-amount margintopbottom">
                <span class="label">المبلغ المعروض</span>
                <span class="value">{offerAmount}</span>
                <span class="label">ريال</span>
            </div>
            <Fade >
            {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_KaGQcx3h4i.json"  background="transparent"  speed="1"  style={{ width: '100%', height: '250px' }}  loop  autoplay></lottie-player> */}
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_LkON0pK1XM.json"  background="transparent"  speed="0.4"  style={{ width: '100%', height: '250px' }}  loop  autoplay></lottie-player>
          </Fade>
            <div class="total-amount margintopbottom">
              <span class="label">ستحصل على</span>
              <span class="value">{proposerAmount}</span>
              <span class="label">ريال</span>
            </div>
            <div class="split-amount margintopbottom">
              <span class="label">سيحصل محمد على</span>
              <span class="value">{recipientAmount}</span>
              <span class="label">ريال</span>
            </div>
          </div>
        </div>
    );

    return { offerAmount, splitAmount, description, totalAmount , Info};
  }

  function generateScenarios(numScenarios) {
    const newScenarios = [];

    for (let i = 0; i < numScenarios; i++) {
      const fairness = Math.abs((Math.floor(Math.random() * 11+1))); // generate random fairness between 0 and 10
      const proposal = generateProposal(fairness); // generate proposal based on fairness
      const id = i + 1; // generate unique identifier

      newScenarios.push({ id, fairness, ...proposal }); // add scenario to array
    }

    setScenarios(newScenarios); // update state with new scenarios
  }

  function getScenario() {
    console.log(scenarios[count]);//print current object
    const currentScenario = scenarios[count];
    const TotalAmount = currentScenario ? currentScenario.totalAmount : 0;
    return scenarios[count]?.description;
  }

  function handleStartClick() {
    setStart(true);
    setCount(0);
    setTotalAmount(0)
  }

  function handleClick(action ,nextvalue) {
    if (action === 1) {
      setStart(true);
      setCash((prevCash) => prevCash + scenarios[count]?.totalAmount);
      setTotalAmount()
      setAccept((prevAccept) => prevAccept + 1);
      setReport(report+'\n المحاولة'+(count+1)+": تم قبولها"+scenarios[count]?.Info)
      console.log("accept",accept);
      console.log(report);
      handleButtonClicksuccess(scenarios[count]?.totalAmount,)
    }else{
        setReject((prevReject) => prevReject + 1);
        setReport(report+'\n المحاولة'+(count+1)+": تم رفضها"+scenarios[count]?.Info)
        console.log("reject",reject);
        console.log(report);
        handleButtonClickfailure(scenarios[count]?.totalAmount)
        console.log(nextvalue)
    }
    setCount((prevCount) => prevCount + 1);
  }

  
  function done_alert() {
    Swal.fire({
      title: "!ممتاز ",
      text: "أنهيت الاختبار بنجاح",
      icon: "success",
      confirmButtonColor: "#89760F",
      confirmButtonText: "حسنا",
      width: "400px",
    }).then(() => {
      // Reload the page to restart the game
      // window.location.reload();
      // navigate("/Done")
    });
  }
  // Check the count value after every update
  useEffect(() => {
    if (count === 10) {
      CalculateScore ();
      done_alert();
    }
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      generateScenarios(10);
      setCash(0);
    }
  }, [count]);

useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex === 0 ? 1 : 0)); // Toggle between 0 and 1
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  async function CalculateScore (){
    var FinalReport = report;
  
    const requestBody = {
      serial_number: query,
      assessment_id: query2,
      type: 'decisionMaking',
      decisionMaking: [
        { cash: "NA", gain: "NA", loss: "NA", report: FinalReport }
      ]
    };
  
    console.log("305",requestBody)
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
  return Start === false ? (
    <div className="" style={{height:'100vh'}}>

    <h1 className='title'>  </h1> 
    
    <div className="" style={{height:'80%',display:"flex"}}>
    {cardin &&    <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
        <h3 className='tips-header'> 
        <br/><br/>
        !في هذه اللعبة، مهمتك بسيطة
    <br/>
    خلال هذه اللعبة سيعرض عليك عرض لكسب مال
    <br/>
    مبلغ المال سيكون مقسومًا لك ولطرف اخر اسمه محمد
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
      
        {card1 &&
        <div style={{height:"fit-content"}} className='headersandbutton my-auto'>
        <h3 className='tips-header'> 
        <br/>  <br/>  
        اذا كنت تعتقد عن القسمة صحيحة وعادلة اضغط قبول، اذا كنت تعتقد انها غير عادلة اضغط رفض
         <br/>   
    
         <br/>  <br/>  <br/>  
        </h3>
        {/* <button className='btntrvs m-0' onClick={()=>{setCard2(true);setCard1(false)}}>  {'< '} التالي</button> */}
        <div className='button-justifyer'>
        {/* <Link to="/Ultimatum" className="btnt">ابدأ</Link> */}
    
        <div onClick={() =>{ handleClick1(); handleStartClick()}} className="btnt"> ابدأ</div>

        <button className="btnt2" onClick={handleOpen}>مشاهدة تجربة </button>
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
        
   
            <Background height="100%"/>
        </div>
  ) : (
    <Container fluid className="first-container">
      <ul class="circles">
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
      {/* First section */}
      <div className="progressbar">
        <div className="progressbar">
          <div className="progressbar__label">{Math.floor((count / 10) * 100)}%</div>
        <progress className="progressbar__filluli" value={count} max={10} />
    </div>
      </div>
      <ToastContainer />
      {/* second section */}
      <Fade right>
        <div className="amount">
          <div className="icon-cash">
          <div className="cash1"  style={{ backgroundColor: "whait", }}>
            <h1 className="cash-name">مجموع الربح الان</h1>
            <h1 className="cash-name">:</h1>
            <h1 className="cash-amount">
              {" "}
              {cash}{" "}
            </h1>
            <h1 className="cash-name"> ريال </h1>
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_it8yjgkh.json"  background="transparent"  speed="1"  style={{ width: '100px', height: '80px' }} autoplay></lottie-player>
            {/* <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_pk0smbuq.json"  background="transparent"  speed="1"  style={{ width: '100px', height: '80px' }}  loop  autoplay></lottie-player> */}
            </div>
          </div>
        </div>
      </Fade>

      {/* third section */}
      <div className="alert">
      <div className="hand-card reject" onClick={() => handleClick(0,scenarios[count+1])}>
        <Fade left key={count}>
          {/* <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_L5FmEqdLn6.json"  background="transparent"  speed="0.7"  style={{ width: '150px', height: '150px', margin:'auto' }}  loop autoplay></lottie-player> */}
          <lottie-player key={count} src="https://assets10.lottiefiles.com/packages/lf20_j3yti031.json"  background="transparent"  speed="0.3"  style={{ width: '170px', height: '170px', margin:'auto' }}     autoplay></lottie-player>
          <h1 className="marginbottom">رفض</h1>
        </Fade>
      </div>
        <div className="alert-body">
            <Fade up key={count}>
              <div className="alert-message">
                <h1 className="scenario">{getScenario()}</h1>
              </div>
            </Fade>
        </div>
        <div className="hand-card accept" onClick={() => handleClick(1,scenarios[count+1])}>
          <Fade right key={count}>
            {/* <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_Vs49OV.json"  background="transparent"  speed="0.7"  style={{ width: '150px', height: '150px',margin:'auto' }}  loop  autoplay></lottie-player> */}
            <lottie-player key={count} src="https://assets6.lottiefiles.com/packages/lf20_kenw4cok.json"  background="transparent"  speed="0.3"   style={{ width: '150px', height: '150px',margin:'auto' }} autoplay></lottie-player>
            <h1 className="marginbottom">قبول</h1>

          </Fade>
        </div>
      </div>

    </Container>
  );
}
export default Ultimatum;
