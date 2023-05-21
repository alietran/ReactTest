import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { FormikProvider, Form, useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
type Props = {};

export default function Login({}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("Please input your email!"),
    password: yup.string().required("Please input your password!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "ngocdiep@gmail.com",
      password: "testlogin123",
    },
    validationSchema: LoginSchema,
    onSubmit: (user) => {
      if (
        user.email === "ngocdiep@gmail.com" &&
        user.password === "testlogin123"
      ) {
        navigate("/");
      } else {
        setErrorLogin(true);
        console.log("errorLogin", errorLogin);
      }
    },
  });
  const { errors, touched, getFieldProps } = formik;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box className="flex mt-28 mx-16 items-center h-full w-[90%] justify-between">
        <Box className="w-[68%] ">
          <img className="my-0 w-[75%]" src="./src/assets/login.jpg" alt="" />
        </Box>
        <Box className="w-[40%] my-3 ">
          <Box>
            {" "}
            <h1 className="!text-left mb-2 text-5xl text-[#262363] font-bold">
              Login
            </h1>
            <p className="text-[#262363] mb-6 ">
              Welcome back to the cellphone store
            </p>
            {errorLogin && (
              <Alert className="mb-8" severity="error">
                Email or password is not correct!
              </Alert>
            )}
          </Box>

          <FormikProvider value={formik}>
            <Form>
              <Stack spacing={4}>
                {" "}
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
              <Button
                className=" !my-7 !bg-[#262363]  font-bold !py-2 !text-lg !normal-case"
                fullWidth
                disabled={errorLogin}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Form>
          </FormikProvider>
        </Box>
      </Box>
    </>
  );
}
