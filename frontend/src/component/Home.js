import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import queryString from "query-string";

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alljob: [],
      per_page: 5,
      change_page:{
        page: 1,
      },
      total_page: 0,
      Allcomapny:"",
      allDetails:[],
      allCity1 : [],
      comapny_name :"",
      salary:"",
      job_opening:""

    }
  }
  Deletecity = (job_id) => {
    axios.delete('http://127.0.0.1:5000/delete-job/' + job_id)
      .then((res) => {
        console.log(res.data)
        window.location.reload(false)
      })
      .catch((error) => alert(error))
  }

  componentDidMount = (page = 1) => {
    axios.get(`http://127.0.0.1:5000/read_job?page=${page}`,{
      headers:{
        per_page:this.state.per_page
      }
    })
      .then(res => {
        this.setState({
            alljob: res.data.data,
            total_pages: res.data.total_pages
        })
        console.log(res.data)
      })
      .catch((err) => alert(err))

      axios.get('http://127.0.0.1:5000/read/company')
            .then(res => {
                this.setState({
                    allCity1: res.data,
                })
                console.log(res.data)
            })
            .catch((err) => alert(err))
  }
  pagination = (pageNo) => {
    let updatePage = this.state.change_page
    updatePage.page = pageNo
    this.setState(
      {
        change_page: updatePage
      },
      () => {
        this.props.history.push(`?${queryString.stringify(updatePage)}`);
      }
    );
    this.componentDidMount(this.page = pageNo);
  };

  handleInput =(e)=>{
    e.preventDefault()
    this.setState({
     [e.target.name]:e.target.value
    })
  }
  handleChange = (e) => {
    axios.get(`http://127.0.0.1:5000/read/job`)
      .then(res => {
        console.log(res.data)
        this.setState({
          allDetails:res.data
        })
      
      })
      .catch((err) => alert(err))

  }
  sortopening = (a) => {
    if (a.target.value === "h2l") {
        let highToLow = this.state.alljob.sort((e,i) => (Number(e.job_opening)) - (Number(i.job_opening)));
        this.setState({ alljob: highToLow })
    }
    else if (a.target.value === "l2h") {
        let lowToHigh = this.state.alljob.sort((e,i) => (Number(i.job_opening)) + - (Number(e.job_opening)));
        this.setState({ alljob: lowToHigh })
    }
}

  
sortsalary = (user) => {
  if (user.target.value === "h2l") {
      let highToLow = this.state.alljob.sort((e, i) => (Number(e.salary)) - (Number(i.salary)));
      this.setState({ alljob: highToLow})
  }
  else if (user.target.value === "l2h") {
      let lowToHigh = this.state.alljob.sort((e, i) => (Number(i.salary)) + - (Number(e.salary)));
      this.setState({ alljob: lowToHigh })
  }
}
  render() {
      var sum = 0
    const pageNumbers = [];
    for (let i = 1; i <= this.state.total_pages; i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button className="btn btn-secondary ml-2" onClick={() => this.pagination(number)}>{number}</button>
      );
    });


    return (
      <div>
        <h3 className="text-center"> All Job Details</h3>
        <table class="table table-dark">
  <thead>
            <tr>
            <th scope="col">company</th>
              <th scope="col"> location</th>
              <th scope="col"> Job title</th>
              <th scope="col">  <select class="custom-select w-100" name ="job_opening"  id="inlineFormCustomSelect" onChange={this.sortopening}>
            <option selected className = "text-dark">job opening</option>
            <option value="l2h">low to high</option>
            <option value="h2l">high to low</option>
            </select></th>
             <th scope="col">
                <select class="custom-select w-100" id="inlineFormCustomSelect " name = "salary" onChange={this.sortsalary}>
                    <option selected>salary</option>
                    <option value="l2h">low to high</option>
                    <option value="h2l">high to low</option>
                </select></th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
              
            </tr>
          </thead>
          <tbody>
            {this.state.alljob.reverse().map((e) => {
                sum = sum + Number(e.job_opening)
              return (
                // <table class="table">
                <tr className="">
                  <td>{e.comapny_name}</td>
                  <td> {e.location}</td>   
                  <te>{e.job_title}</te> 
                  <td>{e.job_opening}</td>
                  <td>{e.salary}</td>
                  <td>
                    <button type="submit" className="btn btn-danger " onClick={() => this.Deletecity(e.job_id)}> Delete </button>
                  </td>
                  <td>
                 
                    <Link to={`/Edit/${e.job_id}`}><button type="submit" className="btn btn-primary ">Edit </button></Link>

                  </td>
                </tr>
                
              );
            })}
          </tbody>
        </table>
        <p> total Number of job opening :{sum}</p>
        <Link to="/Createjob"><button type="submit" className="btn btn-primary "> Create job</button></Link>
        <Link to="/CompanyCreate"><button type="submit" className="btn btn-primary ml-5 ">Company Create </button></Link>
        <Link to="/SortBycompany"><button type="submit" className="btn btn-primary ml-5 ">SortBycompany </button></Link>   
        <Link to="/Sortbyopening"><button type="submit" className="btn btn-primary ml-5 ">Sortbyopening </button></Link>  
        <Link to="/Location"><button type="submit" className="btn btn-primary ml-5 ">Location </button></Link>        
        <div className="offset-5 mt-3 mb-5">
          {this.page > 1 ? <li className={`btn btn-info`} onClick={() => this.pagination(this.page - 1)}><a href="#">Prev</a></li> : ''}
          {renderPageNumbers}
          {this.page < this.state.total_pages ? <li className={`btn btn-info`} onClick={() => this.pagination(this.page + 1)}><a href="#">Next</a></li> : ''}
          {this.page < this.state.total_pages + this.page ? <li className={`btn btn-dark`} onClick={() => this.pagination(this.state.total_pages)}><a href="#">last</a></li> : ''}
        </div>
       
      </div>
    )
  }
}


