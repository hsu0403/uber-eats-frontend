import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  FrontCreateRestaurant,
  FrontCreateRestaurantVariables,
} from "../../mytypes";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation FrontCreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  coverImg: FileList;
}

export const AddRestaurant = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [imgUrl, setImgUrl] = useState("");
  const onCompleted = (data: FrontCreateRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { address, categoryName, coverImg, name } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imgUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      navigate("/", { replace: true });
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    FrontCreateRestaurant,
    FrontCreateRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { coverImg, address, categoryName, name } = getValues();
      const actualFile = coverImg[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch("http://localhost:4001/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImgUrl(url);
      createRestaurantMutation({
        variables: {
          input: {
            address,
            categoryName,
            name,
            coverImg: url,
          },
        },
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container flex flex-col items-center justify-center mt-32">
      <Helmet>
        <title>Add Restaurant | Uber-Eats</title>
      </Helmet>
      <h1 className="text-lg font-semibold mb-10 select-none">
        Add Restaurant
      </h1>
      <form
        className="grid gap-3 items-center px-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required.",
            minLength: 2,
            maxLength: 15,
          })}
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
        )}
        {errors.name?.type === "minLength" && (
          <FormError errorMessage="The name must be at least 2 characters long." />
        )}
        {errors.name?.type === "maxLength" && (
          <FormError errorMessage="The name must be up to 15 characters long." />
        )}
        <input
          className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required." })}
        />
        {errors.address?.message && (
          <FormError errorMessage={errors.address.message} />
        )}
        <input
          className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          type="text"
          placeholder="Category Name"
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
        />
        {errors.categoryName?.message && (
          <FormError errorMessage={errors.categoryName.message} />
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            {...register("coverImg", { required: "CoverImg is required." })}
          />
        </div>
        {errors.coverImg?.message && (
          <FormError errorMessage={errors.coverImg.message} />
        )}
        <Button
          canClick={isValid}
          loading={uploading}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
