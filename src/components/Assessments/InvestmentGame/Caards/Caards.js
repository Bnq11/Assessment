import './caard.css';

import { useState } from 'react';

import Fade from 'react-reveal';
import Swal from 'sweetalert2';

import moneybagImage from '../../Ultimatum/moneybag.png';
import Popup from '../../VSGame/Popup/Popup';
import Caard from './Caard';
import {useNavigate} from "react-router-dom"
import { addScore } from '../../../../API';
import {useSearchParams} from 'react-router-dom';

function Caards(){

    const [items, setItems] = useState([
        { id: 1, img: '/img/Loss.png', stat: "" },
        { id: 2, img: '/img/smiley.png', stat: "" },
        { id: 3, img: '/img/smiley.png', stat: "" },
        { id: 4, img: '/img/smiley.png', stat: "" },
        { id: 5, img: '/img/smiley.png', stat: "" },
        { id: 6, img: '/img/smiley.png', stat: "" },
        { id: 7, img: '/img/smiley.png', stat: "" },
        { id: 8, img: '/img/smiley.png', stat: "" },
        { id: 9, img: '/img/smiley.png', stat: "" },
        { id: 10, img: '/img/smiley.png', stat: "" },
        { id: 11, img: '/img/smiley.png', stat: "" },
        { id: 12, img: '/img/smiley.png', stat: "" },
        { id: 13, img: '/img/smiley.png', stat: "" },
        { id: 14, img: '/img/smiley.png', stat: "" },
        { id: 15, img: '/img/smiley.png', stat: "" },
        { id: 16, img: '/img/smiley.png', stat: "" },
        { id: 17, img: '/img/smiley.png', stat: "" },
        { id: 18, img: '/img/smiley.png', stat: "" },
        { id: 19, img: '/img/smiley.png', stat: "" },
        { id: 20, img: '/img/smiley.png', stat: "" },
        { id: 21, img: '/img/smiley.png', stat: "" },
        { id: 22, img: '/img/smiley.png', stat: "" },
        { id: 23, img: '/img/smiley.png', stat: "" },
        { id: 24, img: '/img/smiley.png', stat: "" },
        { id: 25, img: '/img/smiley.png', stat: "" },
        { id: 26, img: '/img/smiley.png', stat: "" },
        { id: 27, img: '/img/smiley.png', stat: "" },
        { id: 28, img: '/img/smiley.png', stat: "" },
        { id: 29, img: '/img/smiley.png', stat: "" },
        { id: 30, img: '/img/smiley.png', stat: "" },
        { id: 31, img: '/img/smiley.png', stat: "" },
        { id: 32, img: '/img/smiley.png', stat: "" },
    ].sort(() => Math.random() - 0.5))

    const [num, setnum] = useState(1);
    const [Score, setScore] = useState(0);
    const [Total, setTotal] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [loss, setLoss] = useState(0);
    const [Risk, setRisk] = useState(0);
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("serial_number");
    const query2 = searchParams.get("assessment_id");


    function Update(){
     for (let index = 0; index < items.length; index++) {
        items[index].stat="";
     }
        setScore (0) 
        items.sort(() => Math.random() - 0.5);
        setItems([...items])
    }

    function handleClick(id){
        console.log( items[id].id )
        if ( items[id].id !== 1 &&  items[id].stat === ""){
        items[id].stat = "active"
            setItems([...items])
            setScore(Score + 10)}
         if ( items[id].id === 1)
         {
                    items[id].stat = "active"
                    setItems([...items])
                    setnum(num +1 );
                    handleButtonClickfailure(Score)
                    setLoss(loss+Score);
                    setTotal(Total - Score)
                    setRisk(Risk+1)
                    setTimeout(()=>{
                    Update();
                    if (num === 30)
                    {
                      CalculateScore ();
                      setOpenPopup(true)}
                    }, 3000)
                    setScore(0);
                }
    }
    function handleButtonClickfailure(totalAmount) {
      Swal.fire({
      title: '!حظ أوفر',
      text:  `لقد خسرت ${totalAmount} ريال`,
      background: '#dadada',
      confirmButtonColor: "#9F3D3D",
        confirmButtonText: "تم",  
      }) 
    }
function Clicked(){
        setTotal (Total + Score)
        setnum(num +1 );
        Swal.fire({
        title: '!مبروك',
        text:  `لقد ربحت ${Score} ريال`,
        imageUrl: moneybagImage,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#dadada', // Set the background to a semi-transparent black color
        confirmButtonColor: "#9F3D3D",
        confirmButtonText: "تم",  
      })
        Update();
        setScore(0);
        if (num === 30){
          CalculateScore ();
          Swal.fire({
            title: "!ممتاز ",
            text: "أنهيت الاختبار بنجاح",
            icon: "success",
            confirmButtonColor: "#9F3D3D",
            confirmButtonText: "حسنا",
            width: "400px",
            showConfirmButton:true,
          }).then(() => {
            // Reload the page to restart the game
            // window.location.reload();
            // navigate("/Done")
          });
  // }
        }
        // {setOpenPopup(true)}
}
async function CalculateScore (){
  var RiskRatio = ( Risk / 30 )*100 ;
  var gain = Total;
  var Loss = loss ;
  const requestBody = {
    serial_number: query,
    assessment_id: query2,
    type: 'risk',
    risk: [
      { risk_ratio: RiskRatio, gain: gain, loss: Loss }
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
//===========================================

    return (
       <div className='colorcover'>
        <div className="progressbar">
        <div className="progressbar">
          <div className="progressbar__label">{Math.floor(((num-1)*3.333))}%</div>
        <progress className="progressbar__fillubal" value={(num-1)} max={30} />
    </div>
      </div>


      <div className='cash-containerl shadow'>
        <div className='amount-containerc'>

        <div className="amount1">


          <div className="icon-cash">
          <div className="cash"  style={{ 
            // backgroundColor: colors[colorIndex], 
            transition: "background-color 1s ease-in-out" 
            }}>
            <h4 className="cash-name">مجموع الربح </h4>
            <h4 className="cash-name">:</h4>
            <h4 className="cash-amount">
              {" "}
              {Total}{" "}
            </h4>
            <h4 className="cash-name"> ريال </h4>
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_it8yjgkh.json"  background="transparent"  speed="1"  style={{ width: '100px', height: '60px' }} autoplay></lottie-player>
           </div>
          </div>
        </div>
        </div>
        </div>
        <div className='cash-container shadow'>
                <div className='amount-containerc'>
                  
                <div className="amount1">
                  <div className="icon-cash">
                  <div className="cash"  style={{ 
                    transition: "background-color 1s ease-in-out" 
                    }}>
                    <h4 className="cash-name">المجموع الحالي</h4>
                    <h4 className="cash-name">:</h4>
                    <h4 className="cash-amount">
                      {" "}
                      {Score}{" "}
                    </h4> 
                    <h6 className="cash-name"> ريال   <br/> </h6>
                    <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_it8yjgkh.json"  background="transparent"  speed="1"  style={{ width: '0px', height: '60px' }} autoplay></lottie-player>

                    </div>
                  </div>
                </div>
                
                </div>
        
              </div>


      <Fade left >
      <div className='button-justifyer50 '>
      <button className="btnco float-right" onClick={Clicked}> جمع </button>
      </div>
      </Fade>
       {/* <div className='progressBar'>
        <Line percent={num*3.333} />
        </div> 
        <div className="bar">
        <button className="button" onClick={Clicked}> <h3> جمع </h3></button>
        <div className='Score'><p> المجموع: {Total}</p>
        <p> مجموع الجولة {num} : {Score}</p></div>
        </div> */}
        <div className="containerF mx-auto">
            { items.map((item, index) => (
                <Caard key={index} item={item} id={index} handleClick={handleClick} className="mx-auto card-adds"/>
            )) }
        </div>
        {/* <Popup
                title={"انتهى التقييم" }
                children = {"النقاط : "+ Score}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >      
            </Popup> */}
        </div>
    )



}export default Caards