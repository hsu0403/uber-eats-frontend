import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { FrontVerifyEmail, FrontVerifyEmailVariables } from "../../mytypes";
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const VERIFY_EAMIL_MUTATION = gql`
  mutation FrontVerifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const navigate = useNavigate();
  const onCompleted = (data: FrontVerifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            emailVerified
          }
        `,
        data: {
          emailVerified: true,
        },
      });
      navigate("/", { replace: true });
    }
  };
  const [verifyEmail] = useMutation<
    FrontVerifyEmail,
    FrontVerifyEmailVariables
  >(VERIFY_EAMIL_MUTATION, { onCompleted });

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        verifyEmailInput: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Uber-Eats</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
