import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    }
  }
  componentWillMount() {
    axios.get('http://res.cloudinary.com/dlxrv9h1o/image/list/react_gallery.json').
      then(response => {
        console.log(response.data.resources);
        this.setState({ gallery: response.data.resources });
      });
  }
  render() {
    return (
      <div className="main">
        <h1>Gallery</h1>
        <div className="gallery">
          <CloudinaryContext cloudName="dlxrv9h1o">
            {
              this.state.gallery.map(item => {
                return (
                  <div className="responsive">
                    <div className="img">
                      <a target="_blank" href={`http://res.cloudinary.com/dlxrv9h1o/image/upload/v${item.version}/${item.public_id}.${item.format}`}>
                        <Image publicId={item.public_id}>
                          <Transformation
                            crop="scale"
                            width="300"
                            height="200"
                            >
                          </Transformation>
                        </Image>
                      </a>
                    </div>
                  </div>
                )
              })
            }
          </CloudinaryContext>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default App;
