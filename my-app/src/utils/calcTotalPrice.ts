
import { TCartItem } from "../components/redux/slices/cartSlice";

const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, elem) => (sum += elem.price * elem.count), 0);
};

export default calcTotalPrice;
