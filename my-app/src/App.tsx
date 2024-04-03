import { Suspense, lazy } from "react";
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
          <Route path="project-pizza" element={<Home />} />
          <Route
            path="/project-pizza/cart"
            element={
              <Suspense fallback="Loading....">
                <Cart />
              </Suspense>
            }
          />
          <Route path="project-pizza/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
