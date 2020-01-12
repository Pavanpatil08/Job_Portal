import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Sortbyopening extends Component {
    constructor(props) {
        super(props)  
        this.state = {
             allDetails:[],
             comapny_name:'',
             allcomapny:[]
        }
    }

    componentDidMount = () => {
        axios.get(`http://127.0.0.1:5000/Sortbyopening`)
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
        return (
            <div>
                <h1> Sort all Opening by  ascending</h1>
                <table class="table">
                <tbody>
            {this.state.allDetails.reverse().map((e) => {
              return (
                
                <tr className="w-100">
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
        </div>
        )
    }
}
