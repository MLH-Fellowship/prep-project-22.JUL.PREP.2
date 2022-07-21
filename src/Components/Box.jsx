import React, { useEffect } from "react";
import '../assets/css/Box.css';
import requiredThings from "../helper/requiredThings";


function Item(props) {
	return (
		<div className="flex required-thing">
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


export default Box;

