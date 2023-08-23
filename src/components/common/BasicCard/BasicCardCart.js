import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

function BasicCardCart({ productCode, description, price, amount, handleClickAdd, handleClickSubtract}) {

  return (
    <Card sx={{ minWidth: 275, display:"flex"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {productCode}
        </Typography>
        <Typography variant="h5" component="div">
          {description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          C {price}
        </Typography>
      </CardContent>
      <CardActions sx={{marginLeft:20}}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={()=>handleClickAdd(productCode)}>+</Button>
          <Button>
            {amount}
          </Button>
          <Button onClick={()=>handleClickSubtract(productCode)}>-</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

export default BasicCardCart;
