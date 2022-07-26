import React from "react";

const fetchFood = (country) =>
  fetch(
    `https://raw.githubusercontent.com/arpitBhalla/arpitBhalla/original/food.json`
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

  return <>Popular in this area{food}</>;
};
