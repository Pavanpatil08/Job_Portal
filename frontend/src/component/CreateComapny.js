import React, { Component } from 'react'
import axios from 'axios'

export default class CompanyCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comapny_name: '',
            loaction:""
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        var comapny = {
            comapny_name: this.state.comapny_name,
            location : this.state.location
        }
        axios.post('http://127.0.0.1:5000/create_company',comapny)
            .then(res => {
                console.log(res)
                this.props.history.push('/')
            })
            .catch((err) => alert(err))
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2 className=" offset-4 mt-3 text-primary " >create comapny name</h2>
                    <input type="text" className="offset-4 mt-2 w-25" name="comapny_name" onChange={this.onChange}></input>
                    <input type="text" className="offset-4 mt-2 w-25" name="location" onChange={this.onChange}></input>
                    <button type="submit" className="btn btn-primary offset-4 w-25 mt-2 btn-lg">Add company </button>
                </form>
            </div>
        )
    }
}