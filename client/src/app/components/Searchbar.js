import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
    render() {
      return (
          <div>
                <Input size='massive' icon='search' placeholder='Search...' className="mainInput" />
          </div>
      )
    }
}

export default SearchBar;
