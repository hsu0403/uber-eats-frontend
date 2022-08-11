import { gql, useQuery } from "@apollo/client";
import { FrontMeQuery } from "../mytypes";

export const ME_QUERY = gql`
  query FrontMeQuery {
    me {
      id
      email
      role
      emailVerified
    }
  }
`;

export const useMe = () => {
  return useQuery<FrontMeQuery>(ME_QUERY);
};
