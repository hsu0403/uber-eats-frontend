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

// ====================================================
// GraphQL query operation: FrontRestaurantsPageQuery
// ====================================================

export interface FrontRestaurantsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  iconImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface FrontRestaurantsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: FrontRestaurantsPageQuery_allCategories_categories[] | null;
}

export interface FrontRestaurantsPageQuery_findRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface FrontRestaurantsPageQuery_findRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: FrontRestaurantsPageQuery_findRestaurants_restaurants_category | null;
}

export interface FrontRestaurantsPageQuery_findRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: FrontRestaurantsPageQuery_findRestaurants_restaurants[] | null;
}

export interface FrontRestaurantsPageQuery {
  allCategories: FrontRestaurantsPageQuery_allCategories;
  findRestaurants: FrontRestaurantsPageQuery_findRestaurants;
}

export interface FrontRestaurantsPageQueryVariables {
  input: RestaurantsInput;
}

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
// GraphQL mutation operation: FrontVerifyEmail
// ====================================================

export interface FrontVerifyEmail_verifyEmail {
  __typename: "VerifyEmailOutput";
  ok: boolean;
  error: string | null;
}

export interface FrontVerifyEmail {
  verifyEmail: FrontVerifyEmail_verifyEmail;
}

export interface FrontVerifyEmailVariables {
  verifyEmailInput: VerifyEmailInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontEditProfile
// ====================================================

export interface FrontEditProfile_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface FrontEditProfile {
  editProfile: FrontEditProfile_editProfile;
}

export interface FrontEditProfileVariables {
  editProfileInput: EditProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VerifiedUser
// ====================================================

export interface VerifiedUser {
  __typename: "User";
  emailVerified: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EditedUser
// ====================================================

export interface EditedUser {
  __typename: "User";
  email: string;
  emailVerified: boolean;
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

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface LogInInput {
  email: string;
  password: string;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
