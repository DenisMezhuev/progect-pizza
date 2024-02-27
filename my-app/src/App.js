import "./scss/app.scss";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
