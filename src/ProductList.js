import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
  Suspense,
  lazy,
} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./context/DataContext";
import { CartContext } from "./context/CartContext";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  IconButton,
  Popover,
  Badge,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./ProductList.css";

const SearchFilter = lazy(() => import("./SearchFilter"));
const CategoryFilter = lazy(() => import("./CategoryFilter"));
const SortFilter = lazy(() => import("./SortFilter"));

const ProductList = () => {
  const {
    products,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    setLoading,
  } = useContext(ProductContext);
  const { cart, setCart, addToCart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || ""
  );
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || ""
  );
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [page] = useState(Number(localStorage.getItem("page")) || 0);
  const [setError] = useState(null);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    try {
      setLoading(true);
      localStorage.setItem("selectedCategory", selectedCategory);
      localStorage.setItem("sortOrder", sortOrder);
      localStorage.setItem("searchTerm", searchTerm);
      localStorage.setItem("page", page);
      localStorage.setItem("cart", JSON.stringify(cart));
      setLoading(false);
    } catch (err) {
      setError("Failed to save data. Try again later.");
      setLoading(false);
    }
  }, [
    selectedCategory,
    setLoading,
    setError,
    sortOrder,
    searchTerm,
    page,
    cart,
  ]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((product) => product.main_category)
    );
    return Array.from(uniqueCategories);
  }, [products]);

  // Filter products by category first
  const categoryFilteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.main_category === selectedCategory)
      : products;
  }, [products, selectedCategory]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return categoryFilteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryFilteredProducts, searchTerm]);

  // Sort products by price
  const sortedProducts = useMemo(() => {
    if (!sortOrder) return filteredProducts;
    return [...filteredProducts].sort((a, b) =>
      sortOrder === "asc" ? a.mrp.mrp - b.mrp.mrp : b.mrp.mrp - a.mrp.mrp
    );
  }, [filteredProducts, sortOrder]);

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} variant="square" />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "price", headerName: "Price (₹)", width: 150 },
    {
      field: "action",
      headerName: "Add to Cart",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            addToCart(params.row);
          }}
        >
          Add
        </Button>
      ),
    },
  ];

  const rows = sortedProducts.map((product, index) => ({
    id: product.id || product.sku_code || index,
    image: product.imageUrl,
    name: product.name,
    category: product.main_category,
    price: product.mrp?.mrp || "Not available",
  }));

  const handleRowClick = (params) => {
    navigate(`/product/${params.id}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Suspense>
        <IconButton
          color="primary"
          onClick={handleCartClick}
          style={{ marginRight: "1rem" }}
        >
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon style={{ fontSize: "2.25rem" }} />
          </Badge>
        </IconButton>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCartClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <div style={{ padding: 20, width: 300 }}>
          <h3>Cart ({cart.length} items)</h3>
          {cart.map((item, index) => (
            <p key={index}>
              {item.name} - ₹{item.price}
            </p>
          ))}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={placeOrder}
            disabled={cart.length === 0}
          >
            Place Order
          </Button>
        </div>
      </Popover>
      <Suspense fallback={<CircularProgress />}>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <SortFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Suspense>

      {loading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          style={{ height: 500 }}
        >
          <CircularProgress color="primary" />
        </Stack>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id}
          labelRowsPerPage=""
          onRowClick={handleRowClick}
          // rowsPerPageOptions={[]}
          loading={loading} // DataGrid's built-in loader
        />
      )}
      <Stack spacing={2} alignItems="center" style={{ marginTop: "20px" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default ProductList;
