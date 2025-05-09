import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import products from './data/products.json';

function Menu({ handleAddToOrder }) {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid   key={product.id}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, '&:hover': { boxShadow: 6, transform: 'scale(1.05)', transition: 'all 0.3s ease' } }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category.name}
                </Typography>
              </Box>

              <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                {product.price} ALL
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => handleAddToOrder(product)}
                endIcon={<ShoppingCartIcon />}
              >
                Add to Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Menu;
