import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Location extends Component {
    constructor(props) {
        super(props)  
        this.state = {
             allDetails:[],
             location:'',
             allcomapny:[]
        }
    }
    componentDidMount = () => {
        axios.get('http://127.0.0.1:5000/read/job')
            .then(res => {
                this.setState({
                    allcomapny: res.data,
                })
                console.log(res.data)
            })
            .catch((err) => alert(err))
    }

    HandleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://127.0.0.1:5000/Sortbylocation`,{
            location:this.state.location
        })
      .then(res => {
        console.log(res.data)
        this.setState({
          allDetails:res.data
        })
    //   window.location.reload(false)
      })
      .catch((err) => alert(err))
      }
    
    render() {
        var sum =0
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                <select class="custom-select w-25" id="inputGroupSelect04" name="location" onChange={this.HandleChange}>
                        <option> </option>
                        {
                            this.state.allcomapny.map((e) => {
                                return (
                                    <option>{e.location}</option>
                                )
                            })
                        }
                    </select>
                    <button type = "submit" className = "btn btn-info">Submit</button>
                    </form>
                <table class="table">
                <tbody>
            {this.state.allDetails.reverse().map((e) => {
                sum = sum + Number(e.job_opening)
              return (
                
                <tr className="w-100 ">
                   <td>{e.comapny_name}</td>
                  <td> {e.location}</td>   
                  <te>{e.job_title}</te> 
                  <td>{e.job_opening}</td>
                  <td>{e.salary}</td>
                  <td> {e.job_title}</td>
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
        <p> total No of opening: {sum}</p>
        </div>
        )
    }
}
