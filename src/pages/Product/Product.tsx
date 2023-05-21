import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";

type Props = {};

export default function Product({}: Props) {
  const { productList } = useSelector((state: RootState) => state.product);


  const [value, setValue] = React.useState("grid");
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  console.log("value", value);

  return (
    <div>
      <p className="text-2xl font-bold text-center mt-5 uppercase">
        Product List
      </p>{" "}
      <div className="flex justify-around  ml-40 my-3">
  
        <div></div>
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
         
          }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            defaultValue="top"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="grid"
              sx={{ marginLeft: 0 }}
              control={<Radio />}
              label="Grid"
              labelPlacement="start"
            />
            <FormControlLabel
              value="list"
              control={<Radio />}
              label="List"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <Button
          className="!px-16"
          size="large"
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add
        </Button>
      </div>
      {value === "grid" ? <ProductGrid /> : <ProductList />}
    </div>
  );
}
