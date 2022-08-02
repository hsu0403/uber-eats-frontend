/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontLoginMutation
// ====================================================

export interface FrontLoginMutation_logIn {
  __typename: "LogInOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface FrontLoginMutation {
  logIn: FrontLoginMutation_logIn;
}

export interface FrontLoginMutationVariables {
  loginInput: LogInInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LogInInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
