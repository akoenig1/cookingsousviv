import React from "react"

class LoadButton extends React.Component {
    render() {
        return(
            <button onClick={this.props.handleShowMore}>Load More</button>
        )
    }
}

export default LoadButton