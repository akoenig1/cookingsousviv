import React from "react"
import axios from "axios"
import 'dotenv/config'

class Instafeed extends React.Component {
  state = {
    all_photos: [],
    displayed_photos: [],
    additional_photos: true,
    num_photos_displayed: 32,
    is_loading: true
  }
  server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com'

  constructor(props) {
    super(props)

    this.getPhotos()

    this.getPhotos = this.getPhotos.bind(this)
    this.handleShowMore = this.handleShowMore.bind(this)
  }

  static number_of_new_photos_to_display = 32

  componentDidMount(){
    window.addEventListener('scroll', this.handleShowMore);
  }
  
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleShowMore);
  }

  getPhotos() {
    axios.get(`${this.server_url}/instaPhotos`)
    .then(res => {
      this.setState({ 
        all_photos: res.data.photos,
        displayed_photos: Object.values(res.data.photos).slice(0, this.state.num_photos_displayed),
        num_photos_displayed: this.state.num_photos_displayed + Instafeed.number_of_new_photos_to_display,
        is_loading: false
      });
      this.checkForAdditionalPhotos()
    })
    .catch(err => {
      console.log(err)
    })
  }

  checkForAdditionalPhotos() {
    if (this.state.num_photos_displayed < this.state.all_photos.length) {
      this.setState({ additional_photos: true })
    } else {
      this.setState({ additional_photos: false })  
    }
  }

  handleShowMore() {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.scrollingElement.scrollHeight) {
      this.setState({ 
        displayed_photos: Object.values(this.state.all_photos).slice(0, this.state.num_photos_displayed),
        num_photos_displayed: this.state.num_photos_displayed + Instafeed.number_of_new_photos_to_display 
      })
      this.checkForAdditionalPhotos()
    }
  }

  render() {
    if(this.state.is_loading) {
      return(
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }
    return(
      <div id="instafeed">
        { this.state.displayed_photos.map((photo, index) => {
          return(
            <div 
              className="col-xs-12 col-sm-6 col-md-4" 
              key={photo.timestamp}
            >
              <a href={photo.permalink} target="_blank" rel="noreferrer">
                <div className="image-container">
                  <img 
                    className="img-fluid"
                    src={photo.media_type === "VIDEO"
                      ? photo.thumbnail_url
                      : photo.media_url
                    } 
                    alt={photo.caption} 
                  />
                </div>
              </a>
            </div>
          )
        })}
      </div>
    )
  }
}

  export default Instafeed