import React from 'react';
import axios from 'axios';

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salary: "",
            job_id:'',
            job_opening:"",
            job_title:"",
            location:""
            
        }
    }
       
    HandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var job_Details = {
            job_opening:this.state.job_opening,
            job_title:this.state.job_title,
            location:this.state.location,
            salary:this.state.salary
        }
        // console.log(City_Details)
        axios.post('http://127.0.0.1:5000/update/'+ this.props.match.params.job_id, job_Details)
            .then(res  => {
                console.log(res.date)
                this.props.history.push('/')
                alert("updated")
            })
            // window.location.reload(false)
            
            .catch((err) => alert(err))
        }
    render() {
        return (
            <>
                <h3 className = "offset-4 mt-4 h1 text-primary"> {this.state.name}</h3>
                <form className="offset-4 mt-3" onSubmit = {this.handleSubmit}>
                    <h3> Edit here </h3>
                    <div class="mb-3">
                        <label for="validationTextarea">salary</label>
                        <input class="form-control w-50"  name = "salary" onChange = {this.HandleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">job_opening</label>
                        <input class="form-control w-50"  name = "job_opening" onChange = {this.HandleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">job_title</label>
                        <input class="form-control w-50"  name = "job_title" onChange = {this.HandleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">location</label>
                        <input class="form-control w-50"  name = "location" onChange = {this.HandleChange}></input>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }
}
export default Edit
