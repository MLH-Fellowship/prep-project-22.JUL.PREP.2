import React from "react";
import '../assets/css/Box.css';
import requiredThings from "../helper/requiredThings";


function Item(props) {
	return (
		<div className="flex-comp">
			<img src={props.img} alt={props.alt} width="50" height="50"></img>
		</div>
	);
}

class Box extends React.Component {

	renderItem(img, description) {
		return <Item img={img} alt={description}/>
	}

  render() {
		return (
			<div className="comp">
				{
					React.Children.toArray(
						Object.keys(requiredThings["Thunderstorm"]).map((item) => 
							this.renderItem(requiredThings["Thunderstorm"][item], item)
						))
			  }
			</div>
		);
	}
}

export default Box;

