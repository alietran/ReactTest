import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  Button,

} from "@mui/material";
import { deleteProduct } from "../../redux/slices/productReducer";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productList } = useSelector((state: RootState) => state.product);
  const [open, setOpen] = React.useState(false);
  const [idProduct, setIdProduct] = React.useState("");

  const handleOpen = (id: string) => {
    setIdProduct(id);
    setOpen(true);
    // dispatch(deleteProduct(id));
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
    <TableContainer component={Paper} sx={{ width: "80%", margin: "0 auto" }}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="!bg-[#808080]">
          <TableRow>
            <StyledTableCell align="left" sx={{ width: 500 }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList?.map((row) => (
            <StyledTableRow key={row.tenSanPham}>
              <StyledTableCell
                align="left"
                sx={{ width: 500, display: "flex", alignItems: "center" }}
                component="th"
                scope="row"
              >
                <img
                  src={row.hinhSanPham}
                  width={100}
                  height={100}
                  alt=""
                  className="mr-3"
                />
                {row.tenSanPham}
              </StyledTableCell>

              <StyledTableCell align="left">
                <div className="text-red-500 font-bold mt-2">
                  {" "}
                  {row.giaSanPham.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  className=" !mr-2 !bg-[#262363]"
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(row.maSanPham)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleOpen(row.maSanPham)}
                  className=""
                  size="small"
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
}
