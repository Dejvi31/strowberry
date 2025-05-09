import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Paper,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function OrderSummary({
  orderItems,
  generalNote,
  setGeneralNote,
  handleRemoveFromOrder,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleProductNoteChange,
  handleSubmitOrder,
  generatedJson
}) {
  return (
    orderItems.length > 0 && (
      <Grid container spacing={3} sx={{ mt: 4 }}>
      
        <Grid item xs={12} sm={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom textAlign="center">
                Order Summary
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {orderItems.map((item) => (
                <Grid container key={item.id} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Grid>
                    <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price} ALL
                    </Typography>
                  </Grid>

                  <Grid>
                    <Grid container spacing={1} alignItems="center">
                      <IconButton
                        variant="outlined"
                        onClick={() => handleDecreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        sx={{
                          borderRadius: '50%',
                          width: 36,
                          height: 36,
                          borderColor: 'primary.main',
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        variant="outlined"
                        onClick={() => handleIncreaseQuantity(item.id)}
                        sx={{
                          borderRadius: '50%',
                          width: 36,
                          height: 36,
                          borderColor: 'primary.main',
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Grid>
                    <IconButton onClick={() => handleRemoveFromOrder(item.id)} sx={{ color: '#d32f2f' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  <Grid>
                    <TextField
                      fullWidth
                      label="Note for this product"
                      value={item.productNote}
                      onChange={(e) => handleProductNoteChange(item.id, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                </Grid>
              ))}

              <Box>
                <TextField
                  fullWidth
                  label="General Note for the Order"
                  value={generalNote}
                  onChange={(e) => setGeneralNote(e.target.value)}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
                />
              </Box>
            </CardContent>

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmitOrder}>
              Submit Order
            </Button>
          </Card>
        </Grid>

       
        <Grid item xs={12} sm={6}>
          {generatedJson && (
            <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" gutterBottom>
                Generated Order JSON:
              </Typography>
              <Paper
                sx={{
                  backgroundColor: '#fafafa',
                  padding: '1rem',
                  borderRadius: 2,
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {JSON.stringify(generatedJson, null, 2)}
                </Typography>
              </Paper>
            </Paper>
          )}
        </Grid>
      </Grid>
    )
  );
}

export default OrderSummary;
