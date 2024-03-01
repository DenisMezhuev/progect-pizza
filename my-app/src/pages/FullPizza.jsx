import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65dc5231e7edadead7eb99a6.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log("Ошибка при получении пиццы", error.message);
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return "Loading...";
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default FullPizza;
