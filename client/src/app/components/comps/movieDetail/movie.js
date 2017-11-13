import React, { Component } from 'react';
import apiService from '../../../service/api.service.js'
import {Grid, Card, Icon } from 'semantic-ui-react'
import { Link, Route, Switch ,Redirect} from 'react-router-dom';

class Movie extends Component{

  constructor(props){
    super(props);
    this.state = {
      char : 'a',
      movies:[]
    }
  }

  loadDefaultMovies = function(){
    let self = this;
      apiService.post('/searchbyCharacter',{'query':this.state.char}).then(function(res){
          self.setState({
            movies:res
          })
      })
  }

  componentDidMount() {
    this.loadDefaultMovies()
  }
    render(){
      return (
        <div>
        <Grid columns={3} divided>
          <Grid.Row >
            {this.state.movies.map((movie,index)=>{
                return (
                    <div  className="cardClass">
                      <Card
                          image={`https://image.tmdb.org/t/p/w500`+`${movie.backdrop_path}`}
                          header={movie.name}
                          description={movie.description.substring(0,200)+".."}
                          meta={'Release '+movie.release_date}
                          extra={
                            <div>
                              <span className="mar10">
                                <a>
                                  <Icon name='thumbs up' />
                                  {movie.vote_count}
                                </a>
                              </span>
                              <span className="mar10">
                                <a>
                                  <Icon name='star' />
                                  {movie.vote_average}
                                </a>
                              </span>
                              <span className="marleft30">
                              <Link to={`/detail/${movie.id}`}>
                                  <Icon name='arrow right' />
                              </Link>
                              </span>
                             </div>
                          }
                        />
                    </div>
                )
             })}
          </Grid.Row>
         </Grid>
         </div>
      )
    }
}

export default Movie
