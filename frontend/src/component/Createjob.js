import React, { Component } from 'react';
import axios from 'axios'


export class Createjob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allcomapny: [],
            job_title:"",
            salary:"",
            job_opening:"",
            comapny_name:"",
            location:""
        }
    }
    componentDidMount = () => {
        axios.get('http://127.0.0.1:5000/read/company')
            .then(res => {
                this.setState({
                    allcomapny: res.data,
                })
                console.log(res.data)
            })
            .catch((err) => alert(err))
    }
    HandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var Job_Details = {
            salary: this.state.salary,
            job_opening: this.state.job_opening,
            location: this.state.location,
            comapny_name: this.state.comapny_name,
            job_title:this.state.job_title,

        }
        // console.log(City_Details)
        axios.post('http://127.0.0.1:5000/create_job', Job_Details)
            .then(res => {
                console.log(res.date)
                alert("created")
                this.props.history.push('/')
            })

            .catch((err) => alert(err))
    }

    render() {
     console.log(this.state)
        return (
            <form className="offset-4 mt-3" onSubmit={this.handleSubmit}>
                <h3> create job opening</h3>
                <div class="input-group w-25">
                    <select class="custom-select w-25" id="inputGroupSelect04" name="comapny_name" onChange={this.HandleChange}>
                        <option> </option>
                        {
                            this.state.allcomapny.map((e) => {
                                return (
                                    <option>{e.comapny_name}</option>
                                )
                            })
                        }
                    </select>
                    <div class="mb-3 mt-5">
                        <label for="validationTextarea">job Opening</label>
                        <input class="form-control w-100" name="job_opening" onChange={this.HandleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">location</label>
                        <input class="form-control w-100" name="location" onChange={this.HandleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">salary</label>
                        <input class="form-control w-100" name="salary" onChange={this.HandleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">job_title</label>
                        <input class="form-control w-100" name="job_title" onChange={this.HandleChange}></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>


        )
    }
}

export default Createjob
