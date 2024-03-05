import  { Suspense, lazy } from "react";
import "./scss/app.scss";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import FullPizza from "./pages/FullPizza";

const Cart = lazy(() => import("./pages/Cart"));
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback="Loading....">
                <Cart />
              </Suspense>
            }
          />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
