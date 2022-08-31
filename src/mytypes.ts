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
// GraphQL query operation: FrontFindCategory
// ====================================================

export interface FrontFindCategory_findCategory_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface FrontFindCategory_findCategory_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: FrontFindCategory_findCategory_restaurants_category | null;
}

export interface FrontFindCategory_findCategory_category {
  __typename: "Category";
  id: number;
  name: string;
  iconImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface FrontFindCategory_findCategory {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: FrontFindCategory_findCategory_restaurants[] | null;
  category: FrontFindCategory_findCategory_category | null;
}

export interface FrontFindCategory {
  findCategory: FrontFindCategory_findCategory;
}

export interface FrontFindCategoryVariables {
  input: CategoryInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrontRestaurant
// ====================================================

export interface FrontRestaurant_restaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface FrontRestaurant_restaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface FrontRestaurant_restaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: FrontRestaurant_restaurant_restaurant_menu_options_choices[] | null;
}

export interface FrontRestaurant_restaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: FrontRestaurant_restaurant_restaurant_menu_options[] | null;
}

export interface FrontRestaurant_restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: FrontRestaurant_restaurant_restaurant_category | null;
  menu: FrontRestaurant_restaurant_restaurant_menu[] | null;
}

export interface FrontRestaurant_restaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: FrontRestaurant_restaurant_restaurant | null;
}

export interface FrontRestaurant {
  restaurant: FrontRestaurant_restaurant;
}

export interface FrontRestaurantVariables {
  input: RestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontCreateOrder
// ====================================================

export interface FrontCreateOrder_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  error: string | null;
  orderId: number | null;
}

export interface FrontCreateOrder {
  createOrder: FrontCreateOrder_createOrder;
}

export interface FrontCreateOrderVariables {
  input: CreateOrderInput;
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
// GraphQL query operation: FrontSearchRestaurant
// ====================================================

export interface FrontSearchRestaurant_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface FrontSearchRestaurant_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: FrontSearchRestaurant_searchRestaurant_restaurants_category | null;
}

export interface FrontSearchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: FrontSearchRestaurant_searchRestaurant_restaurants[] | null;
}

export interface FrontSearchRestaurant {
  searchRestaurant: FrontSearchRestaurant_searchRestaurant;
}

export interface FrontSearchRestaurantVariables {
  input: SearchRestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: FrontCookedOrders
// ====================================================

export interface FrontCookedOrders_cookedOrders_driver {
  __typename: "User";
  email: string;
}

export interface FrontCookedOrders_cookedOrders_customer {
  __typename: "User";
  email: string;
}

export interface FrontCookedOrders_cookedOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FrontCookedOrders_cookedOrders_items_dish {
  __typename: "Dish";
  name: string;
}

export interface FrontCookedOrders_cookedOrders_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
}

export interface FrontCookedOrders_cookedOrders_items {
  __typename: "OrderItem";
  dish: FrontCookedOrders_cookedOrders_items_dish | null;
  options: FrontCookedOrders_cookedOrders_items_options[] | null;
}

export interface FrontCookedOrders_cookedOrders_destination {
  __typename: "Destination";
  lat: number;
  lng: number;
}

export interface FrontCookedOrders_cookedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FrontCookedOrders_cookedOrders_driver | null;
  customer: FrontCookedOrders_cookedOrders_customer | null;
  restaurant: FrontCookedOrders_cookedOrders_restaurant | null;
  items: FrontCookedOrders_cookedOrders_items[];
  destination: FrontCookedOrders_cookedOrders_destination;
}

export interface FrontCookedOrders {
  cookedOrders: FrontCookedOrders_cookedOrders;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontTakeOrder
// ====================================================

export interface FrontTakeOrder_takeOrder {
  __typename: "TakeOrderOutput";
  ok: boolean;
  error: string | null;
  orderId: number | null;
}

export interface FrontTakeOrder {
  takeOrder: FrontTakeOrder_takeOrder;
}

export interface FrontTakeOrderVariables {
  input: TakeOrderInput;
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
// GraphQL query operation: FrontGetOrders
// ====================================================

export interface FrontGetOrders_getOrders_orders_driver {
  __typename: "User";
  email: string;
}

export interface FrontGetOrders_getOrders_orders_customer {
  __typename: "User";
  email: string;
}

export interface FrontGetOrders_getOrders_orders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FrontGetOrders_getOrders_orders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FrontGetOrders_getOrders_orders_driver | null;
  customer: FrontGetOrders_getOrders_orders_customer | null;
  restaurant: FrontGetOrders_getOrders_orders_restaurant | null;
}

export interface FrontGetOrders_getOrders {
  __typename: "GetOrdersOutput";
  totalPages: number | null;
  totalResults: number | null;
  ok: boolean;
  error: string | null;
  orders: FrontGetOrders_getOrders_orders[] | null;
}

export interface FrontGetOrders {
  getOrders: FrontGetOrders_getOrders;
}

export interface FrontGetOrdersVariables {
  input: GetOrdersInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrontGetOrder
// ====================================================

export interface FrontGetOrder_getOrder_order_driver {
  __typename: "User";
  email: string;
}

export interface FrontGetOrder_getOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface FrontGetOrder_getOrder_order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FrontGetOrder_getOrder_order_items_dish {
  __typename: "Dish";
  name: string;
}

export interface FrontGetOrder_getOrder_order_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
}

export interface FrontGetOrder_getOrder_order_items {
  __typename: "OrderItem";
  dish: FrontGetOrder_getOrder_order_items_dish | null;
  options: FrontGetOrder_getOrder_order_items_options[] | null;
}

export interface FrontGetOrder_getOrder_order_destination {
  __typename: "Destination";
  lat: number;
  lng: number;
}

export interface FrontGetOrder_getOrder_order {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FrontGetOrder_getOrder_order_driver | null;
  customer: FrontGetOrder_getOrder_order_customer | null;
  restaurant: FrontGetOrder_getOrder_order_restaurant | null;
  items: FrontGetOrder_getOrder_order_items[];
  destination: FrontGetOrder_getOrder_order_destination;
}

export interface FrontGetOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: FrontGetOrder_getOrder_order | null;
}

export interface FrontGetOrder {
  getOrder: FrontGetOrder_getOrder;
}

export interface FrontGetOrderVariables {
  input: GetOrderInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: FrontOrderUpdates
// ====================================================

export interface FrontOrderUpdates_orderUpdates_driver {
  __typename: "User";
  email: string;
}

export interface FrontOrderUpdates_orderUpdates_customer {
  __typename: "User";
  email: string;
}

export interface FrontOrderUpdates_orderUpdates_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FrontOrderUpdates_orderUpdates_items_dish {
  __typename: "Dish";
  name: string;
}

export interface FrontOrderUpdates_orderUpdates_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
}

export interface FrontOrderUpdates_orderUpdates_items {
  __typename: "OrderItem";
  dish: FrontOrderUpdates_orderUpdates_items_dish | null;
  options: FrontOrderUpdates_orderUpdates_items_options[] | null;
}

export interface FrontOrderUpdates_orderUpdates_destination {
  __typename: "Destination";
  lat: number;
  lng: number;
}

export interface FrontOrderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FrontOrderUpdates_orderUpdates_driver | null;
  customer: FrontOrderUpdates_orderUpdates_customer | null;
  restaurant: FrontOrderUpdates_orderUpdates_restaurant | null;
  items: FrontOrderUpdates_orderUpdates_items[];
  destination: FrontOrderUpdates_orderUpdates_destination;
}

export interface FrontOrderUpdates {
  orderUpdates: FrontOrderUpdates_orderUpdates;
}

export interface FrontOrderUpdatesVariables {
  input: OrderUpdatesInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontEditOrder
// ====================================================

export interface FrontEditOrder_editOrder {
  __typename: "EditOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface FrontEditOrder {
  editOrder: FrontEditOrder_editOrder;
}

export interface FrontEditOrderVariables {
  input: EditOrderInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontCreateDish
// ====================================================

export interface FrontCreateDish_createDish {
  __typename: "CreateDishOutput";
  ok: boolean;
  error: string | null;
}

export interface FrontCreateDish {
  createDish: FrontCreateDish_createDish;
}

export interface FrontCreateDishVariables {
  input: CreateDishInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontCreateRestaurant
// ====================================================

export interface FrontCreateRestaurant_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurantId: number;
}

export interface FrontCreateRestaurant {
  createRestaurant: FrontCreateRestaurant_createRestaurant;
}

export interface FrontCreateRestaurantVariables {
  input: CreateRestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrontMyRestaurant
// ====================================================

export interface FrontMyRestaurant_myRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface FrontMyRestaurant_myRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface FrontMyRestaurant_myRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: FrontMyRestaurant_myRestaurant_restaurant_menu_options_choices[] | null;
}

export interface FrontMyRestaurant_myRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: FrontMyRestaurant_myRestaurant_restaurant_menu_options[] | null;
}

export interface FrontMyRestaurant_myRestaurant_restaurant_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface FrontMyRestaurant_myRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: FrontMyRestaurant_myRestaurant_restaurant_category | null;
  menu: FrontMyRestaurant_myRestaurant_restaurant_menu[] | null;
  orders: FrontMyRestaurant_myRestaurant_restaurant_orders[];
}

export interface FrontMyRestaurant_myRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: FrontMyRestaurant_myRestaurant_restaurant | null;
}

export interface FrontMyRestaurant {
  myRestaurant: FrontMyRestaurant_myRestaurant;
}

export interface FrontMyRestaurantVariables {
  input: MyRestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FrontCreatePayment
// ====================================================

export interface FrontCreatePayment_createPayment {
  __typename: "CreatePaymentOutput";
  ok: boolean;
  error: string | null;
}

export interface FrontCreatePayment {
  createPayment: FrontCreatePayment_createPayment;
}

export interface FrontCreatePaymentVariables {
  input: CreatePaymentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: FrontPendingOrders
// ====================================================

export interface FrontPendingOrders_pendingOrders_driver {
  __typename: "User";
  email: string;
}

export interface FrontPendingOrders_pendingOrders_customer {
  __typename: "User";
  email: string;
}

export interface FrontPendingOrders_pendingOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FrontPendingOrders_pendingOrders_items_dish {
  __typename: "Dish";
  name: string;
}

export interface FrontPendingOrders_pendingOrders_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
}

export interface FrontPendingOrders_pendingOrders_items {
  __typename: "OrderItem";
  dish: FrontPendingOrders_pendingOrders_items_dish | null;
  options: FrontPendingOrders_pendingOrders_items_options[] | null;
}

export interface FrontPendingOrders_pendingOrders_destination {
  __typename: "Destination";
  lat: number;
  lng: number;
}

export interface FrontPendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FrontPendingOrders_pendingOrders_driver | null;
  customer: FrontPendingOrders_pendingOrders_customer | null;
  restaurant: FrontPendingOrders_pendingOrders_restaurant | null;
  items: FrontPendingOrders_pendingOrders_items[];
  destination: FrontPendingOrders_pendingOrders_destination;
}

export interface FrontPendingOrders {
  pendingOrders: FrontPendingOrders_pendingOrders;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrontMyRestaurants
// ====================================================

export interface FrontMyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface FrontMyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: FrontMyRestaurants_myRestaurants_restaurants_category | null;
}

export interface FrontMyRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: FrontMyRestaurants_myRestaurants_restaurants[] | null;
}

export interface FrontMyRestaurants {
  myRestaurants: FrontMyRestaurants_myRestaurants;
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
// GraphQL fragment: RestaurantParts
// ====================================================

export interface RestaurantParts_category {
  __typename: "Category";
  name: string;
}

export interface RestaurantParts {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
  category: RestaurantParts_category | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryParts
// ====================================================

export interface CategoryParts {
  __typename: "Category";
  id: number;
  name: string;
  iconImg: string | null;
  slug: string;
  restaurantCount: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishParts
// ====================================================

export interface DishParts_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DishParts_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: DishParts_options_choices[] | null;
}

export interface DishParts {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: DishParts_options[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderParts
// ====================================================

export interface OrderParts {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullOrderParts
// ====================================================

export interface FullOrderParts_driver {
  __typename: "User";
  email: string;
}

export interface FullOrderParts_customer {
  __typename: "User";
  email: string;
}

export interface FullOrderParts_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FullOrderParts_items_dish {
  __typename: "Dish";
  name: string;
}

export interface FullOrderParts_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
}

export interface FullOrderParts_items {
  __typename: "OrderItem";
  dish: FullOrderParts_items_dish | null;
  options: FullOrderParts_items_options[] | null;
}

export interface FullOrderParts_destination {
  __typename: "Destination";
  lat: number;
  lng: number;
}

export interface FullOrderParts {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FullOrderParts_driver | null;
  customer: FullOrderParts_customer | null;
  restaurant: FullOrderParts_restaurant | null;
  items: FullOrderParts_items[];
  destination: FullOrderParts_destination;
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

export enum OrderStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  description: string;
  name: string;
  options?: DishOptionInputType[] | null;
  photo?: string | null;
  price: number;
  restaurantId: number;
}

export interface CreateOrderInput {
  destination: DestinationInputType;
  items: CreateOrderItemInput[];
  restaurantId: number;
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreatePaymentInput {
  restaurantId: number;
  transactionId: string;
}

export interface CreateRestaurantInput {
  address: string;
  categoryName: string;
  coverImg: string;
  name: string;
}

export interface DestinationInputType {
  lat: number;
  lng: number;
}

export interface DishChoicesInputType {
  extra?: number | null;
  name: string;
}

export interface DishOptionInputType {
  choices?: DishChoicesInputType[] | null;
  extra?: number | null;
  name: string;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface GetOrdersInput {
  page: number;
  status?: OrderStatus | null;
}

export interface LogInInput {
  email: string;
  password: string;
}

export interface MyRestaurantInput {
  id: number;
}

export interface OrderItemOptionInputType {
  choice?: string | null;
  name: string;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface TakeOrderInput {
  id: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
