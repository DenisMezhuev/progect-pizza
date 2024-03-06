import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FunctionComponent = () => {
  interface IPizza {
    imageUrl: string;
    title: string;
    price: number;
  }

  const { id } = useParams();
  console.log(id);
  const [pizza, setPizza] = useState<IPizza>();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65dc5231e7edadead7eb99a6.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        const err = error as Error;
        console.log("Ошибка при получении пиццы", err.message);
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
      <button onClick={() => navigate(-1)} className="button button--black">
        <span>Вернуться назад</span>
      </button>
    </div>
  );
};

export default FullPizza;
