import Basket from "../Basket";
import CustomCard from "../CustomCard";

const Product = ({ basket, product, addToBasket, RemoveItemFromBasket }) => (
  <CustomCard
    basket={basket}
    product={product}
    addToBasket={addToBasket}
    RemoveItemFromBasket={RemoveItemFromBasket}
  />
);

export default Product;