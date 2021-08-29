import React from 'react';

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  }
  
  return(
    <footer>
      <div className="row">
        <div className="col-xs-12">
          <p>{getCurrentYear()} COOKING SOUS VIV | Designed by Alex Koenig</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;