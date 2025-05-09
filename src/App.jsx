import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Menu from './Menu';
import OrderSummary from './OrderSummary';
import { generateOrderJson } from './utils';

function App() {
  const [orderItems, setOrderItems] = useState([]);
  const [generalNote, setGeneralNote] = useState('');
  const [generatedJson, setGeneratedJson] = useState(null);

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
    const json = generateOrderJson(orderItems, generalNote);
    setGeneratedJson(json);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Online Menu
      </Typography>
      <Menu handleAddToOrder={handleAddToOrder} />
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
      />
    </Container>
  );
}

export default App;
