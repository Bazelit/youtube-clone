"use client";

import { SubmitHandler, useForm } from "react-hook-form";

interface ISimpleForm {
  username: string;
  email: string;
}

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISimpleForm>();

  const onSubmit: SubmitHandler<ISimpleForm> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("username", {
          required: "Имя пользователя обязательно",
          minLength: {
            value: 3,
            message: "Минимум 3 символа",
          },
          maxLength: {
            value: 20,
            message: "Максимум 20 символов",
          },
        })}
        placeholder="Username"
      />
      
      {errors.username && (
        <p style={{ color: "red" }}>{errors.username.message}</p>
      )}

      <input
        type="email"
        {...register("email", {
          required: "Email обязателен",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некорректный email",
          },
        })}
        placeholder="Email"
      />

      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
