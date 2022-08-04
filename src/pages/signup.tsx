import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import uberLogo from "../images/logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FrontCreateAccountMutation,
  FrontCreateAccountMutationVariables,
  UserRole,
} from "../mytypes";
import { useNavigate } from "react-router-dom";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation FrontCreateAccountMutation(
    $createAccountInput: CreateAccountInput!
  ) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const navigate = useNavigate();

  const onCompleted = (data: FrontCreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      navigate("/", { replace: true });
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<
    FrontCreateAccountMutation,
    FrontCreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });
  const onSubmit: SubmitHandler<ICreateAccountForm> = (data) => {
    if (!loading) {
      const { email, password, role } = data;
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Create Account | Uber-Eats</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-screen-sm flex flex-col items-center">
          <div className="bg-white w-full max-w-lg py-8 rounded-md text-center">
            <img
              src={uberLogo}
              alt="ubereats-logo"
              className="mx-auto mb-6 w-56"
            />
            <h4 className="w-full font-medium text-start text-3xl ml-5 mb-5">
              Let's get started
            </h4>
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
                placeholder="Eamil"
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
              <select
                {...register("role", { required: "Role is required" })}
                className="text-red-400 rounded-md px-5 py-3 focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 shadow-sm transition-colors"
              >
                {Object.keys(UserRole).map((role, index) => (
                  <option key={index} className="text-black" value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <Button
                canClick={isValid}
                loading={loading}
                actionText="Create Account"
              />
              {createAccountMutationResult?.createAccount.error && (
                <FormError
                  errorMessage={createAccountMutationResult.createAccount.error}
                />
              )}
            </form>
            <div className="mt-4">
              Already have an account?{" "}
              <Link className="text-red-500 hover:underline" to="/">
                Go to Login &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
