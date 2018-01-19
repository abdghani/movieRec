
import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { Link, Route, Switch ,Redirect} from 'react-router-dom';
import apiService from '../../service/api.service.js'
import Genre from './genreDetail/genre';
import Movie from './movieDetail/movie';
import MovieDetil from './movieDetail/movieDetail';
var request = require('superagent');

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres:[],
      visible: true
    };
  }

  componentDidMount() {
    let self = this;
    apiService
    .get('/genres')
    .then(function (res) {
      self.setState({
        genres:res
      })
    })
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render(){
    const { visible } = this.state
      return (
              <div className="mainHeight">
                <Sidebar.Pushable as={Segment} className="min1000">
                  <Sidebar as={Menu}  visible='true'  direction='top'  inverted>
                    <Link to="/movie">
                      <Menu.Item name='movie'>
                        <Icon name='film' />
                        MOVIE
                      </Menu.Item>
                    </Link>
                  </Sidebar>

                  <Sidebar.Pusher>
                    <Segment basic>
                        <Route exact path="/" render={() => (<Redirect to="/movie"/>)}/>
                        <Route exact path="/movie" component={Movie}/>
                        <Route path="/detail/:id" component={MovieDetil}/>
                    </Segment>
                  </Sidebar.Pusher>

                </Sidebar.Pushable>
              </div>
    )

  }
}
export default Details

// <Link to="/genre">
//   <Menu.Item name='genre'>
//     <Icon name='tasks' />
//     GENRE
//   </Menu.Item>
// </Link>
// <Route path="/genre" component={Genre}/>
