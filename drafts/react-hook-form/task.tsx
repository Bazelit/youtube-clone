// "use client";

// import { SubmitHandler, useForm } from "react-hook-form";

// interface ITaskForm {
//   nickname: string;
//   gmail: string;
//   password: string;
//   confirmPassword: string;
// }

// export default function Task() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ITaskForm>();

//   const onSubmit: SubmitHandler<ITaskForm> = (data) => console.log(data);

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//           width: "300px",
//           margin: "0 auto",
//         }}
//       >
//         <input
//           type="nickname"
//           placeholder="Username"
//           {...register("nickname", {
//             required: "Nickname is required",
//             minLength: {
//               value: 2,
//               message: "Nickname must be at least 2 characters",
//             },
//           })}
//         />
//         {errors.nickname && (
//           <p style={{ color: "red" }}>{errors.nickname.message}</p>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           {...register("gmail", {
//             required: "Gmail is required",
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: "Invalid email address",
//             },
//           })}
//         />
//         {errors.gmail && <p style={{ color: "red" }}>{errors.gmail.message}</p>}

//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 8,
//               message: "Password must be at least 8 characters",
//             },
//           })}
//         />
//         {errors.password && (
//           <p style={{ color: "red" }}>{errors.password.message}</p>
//         )}

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           {...register("confirmPassword", {
//             required: "Password is required",
//             minLength: {
//               value: 8,
//               message: "Password must be at least 8 characters",
//             },
//           })}
//         />
//         {errors.confirmPassword && (
//           <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
//         )}

//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

"use client";

import { SubmitHandler, useForm } from "react-hook-form";

interface ITaskForm {
  nickname: string;
  gmail: string;
  password: string;
  confirmPassword: string;
}

export default function Task() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ITaskForm>();

  const password = watch("password");

  const onSubmit: SubmitHandler<ITaskForm> = (data) => console.log(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          {...register("nickname", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.nickname && (
          <p style={{ color: "red" }}>{errors.nickname.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("gmail", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.gmail && <p style={{ color: "red" }}>{errors.gmail.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) => {
              if (!/\d/.test(value)) {
                return "Password must contain at least one digit";
              }
              return true;
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
