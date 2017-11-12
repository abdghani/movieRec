import React, { Component } from 'react';
import apiService from '../../../service/api.service.js'
import {Grid, Card, Icon } from 'semantic-ui-react'

class MovieDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      char : 'a',
      movies:[]
    }
  }

  componentDidMount(){
    console.log(this.props.match.params);
  }
  render(){
    return (
      <div>
        detail
      </div>
    )
  }
}

export default MovieDetail
