import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { FrontLoginMutation, FrontLoginMutationVariables } from "../mytypes";
import uberLogo from "../images/logo.svg";
import { Button } from "../components/button";
import { Link, Location, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LOGIN_MUTATION = gql`
  mutation FrontLoginMutation($loginInput: LogInInput!) {
    logIn(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

interface ILocation {
  email: string;
  password: string;
}

export const Login = () => {
  const location: Location = useLocation();
  const state = location.state as ILocation;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
    defaultValues: {
      email: state ? state.email : "",
      password: state ? state.password : "",
    },
  });
  const onCompleted = (data: FrontLoginMutation) => {
    const {
      logIn: { ok, error, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { loading, error, data: loginMutaionResult }] =
    useMutation<FrontLoginMutation, FrontLoginMutationVariables>(
      LOGIN_MUTATION,
      { onCompleted }
    );
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    if (!loading) {
      const { email, password } = data;
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | Uber-Eats</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-screen-sm flex flex-col items-center">
          <div className="bg-white w-full max-w-lg py-8 rounded-md text-center">
            <img
              src={uberLogo}
              alt="ubereats-logo"
              className="mx-auto mb-6 w-56"
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-3 items-center px-5"
            >
              <input
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                type="email"
                name="email"
                className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
              />
              {errors.email?.message && (
                <FormError errorMessage={errors.email.message} />
              )}
              <input
                {...register("password", {
                  required: "Password is required.",
                  minLength: 8,
                })}
                placeholder="Password"
                type="password"
                name="password"
                className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
              />
              {errors.password?.message && (
                <FormError errorMessage={errors.password.message} />
              )}
              {errors.password?.type === "minLength" && (
                <FormError errorMessage="The password must be at least 8 digits." />
              )}
              <Button
                canClick={isValid}
                loading={loading}
                actionText="Log In"
              />
              {loginMutaionResult?.logIn.error && (
                <FormError errorMessage={loginMutaionResult.logIn.error} />
              )}
            </form>
            <div className="mt-4">
              New to Uber?{" "}
              <Link className="text-red-500 hover:underline" to="/signup">
                Create an Account &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
