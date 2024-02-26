import "./scss/app.scss";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import pizzas from "./assets/pizza.json";
function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((elem) => (
                <PizzaBlock key={uuidv4()} {...elem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
