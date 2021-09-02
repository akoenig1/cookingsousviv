import React, { useState, useEffect } from "react"
import axios from "axios"
import 'dotenv/config'

const SelectPhoto = (props) => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [currentStep, goForward, goBack] = props.useFormProgress();
  const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com'

  const getPhotos = () => {
    axios.get(`${server_url}/instaPhotos`)
    .then(res => {
      setAllPhotos(res.data.photos);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleClick = (event) => {
    event.preventDefault();
    // goForward();
    setSelectedPhoto(event.target);
    event.target.classList.add('active')
    props.setState({photo: JSON.parse(event.target.getAttribute('photo'))});
  }

  useEffect( () => {
    getPhotos()
  });

  if(isLoading) {
    return(
      <div>
        <h3>Loading...</h3>
      </div>
    )
  }

  return(
    <div id="instafeed">
      <h3>Select the photo you'd like to associate with this recipe:</h3>
      { allPhotos.map((photo) => {
        if(photo) {
          return(
            <div
              className="col-xs-12 col-sm-6 col-md-4" 
              key={photo.timestamp}
              useFormProgress={props.useFormProgress}
              active={photo === selectedPhoto}
              onClick={(e) => {handleClick(e)}}
            >
              <div className="image-container">
                <img 
                  className="img-fluid form-img"
                  photo={JSON.stringify(photo)}
                  src={photo.media_type === "VIDEO"
                    ? photo.thumbnail_url
                    : photo.media_url
                  } 
                  alt={photo.caption} 
                />
              </div>
            </div>
          )
        }
        return null;
      })}
    </div>
  )
}

  export default SelectPhoto;