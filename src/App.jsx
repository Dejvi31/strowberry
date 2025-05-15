import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from './Menu';
import OrderSummary from './OrderSummary';
import { generateOrderJson } from './utils';
import products from './data/products.json';

function App() {
  const [orderItems, setOrderItems] = useState([]);
  const [generalNote, setGeneralNote] = useState('');
  const [generatedJson, setGeneratedJson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleAddToOrder = (product) => {
    if (!orderItems.find((item) => item.id === product.id)) {
      setOrderItems([...orderItems, { ...product, quantity: 1, productNote: '' }]);
    }
  };

  const handleRemoveFromOrder = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setOrderItems(orderItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setOrderItems(orderItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleProductNoteChange = (id, note) => {
    setOrderItems(orderItems.map((item) =>
      item.id === id ? { ...item, productNote: note } : item
    ));
  };

  const handleSubmitOrder = () => {
    const json = generateOrderJson(orderItems, generalNote, totalPrice);
    setGeneratedJson(json);
  };

  const totalPrice = orderItems.reduce((total, item)=> total + item.price * item.quantity, 0)

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.category.name === selectedCategory : true;
    const matchesSearch = searchTerm ? p.name.toLowerCase().includes(searchTerm.toLowerCase()): true;
    return matchesCategory && matchesSearch
  })
  
  const categories = [...new Set(products.map(p => p.category.name))];

  const handleClearOrder = () => {
    if (window.confirm("Are you sure you want to clear the order?")) {
      setOrderItems([]);
      setGeneralNote('');
      setGeneratedJson(null)
    }
  }
return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        backgroundColor: '#f8f8f8',
        borderRadius: 2,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Online Menu
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Menu 
         handleAddToOrder={handleAddToOrder}
         filteredProducts={filteredProducts}
         setSearchTerm={setSearchTerm}
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
         categories={categories}
         />
      </Box>

      <Box sx={{ mt: 2 }}>
        <OrderSummary
          orderItems={orderItems}
          generalNote={generalNote}
          setGeneralNote={setGeneralNote}
          handleRemoveFromOrder={handleRemoveFromOrder}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleProductNoteChange={handleProductNoteChange}
          handleSubmitOrder={handleSubmitOrder}
          generatedJson={generatedJson}
          totalPrice={totalPrice}
          handleClearOrder={handleClearOrder}
        />
      </Box>
    </Container>
  );
}

export default App;
