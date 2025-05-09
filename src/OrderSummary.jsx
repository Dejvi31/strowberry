import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Card sx={{ mt: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Overview
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {orderItems.map((item) => (
            <Grid container key={item.id} justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Grid>
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price} ALL
                </Typography>
              </Grid>

              <Grid>
                <Grid container spacing={1} alignItems="center">
                  <Button onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</Button>
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
    )
  );
}

export default OrderSummary;
