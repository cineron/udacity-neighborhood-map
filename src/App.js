import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {

  //initialize state to hold API data
  state = {
    venues: [],
  }

  // load the map
  componentDidMount(){
    this.getVenues() 
    // this.renderMap() //move to a callback function after rendering markers
  }

  // loads the new script (loadGMapScript)
  renderMap = () => {
    loadGMapsScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB6fUiE5X9kPlFVUyccN9PgVP-gRR-er0c&callback=initMap")

    // make renderMap visible to React
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "DQW0VVBWUKAMMBNUKZS1D4BGR4U02BE2QTNQEMPZJKHI2IFO",
      client_secret: "W0422IG25V4HL4FQMQLUSNESOFFG2RKO3VZFRCX4KSE1JOG5",
      query: "food",
      near: "Sydney",
      v: "20180811"
    };

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        // console.log(response);
        // console.log(response.data.response.groups[0].items);
        this.setState({
          venues: response.data.response.groups[0].items,
        },
        this.renderMap());
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      });

  };

  //from https://developers.google.com/maps/documentation/javascript/tutorial
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    //loop over venues and add them to state
    this.state.venues.map((eachVenue) => {
      //add markers to map
      const marker = new window.google.maps.Marker({
        position: {lat: eachVenue.venue.location.lat, lng: eachVenue.venue.location.lng},
        map: map,
        title: eachVenue.venue.name,
      });

    })
    

  }



  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>

Follow along from Elharony Youtube video
https://www.youtube.com/watch?v=W5LhLZqj76s
*/

//"function" keyword can be used b/c this block is outside React. 
// re-create the copied function from Google Documents to here.
function loadGMapsScript(url) {
  //get the "script" tag
  let index = window.document.getElementsByTagName("script")[0];

  //add a <script> tag
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  
  //insert this script before other scripts
  index.parentNode.insertBefore(script, index);
}


export default App;
