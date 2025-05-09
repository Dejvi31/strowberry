import { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import products from './data/products.json';

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
    const json = {
      pospointId: 'restaurant1',
      ordernote: generalNote,
      products: orderItems.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        note: item.productNote || ''
      }))
    };
    setGeneratedJson(json);
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
              component="button"
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

      {orderItems.length > 0 && (
        <Card sx={{ mt: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {orderItems.map((item) => (
              <Grid
                container
                key={item.id}
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Grid>
                  <Typography>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price} ALL
                  </Typography>
                </Grid>

                <Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                  </Grid>
                </Grid>

                <Grid>
                  <IconButton onClick={() => handleRemoveFromOrder(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>

                <Grid width="100%">
                  <TextField
                    fullWidth
                    label="Note for this product"
                    value={item.productNote}
                    onChange={(e) => handleProductNoteChange(item.id, e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            ))}

            <TextField
              fullWidth
              label="General Note for the Order"
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
              variant="outlined"
              size="small"
              multiline
              rows={3}
              sx={{ mt: 2 }}
            />
          </CardContent>

          <Button variant="contained" fullWidth onClick={handleSubmitOrder}>
            Submit Order
          </Button>

          {generatedJson && (
            <Paper sx={{ mt: 2, p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Generated Order JSON:
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(generatedJson, null, 2)}
              </pre>
            </Paper>
          )}
        </Card>
      )}
    </Container>
  );
}

export default App;
