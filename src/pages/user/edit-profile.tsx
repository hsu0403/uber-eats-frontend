import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { FrontEditProfile, FrontEditProfileVariables } from "../../mytypes";

const EDIT_PROFILE_MUTATION = gql`
  mutation FrontEditProfile($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: FrontEditProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              emailVerified
            }
          `,
          data: {
            email: newEmail,
            emailVerified: false,
          },
        });
      }
    }
  };
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    defaultValues: { email: userData?.me.email },
    mode: "onChange",
  });
  const [editProfile, { loading }] = useMutation<
    FrontEditProfile,
    FrontEditProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });
  const onSubmit = () => {
    const { email, password } = getValues();

    editProfile({
      variables: {
        editProfileInput: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Edit Profile | Uber-Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 mb-5 max-w-screen-sm w-full"
      >
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="Email"
          className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          required
        />
        <input
          {...register("password", { minLength: 8 })}
          type="password"
          placeholder="Password"
          className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Update Profile"
        />
      </form>
    </div>
  );
};
