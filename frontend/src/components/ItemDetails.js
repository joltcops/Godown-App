import React, { useState, useEffect } from 'react';
import axios from 'axios';
//const apiUrl = "https://obscure-badlands-67498-8ccc889a168e.herokuapp.com/api/";


const ItemDetails = ({ selectedItemId }) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (selectedItemId) {
      axios.get(`http://127.0.0.1:8000/api/items/${selectedItemId}/`)
        .then(response => {
          setItemDetails(response.data);
        })
        .catch(error => {
          console.error("Error fetching item details:", error);
        });
    }
  }, [selectedItemId]);

  if (!itemDetails) {
    return <div>Select an item to view details</div>;
  }

  return (
    <div className="item-details">
      <h2>{itemDetails.name}</h2>
      <p>Category: {itemDetails.category}</p>
      <p>Price: ${itemDetails.price}</p>
      <p>Status: {itemDetails.status}</p>
      <img src={itemDetails.image_url} alt={itemDetails.name} />
    </div>
  );
};

export default ItemDetails;
