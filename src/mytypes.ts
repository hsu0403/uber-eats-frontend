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

// ====================================================
// GraphQL mutation operation: FrontCreateAccountMutation
// ====================================================

export interface FrontCreateAccountMutation_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface FrontCreateAccountMutation {
  createAccount: FrontCreateAccountMutation_createAccount;
}

export interface FrontCreateAccountMutationVariables {
  createAccountInput: CreateAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrontMeQuery
// ====================================================

export interface FrontMeQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface FrontMeQuery {
  me: FrontMeQuery_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface LogInInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
