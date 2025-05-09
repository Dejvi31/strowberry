import { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  Grid
} from '@mui/material';
import products from './data/products.json';

function App() {
  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = (product) => {
    if (!orderItems.find((item) => item.id === product.id)) {
      setOrderItems([...orderItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Online Menu
      </Typography>

      <List>
        {products.map((product) => (
          <Paper key={product.id} elevation={3} sx={{ mb: 2, borderRadius: 2 }}>
            <ListItem
              component='button'
              onClick={() => handleAddToOrder(product)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                p: 2,
                gap: 1,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Grid container justifyContent="space-between" width="100%">
                <Typography variant="body1">{product.price} ALL</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category.name}
                </Typography>
              </Grid>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default App;
