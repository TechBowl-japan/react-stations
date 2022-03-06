// DO NOT DELETE
// import React from 'react';
import React, { useState } from 'react';/*useStateをインポート*/
import { DogImage } from './DogImage';

export const  Description = (props) => {

	const imgUrl = 'https://images.dog.ceo/breeds/rottweiler/n02106550_1889.jpg';
	const [dogUrl,setDogUrl] = useState(imgUrl);

	async function getImg() {
	    const res = await fetch('https://dog.ceo/api/breeds/image/random');
	    // console.log(res);
	    const json = await res.json();
	    // console.log(json)
	    // console.log(json.message)
	    if(!json.status === 'success'){
			alert('no data found')
	      // throw new Error('no data found');
	    }
	    return setDogUrl(json.message);
	}

	return (
	<div className="main">
	<p>Dog APIは無料で利用できる、APIです。犬の画像が取得できます</p>
	{/* <img className="dog-img" src={dogUrl} alt="犬の画像"/> */}
	<DogImage url={dogUrl}/>
	<button onClick={getImg}>更新</button>

	</div>
	)
}
