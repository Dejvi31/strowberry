import { Grid, Card, CardContent, Typography, Button, Box, TextField, Autocomplete } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Menu({ handleAddToOrder, filteredProducts, setSearchTerm, selectedCategory, setSelectedCategory, categories }) {
   return (
    <>
    <Box display='flex' gap={2} sx={{padding: 2}}>
     <TextField
          label="Search Product"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}  
     />

    <Autocomplete
        disablePortal
        options={categories}
        value={selectedCategory}
        onChange={(e, newValue) => setSelectedCategory(newValue)}
        sx={{ width: 400}}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
    </Box>
      
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {filteredProducts.length === 0 ? (
        <Grid>
          <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        No Product Found
      </Typography> 
      </Grid>
      ) : (
 filteredProducts.map((product) => (
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
      )))
    }
    </Grid>
    </>
  );
}

export default Menu;
