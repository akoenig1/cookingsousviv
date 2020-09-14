import React from "react"
import axios from "axios"

class Instafeed extends React.Component {
    state = {
        all_photos: [],
        displayed_photos: [],
        additional_photos: true,
        num_photos_displayed: 32,
    }

    constructor(props) {
        super(props)

        this.retrievePhotos()

        this.retrievePhotos = this.retrievePhotos.bind(this)
        this.handleShowMore = this.handleShowMore.bind(this)
    }

    componentWillMount(){
        window.addEventListener('scroll', this.handleShowMore);
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleShowMore);
    }

    retrievePhotos() {
        const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username"
        let user_id = "17841425225910270"
        let token = 'IGQVJXMTByZAG5zMGxIVU9qVDdEVmkyN080R2hDdUpma19Va0h2SXFlY3dzcXlMQTNRVUtVM0JKdXVKd3RBZAXVuUDVrN2hNQWc5OUk1bnI1T29RZAm53WlA3S0R1QnZA2YlA3akhfeTc1XzJlSmJCTlBoNwZDZD'
        let photo_limit = 1000

        axios.get(`https://graph.instagram.com/${user_id}/media?fields=${fields}&access_token=${token}&limit=${photo_limit}`)
        .then(res => {
            this.setState({ 
                all_photos: res.data.data,
                displayed_photos: Object.values(res.data.data).slice(0, this.state.num_photos_displayed),
                num_photos_displayed: this.state.num_photos_displayed + 32 
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
                num_photos_displayed: this.state.num_photos_displayed + 32 
            })
            this.checkForAdditionalPhotos()
        }
    }

    render() {
        return(
            <div id="instafeed">
                { this.state.displayed_photos.map((photo, index) => {
                    return(
                        <div 
                            className="col-xs-12 col-sm-6 col-md-4 col-lg-3" 
                            key={photo.timestamp}
                        >
                            <a href={photo.permalink}>
                                <div className="photo-box">
                                    <div className="image-wrap">
                                        <img 
                                            src={photo.media_type === "VIDEO"
                                                ? photo.thumbnail_url
                                                : photo.media_url
                                            } 
                                            alt={photo.caption} 
                                        />
                                    </div>
                                    <div className="likes"><img src={require('./images/heart.png')} alt="heart" /></div>
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