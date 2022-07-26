import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white w-full max-w-lg py-8 rounded-md text-center">
          <h3 className="font-bold text-2xl text-gray-800 mb-5">WELCOME</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 items-center px-5"
          >
            <input
              {...register("email", { required: "Email is required." })}
              placeholder="Eamil"
              type="email"
              name="email"
              className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70"
            />
            <span className="font-semibold text-red-500">
              {errors.email?.message}
            </span>
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: 8,
              })}
              placeholder="Password"
              type="password"
              name="password"
              className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70"
            />
            {errors.password?.message && (
              <span className="font-semibold text-red-500">
                {errors.password?.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="font-semibold text-red-500">
                The password must be at least 8 digits.
              </span>
            )}
            <button className="bg-red-400 w-full rounded-md px-5 py-2 hover:bg-red-500 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
