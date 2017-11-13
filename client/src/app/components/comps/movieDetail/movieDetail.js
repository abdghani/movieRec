import React, { Component } from 'react';
import apiService from '../../../service/api.service.js'
import { Segment,Container,Header,Image,Tab } from 'semantic-ui-react'
import { Grid, Rail, Sticky } from 'semantic-ui-react'
import _ from 'lodash'
class MovieDetail extends Component{


  constructor(props){
    super(props);
    this.state = {
      id:null,
      movie:{}
    }
  }
  getMovieDetail(id){
    let self = this;
    apiService.post('/searchbyId',{"id":id}).then(function(res){
      self.setState({
        id:id,
        movie:res.result
      })
      console.log(self.state);
    })

  }
  componentDidMount(){
    this.getMovieDetail(parseInt(this.props.match.params.id));
  }


  render(){
     const { contextRef } = this.state
     let panes = [
         { menuItem: 'Tab 1', render: () => <Tab.Pane>{<h2>Tab 1 Content</h2>}</Tab.Pane> },
         { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
         { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
     ]
    return (
      <div>
      <Segment >
      <Grid centered columns={3}>
        <Grid.Column>

          <Rail position='left' className="myImage" >
                  <Sticky context={contextRef}>
                      <Image src='https://image.tmdb.org/t/p/w1000/k91Dag8AZbhjIJqrtf7F1bQnGPg.jpg'  height='300px' width='700px' bordered floated="left"/>
                  </Sticky>
          </Rail>
          <Tab panes={panes} className="tabHeight"/>
          </Grid.Column>
        </Grid>
      </Segment>

      </div>
    )
  }
}

export default MovieDetail


// <p floated="right">
//   <Tab panes={panes} />
// </p>
