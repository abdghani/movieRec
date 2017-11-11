
import React, { Component } from 'react';
import { Button,Segment,Header } from 'semantic-ui-react';
import SearchBar from './Searchbar';
import Details from './comps/Details';

class Main extends Component {



  render() {

    return (
      <div className="main ui container">
            <Segment clearing>
                <Header  as='h1' textAlign='center'>
                    MOVIES
                </Header>
            </Segment>
            <SearchBar />
            <Details />
      </div>
    );
  }
}


export default Main;
