import React from "react"
import axios from "axios"
import LoadButton from "./LoadButton"

class Instafeed extends React.Component {
    state = {
        all_photos: [],
        displayed_photos: [],
        additional_photos: true,
        num_photos_displayed: 30,
    }

    constructor(props) {
        super(props)

        this.retrievePhotos()

        this.retrievePhotos = this.retrievePhotos.bind(this)
        this.handleShowMore = this.handleShowMore.bind(this)
    }

    retrievePhotos() {
        const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username"
        let user_id = "17841401439222266"
        let token = 'IGQVJYaWFVX3ZASU1BScXB6d0t5RHBSS0ZAfdGFiekV1eGJ2cFp0NW5IYXJYZAmZAWRU5adV9qWnJzTHVJMjJGTEg1aHVQZA2hkWDViN1diSU81MnExTFJKajg2R0RLVHFMTTl2bGJlRS1pOE5ENDhzeHZA5bgZDZD'
        let photo_limit = 1000

        axios.get(`https://graph.instagram.com/${user_id}/media?fields=${fields}&access_token=${token}&limit=${photo_limit}`)
        .then(res => {
            this.setState({ 
                all_photos: res.data.data,
                displayed_photos: Object.values(res.data.data).slice(0, this.state.num_photos_displayed),
                num_photos_displayed: this.state.num_photos_displayed + 30 
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
        this.setState({ 
            displayed_photos: Object.values(this.state.all_photos).slice(0, this.state.num_photos_displayed),
            num_photos_displayed: this.state.num_photos_displayed + 30 
        })
        this.checkForAdditionalPhotos()
    }

    render() {
        console.log(this.state.num_photos_displayed)
        return(
            <div id="instafeed">
                { this.state.displayed_photos.map((photo) => {
                    return(
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={photo.timestamp}>
                            <a href={photo.permalink}>
                                <div className="photo-box">
                                    <div className="image-wrap">
                                        <img src={photo.media_url} alt={photo.caption} />
                                    </div>
                                    <div className="likes"><img src={require('./images/heart.png')} alt="heart" /></div>
                                </div>
                            </a>
                        </div>
                    )
                })}
                {this.state.additional_photos 
                    ? <LoadButton handleShowMore = {this.handleShowMore} />
                    : null
                }
            </div>
        )
    }
  }

  export default Instafeed