
import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { Link, Route, Switch ,Redirect} from 'react-router-dom';
import apiService from '../../service/api.service.js'
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
                <Sidebar.Pushable as={Segment}>

                  <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
                    <Link to="/home">
                      <Menu.Item name='movie'>
                        <Icon name='film' />
                        MOVIE
                      </Menu.Item>
                    </Link>
                    <Link to="/tasks">
                      <Menu.Item name='genre'>
                        <Icon name='tasks' />
                        GENRE
                      </Menu.Item>
                    </Link>
                  </Sidebar>

                  <Sidebar.Pusher>
                    <Segment basic>
                        <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
                        <Route exact path="/home" component={Home}/>
                        <Route path="/category" component={Category}/>
                        <Route path="/products" component={Products}/>
                    </Segment>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </div>
    )

  }
}
export default Details
