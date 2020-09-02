import React from "react"
import axios from "axios"

class Instafeed extends React.Component {
    state = {
        images: [],
    }

    componentDidMount() {
        const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username"
        let user_id = "17841401439222266"
        let token = 'IGQVJYaWFVX3ZASU1BScXB6d0t5RHBSS0ZAfdGFiekV1eGJ2cFp0NW5IYXJYZAmZAWRU5adV9qWnJzTHVJMjJGTEg1aHVQZA2hkWDViN1diSU81MnExTFJKajg2R0RLVHFMTTl2bGJlRS1pOE5ENDhzeHZA5bgZDZD'
        let num_photos = 100
        const photo_limit = 1000

        axios.get(`https://graph.instagram.com/${user_id}/media?fields=${fields}&access_token=${token}&count=${num_photos}&limit=${photo_limit}`)
        .then(res => {
            this.setState({ images: res.data.data });
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return(
            <div id="instafeed">
                { this.state.images.map((image) => {
                    return(
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={image.timestamp}>
                            <a href={image.permalink}>
                                <div className="photo-box">
                                    <div className="image-wrap">
                                        <img src={image.media_url} alt={image.caption} />
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