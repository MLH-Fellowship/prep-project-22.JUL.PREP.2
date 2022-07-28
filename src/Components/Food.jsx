import React from "react";
import "../assets/css/food.css";

const fetchFood = (country) =>
  fetch(
    `https://raw.githubusercontent.com/arpitBhalla/arpitBhalla/original/db.json`
  )
    .then((res) => res.json())
    .then((res) => {
      return res[country];
    });

export const Food = ({ country }) => {
  const [food, setFood] = React.useState("");

  React.useEffect(() => {
    fetchFood(country).then((food) => setFood(food));
  }, []);

  return (
    <>
      <div className="food">
        Food items popular in this area: <br /> <b> {food} </b>
      </div>
    </>
  );
};
