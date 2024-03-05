import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TCartItem, addItem } from "../redux/slices/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

type TPizzaBlockProps = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
  category: string;
  rating: number;
};

const PizzaBlock: React.FC<TPizzaBlockProps> = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
  id,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const typesName: string[] = ["тонкое", "традиционное"];
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: TCartItem = {
      id,
      title,
      imageUrl,
      price,
      type: typesName[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      {" "}
      <div className="pizza-block">
        <Link to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((elem: number) => (
              <li
                key={uuidv4()}
                className={activeType === elem ? "active" : ""}
                onClick={() => setActiveType(elem)}
              >
                {typesName[elem]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((elem: number, i: number) => (
              <li
                key={uuidv4()}
                className={activeSize === i ? "active" : ""}
                onClick={() => setActiveSize(i)}
              >
                {elem} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
