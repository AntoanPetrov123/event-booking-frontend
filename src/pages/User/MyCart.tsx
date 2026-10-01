import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const MyCart = () => {
    const cart = useSelector(
      (state: RootState) => state.cart
    );

    console.log(cart.items);
    

    return <h1>My Cart, selected tickets</h1>;
}

export default MyCart;