// DO NOT DELETE

// import * as React from 'react' /*reactをインポート*/
import './App.css'
import React, { useState } from 'react';/*useStateをインポート*/
/**
 *
 * @type {React.FC}
 */

export const App = () => {
  const imgUrl = 'https://images.dog.ceo/breeds/rottweiler/n02106550_1889.jpg';
  const [dogUrl,setDogUrl] = useState(imgUrl);

  async function getImg() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    console.log(res);
    const json = await res.json();
    // console.log(json)
    // console.log(json.message)
      if(!json.status === 'success'){
        throw new Error('no data found');
      }
    return setDogUrl(json.message);
    }

  return (
    <div>
      <header>
        <h1>DOGアプリ</h1>
        <p>Dog APIは無料で利用できる、APIです。犬の画像が取得できます。</p>
      </header>
      <div className='main'>
        <img className = 'dog-img' src = {dogUrl} alt='犬の画像'/>
        <button onClick = {() => {getImg()}}>更新</button>
      </div>
    </div>
  )
}

