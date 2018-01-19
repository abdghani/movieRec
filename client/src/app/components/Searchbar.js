import React, {
  Component
}
from 'react';
import {
  Input, Search, Grid, Header
}
from 'semantic-ui-react';
import apiService from '../service/api.service.js'
import _ from 'lodash'

const source = _.times(5, () => ({
  title: '444',
  description: '555',
  image: 'hj'
}))

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      query: ''
    };
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({
    isLoading: false,
    results: [],
    value: ''
  })

  handleResultSelect = (e, {
    result
  }) => {
    console.log(result);
  }
  mapItem = (items) => {
    var final = [];
    for (var i = 0; i < items.result.length; i++) {
      let desc = "";
      let img = "";
      if (items.result[i].description) {
        desc = items.result[i].description.length > 200 ? items.result[i].description.substring(0, 200) + "...." : items.result[i].description;
      } else {
        desc = "";
      }
      if (items.result[i].backdrop_path) {
        img = "https://image.tmdb.org/t/p/w500" + items.result[i].backdrop_path;
      } else {
        img = "";
      }
      final.push({
        title: items.result[i].name,
        description: desc,
        image: img,
        id: "items.result[i].tmdbid",
      })
    }
    return final
  }
  handleSearchChange = (e, {
    value
  }) => {
    let self = this;
    self.setState({
      isLoading: true,
      value
    })
    setTimeout(() => {
      if (self.state.value.length < 1) return self.resetComponent()
      let payload = {
        "field": "name",
        "query": self.state.value
      }
      apiService.post('/searchbyQuery', payload).then(function(res) {
        self.setState({
          isLoading: false,
          results: self.mapItem(res)
        })
      })
    }, 500)
  }

  render() {
    const {
      isLoading, value, results
    } = this.state
    return ( < Grid >
      < Grid.Column width = {
        20
      } >
      < Search loading = {
        isLoading
      }
      onResultSelect = {
        this.handleResultSelect
      }
      onSearchChange = {
        this.handleSearchChange
      }
      results = {
        results
      }
      value = {
        value
      }
      className = "mainInput"
      size = 'massive'
      input = {
        {
          fluid: true
        }
      }
      fluid / >
      < /Grid.Column> < /Grid >
    )
  }
}

export default SearchBar;
