// DO NOT DELETE

// import * as React from 'react' /*reactをインポート*/
import './App.css'
import React from 'react';/*useStateをインポート*/
import { Header } from './Header';
import { Description } from './Description';
import { DogListContainer } from './DogListContainer';

/**
 *
 * @type {React.FC}
 */

export const App = () => {
  // const imgUrl = 'https://images.dog.ceo/breeds/rottweiler/n02106550_1889.jpg';
  // const [dogUrl,setDogUrl] = useState(imgUrl);

  // async function getImg() {
  //   const res = await fetch('https://dog.ceo/api/breeds/image/random');
  //   console.log(res);
  //   const json = await res.json();
  //   // console.log(json)
  //   // console.log(json.message)
  //   if(!json.status === 'success'){
  //     alert('no data found')
  //     // throw new Error('no data found');
  //   }
  //   return setDogUrl(json.message);
  // }

  return (
    <div>
      <Header />
      <Description />
      <DogListContainer />
    </div>
  )
}
