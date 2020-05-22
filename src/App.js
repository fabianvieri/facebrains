import React, { Component, Fragment } from 'react'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}


export default class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = data => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    this.setState({ box });
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imageURL: this.state.input })
    fetch('https://facebrains-server.herokuapp.com/imageurl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://facebrains-server.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error));
  }

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onroutechange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
          this.state.route === 'home'
            ? <Fragment>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onchange={this.onInputChange} onsubmit={this.onSubmit} />
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
            </Fragment>
            : (
              this.state.route === 'signin'
                ? <SignIn onroutechange={this.onRouteChange} loaduser={this.loadUser} />
                : <Register onroutechange={this.onRouteChange} loaduser={this.loadUser} />
            )
        }
      </div>
    )
  }
}

