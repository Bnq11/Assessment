import './Layout.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { GiCardRandom } from 'react-icons/gi';
import {
  RiEmotionHappyLine,
  RiEmotionUnhappyLine,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Background from '../../Background/Background';
import { addScore } from '../../../API';
import {useSearchParams} from 'react-router-dom';

function Layout() {
  const [isAdvantageous, setIsAdvantageous] = useState();
  const [cash, setCash] = useState(0);
  const [amount, setAmount] = useState();
  const [count, setCount] = useState(1);
  const [report , setReport]=useState('');
  const [gain, setgain] = useState(0);
  const [loss, setloss] = useState(0);
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams();
  const query = searchParams.get("serial_number");
  const query2 = searchParams.get("assessment_id");


  function handleClick(cardName) {
    console.log(`Clicked on card ${cardName}`);
    // Add code here to update the amount of cash and borrowed

    // Define the probabilities of getting an advantageous or disadvantageous card for each deck
    const probabilities = {
      A: [0.5, 0.5],
      B: [0.1, 0.9],
      C: [0.5, 0.5],
      D: [0.1, 0.9],
    };

    // Generate a random number to determine if the card is advantageous or disadvantageous
    const random = Math.random();
    const isAdvantageous = random < probabilities[cardName][1];

    // Calculate the amount earned or borrowed based on the selected card
    let amount = 0;
    isAdvantageous
      ? cardName === "A" || cardName === "B"
        ? (amount = 100)
        : (amount = 50)
      : cardName === "A" || cardName === "B"
      ? (amount = -500)
      : cardName === "C"
      ? (amount = -50)
      : (amount = -250);

    // Update the amount of cash
    setCash((prevCash) => prevCash + amount);
    setCount((prevCount) => prevCount + 1);
    setIsAdvantageous(isAdvantageous);
    setAmount(amount);
    console.log("count", count);
    setReport(report+'\n'+ "المحاولة :" +count+'\n'+"نوع البطاقة: "+cardName+"| مبلغ البطاقة: " +amount +"| المبلغ الأساسي: " + cash)
    console.log(report)
  }


  function done_alert() {
    Swal.fire({
      title: "!ممتاز ",
      text: "أنهيت الاختبار بنجاح",
      icon: "success",
      confirmButtonColor:"#89760F",
      confirmButtonText: "حسنا",
      width: "400px",
    }).then(() => {
      // Reload the page to restart the game
      // navigate('/Done')
    });
  }

  // Check the count value after every update
  useEffect(() => {
    if (count === 100) {
      done_alert();
      CalculateScore ();
    }
  }, [count]);

  async function CalculateScore (){
    var Cash = cash;
    var Gain = gain;
    var Loss = loss ;
    var Report = report;
    // report

    const requestBody = {
      serial_number: query,
      assessment_id: query2,
      type: 'decisionMaking',
      decisionMaking: [
        { cash: Cash, gain: Gain, loss: Loss, repor: Report }
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
  return (
    <Container fluid className="first-containerr ">
      {/* First section */}
 
            <div className="progressbar">
        <div className="progressbar">
          <div className="progressbar__label">{Math.floor((count / 10) * 10)}%</div>
        <progress className="progressbar__filllay" value={count} max={100} />
    </div>
      </div>

      {/* second section */}
      <div className="amountt shadow">
        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_it8yjgkh.json"  background="transparent"  speed="1"  style={{ width: '100px', height: '55px' }}  autoplay></lottie-player>
        <div className="casht">
          <h4 className="cash-namet">الربح</h4>
          <h4 className="cash-namet">:</h4>
          <h4 className="cash-namet"></h4>
          <h4 className={cash > 0 ? "positive cash-namet" : cash < 0 ? "negative cash-namet" : ""}>
            {" "}
            {cash}{" "}
          </h4>
          <h4 className="cash-namet"> ريال </h4>
        </div>
        
      </div>

      {/* third section */}
      <div className="alert">
        {console.log("in msg", isAdvantageous)}

        {isAdvantageous ? (
          <div className="alert-body">
            <RiEmotionHappyLine
              size={100}
              color="rgb(76, 148, 76)
"
            />
            <div className="alert-message">
              <h3 className="titleWin"> ربحت</h3>
              <h3 className="alert-positive">{amount}</h3>
              <h3 className="titleWin"> ريال </h3>
            </div>
          </div>
        ) : isAdvantageous === false ? (
          <div className="alert-body">
            <RiEmotionUnhappyLine size={100} color="rgb(211, 81, 81)" />
            <div className="alert-message">
              <h4 className="titleLose"> خسرت</h4>
              <h4 className="alert-negative">{amount}</h4>
              <h4 className="titleLose"> ريال </h4>
            </div>
          </div>
        ) : (
          <div className="alert-body">
            {/* <VscDebugStart size={130} color="black" className='svgGrowth' /> */}
            <div className="alert-message">
              <h3>اختر بطاقة للبدأ</h3>
            </div>
          </div>
        )}
      </div>
      {/* fourth section */}
      <div className="card-deck">
        <div className="card5" onClick={() => handleClick("D")}>
          <GiCardRandom className='svgGrowth' size={200} color="32437c" />
          <h3 className="card-name">بطاقة د</h3>
        </div>

        <div className="card5" onClick={() => handleClick("C")}>
          <GiCardRandom className='svgGrowth' size={200} color="32437c" />
          <h3 className="card-name">بطاقة ج</h3>{" "}
        </div>

        <div className="card5" onClick={() => handleClick("B")}>
          <GiCardRandom className='svgGrowth' size={200} color="32437c" />
          <h3 className="card-name">بطاقة ب</h3>{" "}
        </div>

        <div className="card5" onClick={() => handleClick("A")}>
          <GiCardRandom className='svgGrowth' size={200} color="32437c" />
          <h3 className="card-name">بطاقة أ</h3>{" "}
        </div>
      </div>
      {/* <Background/> */}
    </Container>
  );
}

export default Layout;
