import "./scss/app.scss";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import { createContext, useState, Provider, memo } from "react";
export const ContextSearchValue = createContext(null);
export const ContextValueInput = createContext(null);
function App() {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  return (
    <div className="App">
      <Routes>
        <Route
          element={
            <ContextSearchValue.Provider
              value={{ searchValue, setSearchValue }}
            >
              <Layout />
            </ContextSearchValue.Provider>
          }
        >
          <Route
            path="/"
            element={
              <ContextValueInput.Provider value={searchValue}>
                <Home />
              </ContextValueInput.Provider>
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
