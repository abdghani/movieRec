
import React, { Component } from 'react';
import { Button,Segment,Header } from 'semantic-ui-react';
import SearchBar from './Searchbar';
import Details from './comps/Details';

class Main extends Component {
  render() {
    return (
      <div className="main ui container appWidth">
            <Segment clearing>
                <Header  as='h1' textAlign='left'>
                    MOVIE MANIA
                </Header>
            </Segment>
            <SearchBar />
            <Details />
      </div>
    );
  }
}


export default Main;
