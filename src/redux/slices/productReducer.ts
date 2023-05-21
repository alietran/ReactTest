import { ProductModel } from "../../interface/ProductModel";
import { AppDispatch } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productList from "../../product.json";

interface ProductState {
  productList: ProductModel[] | null;
  productDetail: ProductModel | null;
}

function getAllProduct(): ProductModel[] | null {
  const productArray = localStorage.getItem("productList");
  if (productArray) {
    return JSON.parse(productArray);
  } else {
    return null;
  }
}

const initialState: ProductState = {
  productList: getAllProduct() || productList,
  productDetail: null,
};

const product = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    deleteSuccess: (state: ProductState, action: PayloadAction<string>) => {
      console.log("action.payload", action.payload);
      const index = state.productList?.findIndex(
        (item) => item.maSanPham === action.payload
      );
      console.log("index", index);
      if (index !== undefined && index !== -1) {
        state.productList?.splice(index, 1);
      }
      localStorage.setItem("productList", JSON.stringify(state.productList));
    },
    getDetailProductSuccess: (
      state: ProductState,
      action: PayloadAction<string>
    ) => {
      const productItem = state.productList?.filter(
        (item) => item.maSanPham === action.payload
      );

      if (productItem) {
        console.log("state.productItem", productItem[0]);
        state.productDetail = productItem[0];
      }
    },
    addProductSuccess: (
      state: ProductState,
      action: PayloadAction<ProductModel>
    ) => {
      console.log("action.payload", action.payload);
      state.productList?.push(action.payload);
      localStorage.setItem("productList", JSON.stringify(state.productList));
    },
    editProductSuccess: (
      state: ProductState,
      action: PayloadAction<{ id: string; product: ProductModel }>
    ) => {
      const index = state.productList?.findIndex(
        (item) => item.maSanPham === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.productList) {
        state.productList[index] = action.payload.product;
      }
      console.log("action.payload", action.payload);
      localStorage.setItem("productList", JSON.stringify(state.productList));
    },
  },
});

export const {
  deleteSuccess,
  addProductSuccess,
  getDetailProductSuccess,
  editProductSuccess,
} = product.actions;

export function deleteProduct(id: string) {
  return async (dispatch: AppDispatch) => {
    try {
      console.log("id", id);
      dispatch(deleteSuccess(id));
    } catch (error) {}
  };
}
export function addProduct(product: ProductModel) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(addProductSuccess(product));
    } catch (error) {}
  };
}
export function getProduct(product: ProductModel) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(addProductSuccess(product));
    } catch (error) {}
  };
}
export function getDetailProduct(id: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getDetailProductSuccess(id));
    } catch (error) {}
  };
}

export const editProduct = (id: string, product: ProductModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const action: PayloadAction<{ id: string; product: ProductModel }> =
        editProductSuccess({
          id,
          product,
        });
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default product.reducer;
