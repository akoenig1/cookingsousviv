import React from "react"
import Instafeed from "./Instafeed"
import WelcomeMessage from "../components/UIElements/WelcomeMessage"    

function Photoboard() {
    return(
        <div id="homepage">
            <WelcomeMessage></WelcomeMessage>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="instagram-content">
                            <h3>- recently in the kitchen -</h3>
                            <div className="row photos-wrap">
                                <Instafeed />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Photoboard