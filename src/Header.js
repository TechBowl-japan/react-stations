// DO NOT DELETE
import * as React from 'react'
import './App.css'

function Header(props) {
  return (
    <div className="App-header">
      <header>
        <h1>{props.name}</h1>
      </header>
    </div>
  )
}

export default Header;
