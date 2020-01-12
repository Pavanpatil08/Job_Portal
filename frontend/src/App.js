import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import CompanyCreate from './component/CreateComapny';
import Createjob from './component/Createjob';
import Home from './component/Home';
import Edit from './component/Edit';
import SortBycompany from './component/SortBycompany';
import Sortbyopening from './component/SortbyOpening';
import Location from './component/Sortbyloaction';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact render={(props) => { return (<Home  {...props} />) }} ></Route>
        <Route path="/CompanyCreate" render={(props) => { return (<CompanyCreate  {...props} />) }} ></Route>
        <Route path="/Createjob" render={(props) => { return (<Createjob  {...props} />) }} ></Route>
        <Route path="/Edit/:job_id" render={(props) => { return (<Edit  {...props} />) }} ></Route>
        <Route path="/SortBycompany" render={(props) => { return (<SortBycompany  {...props} />) }} ></Route>
        <Route path="/Sortbyopening" render={(props) => { return (<Sortbyopening  {...props} />) }} ></Route>
        <Route path="/Location" render={(props) => { return (<Location  {...props} />) }} ></Route>

      </BrowserRouter>
    </div>
   
  );
}

export default App;
