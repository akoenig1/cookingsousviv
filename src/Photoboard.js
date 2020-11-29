import React from "react"
import Instafeed from "./Instafeed"
    

function Photoboard() {
    return(
        <div id="homepage">
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