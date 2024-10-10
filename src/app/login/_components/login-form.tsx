"use client";

import { Container, Box, Typography, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LoginInput,
  loginValidation,
} from "@/app/validations/auth/login-validation";
import { useLogin } from "@/hooks/auth/use-login";

export default function LoginForm() {
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginValidation),
  });

  const { isPending, mutate: postLogin } = useLogin({
    options: {
      onSuccess() {
        router.push("/");
      },
      onError() {
        setError("Password atau Username salah");
      },
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    postLogin(data);
  };

  return (
    <Container maxWidth="sm">
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            loading={isPending}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
}
