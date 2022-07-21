import React, { useEffect } from "react";
import '../assets/css/Box.css';
import requiredThings from "../helper/requiredThings";


function Item(props) {
	return (
		<div className="required-thing">
			<img src={props.img} alt={props.alt} width="50" height="50"></img>
			<p>{props.name}</p>
		</div>
	);
}



function Box(props){
	useEffect(() => {
	  
	console.log(props.weather);
	console.log(requiredThings[props.weather])
	  
	})
	
	return (
		<div className="flex required-things-box">
			{Object.keys(requiredThings[props.weather]).map(item=>{
				return <Item img={requiredThings[props.weather][item]} name={item}/>
			})}
		</div>
	)
}





// class Box extends React.Component {

// 	renderItem(img, description) {
// 		return <Item img={img} alt={description}/>
// 	}

//   render() {
// 		return (
// 			<div className="comp">
// 				{
// 					React.Children.toArray(
// 						Object.keys(requiredThings["Thunderstorm"]).map((item) => 
// 							this.renderItem(requiredThings["Thunderstorm"][item], item)
// 						))
// 			  }
// 			</div>
// 		);
// 	}
// }

export default Box;

