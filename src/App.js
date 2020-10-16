import React, {Component} from 'react';
import axios from 'axios'
import { BrowserRouter as Router } from "react-router-dom";
import { MDBCol, MDBFormInline, MDBBtn, MDBNavbarBrand, MDBNavbarToggler, MDBNavbar, MDBCollapse, MDBNavbarNav } from
      "mdbreact";
export default class App extends Component{
  // set initial state of elements
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedImage: '',
    }
  }

  search() {
    var _this = this;
    this.serverRequest =
        axios
            .get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ca3783111609d69139840916b7a01ad2&format=json&nojsoncallback=1" +
                "&per_page=5&tags=cars")
            .then(function(result) {
              _this.setState({
                items: result.data. photos.photo,
                selectedImage: _this.imageURL(result.data.photos.photo[0]+1)
              })
            })
  }
  componentDidMount() {
    this.search();
  }

  // assemble image URL
  imageURL(item) {
    return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'
  }

  // handle image selection
  selectImage(selectedImage) {
    this.setState({
      selectedImage
    })
  }
  render() {
    const {items, images, selectedImage} = this.state;
    return (
        <div className="media-gallery">
          <MDBCol md="12">
            <MDBNavbar color="deep-purple" className="text-white darken-3" dark expand="md">
              <MDBNavbarBrand>Photo Liker</MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.handleTogglerClick} />
              <Router>
                <MDBCollapse isOpen={this.state.collapsed} navbar>
                  <MDBNavbarNav right onClick={this.handleNavbarClick}>
                    <MDBFormInline id="myForm" onsubmit="searchBtn()">
                      <input id="searchBar" type="text" placeholder="Search" aria-label="Search" />
                      <MDBBtn outline color="white" size="sm" type="submit" className="mr-auto" onClick={this.searchBtn}>
                        Search
                      </MDBBtn>
                    </MDBFormInline>
                  </MDBNavbarNav>
                </MDBCollapse>
              </Router>
            </MDBNavbar>
          </MDBCol>
          <h1 className="media-gallery__title">Flickr API Component</h1>
          <div className="media-gallery-thumbnails">
            {this.state.items.length ?
                this.state.items.map((item, index) =>
                    <div key={index} onClick={this.selectImage.bind(this,this.imageURL(item))}>
                      <img className="media-gallery-thumbnails__img" src={this.imageURL(item)}/>
                    </div>)
                : <div>Loading...</div>
            }
          </div>
          <div className="media-gallery-main">
            <div>
              <img className="media-gallery-main__img" src={selectedImage} />
            </div>
          </div>
        </div>
    )
  }
}