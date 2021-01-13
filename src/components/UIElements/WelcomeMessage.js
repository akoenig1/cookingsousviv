import React from "react"

function WelcomeMessage() {
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col"></div>
                <div className="col" id="welcome-message">
                    <h2 className="text-center">
                        Welcome to my website! We're still under
                        development, but the blog will be up and
                        running very soon (along with a few other
                        exciting features)!
                    </h2>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default WelcomeMessage