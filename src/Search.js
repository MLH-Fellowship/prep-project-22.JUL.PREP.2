import React, { Component } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./search.css";

const autocompleteURL =
  "https://autocomplete.search.hereapi.com/v1/autocomplete?";

function autoCompleteCity(city) {
  if (!city) return Promise.resolve([]);

  const query = `q=${city}&limit=4&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
  return fetch(`${autocompleteURL}${query}`)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (!result.items) return [];
      const set = result.items.map(
        (item) => `${item.address.city}, ${item.address.countryName}`
      );
      const uniqueCities = [...new Set(set)];

      let newitems = [];
      let count = 0;
      uniqueCities.forEach((city) => {
        newitems.push({ id: count, name: city });
        count += 1;
      });

      return newitems;
    });
}

export default function SearchBox({ setCity }) {
  const [searchText, setSearchText] = React.useState("");
  const [items, setItems] = React.useState([]);

  const _handleOnSearch = async (searchText) => {
    const items = await autoCompleteCity(searchText);
    console.log(items);
    setItems(items);
    setSearchText(searchText);
  };

  const _handleOnSelect = ({ name }) => {
    setSearchText(name);
    setCity(name);
  };

  return (
    <>
      <div className="search-box">
        <header className="box-header">
          <ReactSearchAutocomplete
            items={items}
            showNoResults={true}
            onSearch={_handleOnSearch}
            onSelect={_handleOnSelect}
            autoFocus
            styling={{
              borderRadius: "12px",
            }}
            useCaching
            placeholder="Search for a city"
          />
        </header>
      </div>
    </>
  );
}
