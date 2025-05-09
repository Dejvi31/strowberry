import { List, ListItem, Paper, Grid, Typography } from '@mui/material';
import products from './data/products.json';

function Menu({ handleAddToOrder }) {
  return (
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
  );
}

export default Menu;
