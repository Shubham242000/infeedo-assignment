import { useEffect, useState } from "react";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  const handleAdd = (item) => {
    let newCartItems = [];

    newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.count++;
      }
      return cartItem;
    });

    setCartItems(newCartItems);
  };

  const handleSub = (item) => {
    let newCartItems = [];

    if (item.count === 1) {
      newCartItems = cartItems.filter((cartItem) => item.id != cartItem.id);
      setCartItems(newCartItems);
      return;
    }

    newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.count--;
      }
      return cartItem;
    });

    setCartItems(newCartItems);
  };

  return (
    <div>
      <h1>Cart</h1>
      <div style={{ display: "flex", gap: "100px", flexWrap: "wrap" }}>
        <div>
          <h2>products</h2>
          {isLoading ? (
            <h3 style={{ color: "crimson" }}>loading...</h3>
          ) : (
            products.map((p) => (
              <ProductItem
                key={p.id}
                item={p}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ))
          )}
        </div>
        <div>
          <h2>cart items</h2>
          {cartItems.length > 0
            ? cartItems.map((cartItem) => (
                <div
                  style={{
                    margin: "10px 0",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  {cartItem.title}{" "}
                  <span style={{ background: "aqua" }}>
                    {" "}
                    Count = {cartItem.count}
                  </span>{" "}
                  <button onClick={() => handleAdd(cartItem)}>+</button>
                  <button onClick={() => handleSub(cartItem)}>-</button>
                </div>
              ))
            : "No Items in the cart, select something from products!"}
        </div>
      </div>
    </div>
  );
}

export default App;

const ProductItem = ({ item, cartItems, setCartItems }) => {
  const handleClick = () => {
    let doesExists = false;

    cartItems.forEach((cartItem) => {
      if (cartItem.id === item.id) doesExists = true;
    });

    let newCartItems = [];

    if (doesExists) {
      newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.count++;
        }
        return cartItem;
      });

      setCartItems(newCartItems);
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          ...item,
          count: 1,
        },
      ]);
    }
  };
  return (
    <div
      onClick={handleClick}
      style={{
        width: "20rem",
        padding: "8px",
        border: "1px solid black",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      {item.title}
    </div>
  );
};
