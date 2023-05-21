import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { deleteProduct } from "../../redux/slices/productReducer";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
type Props = {};

export default function ProductGrid({}: Props) {
  const { productList } = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [idProduct, setIdProduct] = React.useState("");

  const handleOpen = (id: string) => {
    setIdProduct(id);
    setOpen(true);
   
  };
  const handleDelete = () => {
    dispatch(deleteProduct(idProduct));
    setOpen(false);
  };
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ width: "90%", margin: "0 auto" }}>
        {productList?.map((item, index) => {
          return (
            <Grid item xs={3} key={index} sx={{ margin: " 20px 0" }}>
              <Box sx={{ maxWidth: 250, textAlign: "center" }}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="20"
                    width="20"
                    className="!w-[60%] !h-[60%] mx-auto pt-7"
                    image={item.hinhSanPham}
                  />
                  <CardContent>
                    <p className="font-bold text-sm">{item.tenSanPham}</p>
                    <p className="text-red-500 font-bold mt-2">
                      {item.giaSanPham.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </CardContent>
                </Card>
                <Box className="flex mt-3">
                  <Button
                    className="w-full !mr-2 !bg-[#262363]"
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(item.maSanPham)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="w-full"
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleOpen(item.maSanPham)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
