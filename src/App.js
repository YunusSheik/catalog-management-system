// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ProductProvider } from "./context/DataContext";
// import ProductList from "./ProductList";
// import ProductDetails from "./ProductDetails";
// import "./App.css";

// const App = () => {
//   return (
//     <ProductProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/product/:productId" element={<ProductDetails />} />
//         </Routes>
//       </Router>
//     </ProductProvider>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import "./App.css";

const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* Wrap everything with CartProvider */}
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  );
};

export default App;
