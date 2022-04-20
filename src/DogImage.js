import React from 'react';

export const DogImage = (props) => {

	return (
		<div>
			<img className="dog-img" src={props.url} alt="犬の画像" />
		</div>

	)
}
