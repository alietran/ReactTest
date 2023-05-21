import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { Button, Stack, Box } from "@mui/material";
import { FormikProvider, useFormik, Form } from "formik";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  addProduct,
  editProduct,
  getDetailProduct,
} from "../../redux/slices/productReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {};

export default function ProductForm({}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productDetail } = useSelector((state: RootState) => {
    return state.product;
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getDetailProduct(id));
    }
  }, [id]);

  console.log("productDetail", productDetail);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenSanPham: productDetail?.tenSanPham || "",
      maSanPham: productDetail?.maSanPham || "",
      moTaSanPham: productDetail?.moTaSanPham || "",
      giaSanPham: Number(productDetail?.giaSanPham) || 0,
      hinhSanPham: productDetail?.hinhSanPham || "",
      namSanXuat: Number(productDetail?.namSanXuat) || 2010,
    },

    onSubmit: (product, { resetForm }) => {
      console.log("product", product);
      if (id) {
        dispatch(editProduct(id, product));
        navigate("/");
      } else {
        dispatch(addProduct(product));
        navigate("/");
      }
      resetForm();
    },
  });

  const { getFieldProps } = formik;

  console.log("id", id);

  return (
    <div>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", margin: "20px 0", fontWeight: "bold", textTransform:"uppercase" }}
      >
        Product Info
      </Typography>
      <FormikProvider value={formik}>
        <Form>
          {" "}
          <Grid
            rowSpacing={3}
            container
            spacing={2}
            sx={{ width: "80%", margin: "0 auto" }}
          >
            <Grid item xs={7}>
              <Stack
                spacing={2}
                sx={{
                  backgroundColor: "white",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <TextField
                  type="text"
                  {...getFieldProps("tenSanPham")}
                  fullWidth
                  id="outlined-error"
                  label="Name"
                />
                <TextField
                  type="text"
                  {...getFieldProps("moTaSanPham")}
                  fullWidth
                  id="outlined-error"
                  label="Description"
                />
                <TextField
                  type="text"
                  {...getFieldProps("hinhSanPham")}
                  fullWidth
                  id="outlined-error"
                  label="Image"
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack
                spacing={2}
                sx={{
                  backgroundColor: "white",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <TextField
                  type="text"
                  {...getFieldProps("maSanPham")}
                  fullWidth
                  id="outlined-error"
                  label="ID"
                />
                <TextField
                  type="number"
                  {...getFieldProps("namSanXuat")}
                  fullWidth
                  id="outlined-error"
                  label="Manufacturing Year"
                />
                <TextField
                  type="number"
                  {...getFieldProps("giaSanPham")}
                  fullWidth
                  id="outlined-error"
                  label="Price"
                />
              </Stack>

              <Button
                fullWidth
                className="!mt-3 !p-2 !rounded-lg"
                size="small"
                type="submit"
                variant="contained"
                color="success"
              >
                {id ? "Save Changes" : "Create "}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}
