import React, { Component } from "react";
import './App.css';
import axios from "axios";
import validator from "validator";

class App extends Component {
  state = {
    url: '',
    link: ''
  }

  handleChange = (e) => {
    this.setState({
      url: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const validUrl = validator.isURL(this.state.url, {
      require_protocol: true
    })
    if (!validUrl) {
      alert('please ensure this url is correct')
    } else {
      console.log('Url mu: ', this.state.url)
      //post values
      axios.post(`/api/shorten`, {
        url: this.state.url
      })
        .then(res => {
          console.log(res.data.hash)
          this.setState({
            link: `http://lihat.in/${res.data.hash}`
          })
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    console.log('working')

    return (
      <div className="container">
        <div className="body-wrap">
          <header>
            <h1><span className="highlight">Lihat.in</span></h1>
            <small>lihatin linkmu sesimple mungkin.</small>
          </header>
          <main>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <input
                  type="text"
                  name="url"
                  placeholder="Input url Kamu"
                  onChange={this.handleChange}
                />
                <input type={"submit"} value="Lihatin" />
              </fieldset>

              <fieldset className={this.state.link !== '' ? 'display-result' : 'hide-result'}>
                <span id="result"> {this.state.link} </span>
              </fieldset>
            </form>
          </main>
        </div>
      </div>
    )
  }
}

export default App;
