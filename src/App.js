import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Balloons from './components/Assessments/BART/Balloon/Balloon';
import ReadyT from './components/Assessments/BART/ReadyT/ReadyT';
import Letters from './components/Assessments/CPT/Letters/Letters';
import ReadyS from './components/Assessments/CPT/ReadyS/ReadyS';
import Caards from './components/Assessments/InvestmentGame/Caards/Caards';
import ReadyFo from './components/Assessments/InvestmentGame/ReadyFo/ReadyFo';
import Layout from './components/Assessments/Layout/Layout';
import ReadyLayout from './components/Assessments/Layout/ReadyLayout';
import Ultimatum from './components/Assessments/Ultimatum/Ultimatum';
import Cards from './components/Assessments/VSGame/Cards/Cards';
import Ready from './components/Assessments/VSGame/Ready/Ready';
import Main from './components/Main';
import Done from './components/Assessments/Done';
import { Helmet } from 'react-helmet';


function App() {
  return (
    <div className="App">
     <Helmet>
                <meta charSet="utf-8" />
                <title>GamifiedAssessment</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>}> </Route>
          <Route path='/VSGame' element={<Ready/>}></Route>
          <Route path='/Cards' element={<Cards startTimer= {true}/>}></Route>
          <Route path='/CPT' element={<ReadyS/>}></Route>
          <Route path='/Letters' element={<Letters/>}></Route>
          <Route path='/BART' element={<ReadyT/>}></Route>
          <Route path='/Balloons' element={<Balloons/>}></Route>
          <Route path='/InvestmentGame' element={<ReadyFo/>}></Route>
          <Route path='/InvestmentCards' element={<Caards/>}></Route>
          <Route path='/Ultimatum' element={<Ultimatum/>}></Route>
          <Route exact path="/Layout" element={<Layout/>} />
          <Route path="/LayoutReady" element={<ReadyLayout/>} />
          <Route path="/Done" element={<Done/>} />          
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
