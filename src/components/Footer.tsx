import React from 'react'
import "./footer.css"

function Footer() {
  return (
    <footer className='footer'>
        <h4>SAPORO</h4>
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  )
}

export default Footer