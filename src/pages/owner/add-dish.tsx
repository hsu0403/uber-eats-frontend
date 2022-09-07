import { gql, useMutation } from "@apollo/client";
import { faDeleteLeft, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { FrontCreateDish, FrontCreateDishVariables } from "../../mytypes";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation FrontCreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

type IParams = {
  id: string;
};

interface IFormProps {
  name: string;
  price: string;
  description: string;
  photo: FileList;
  [key: string]: any;
}

interface IOption {
  optionId: number;
  choices: number[];
}

export const AddDish = () => {
  const navigate = useNavigate();
  const { id } = useParams<IParams>();
  const [num, setNum] = useState("");
  const [optionsNumber, setOptionsNumber] = useState<IOption[]>([]);
  const {
    register,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    setValue,
  } = useForm<IFormProps>({ mode: "onChange" });
  const onAddOptionClick = () => {
    setOptionsNumber((prev) => [
      { optionId: Date.now(), choices: [] },
      ...prev,
    ]);
  };
  const onDeleteOption = (idToDelete: number) => {
    optionsNumber.map((obj) => {
      if (obj.optionId === idToDelete) {
        let choices = obj.choices;
        choices.forEach((choiceId) => {
          setValue(`${choiceId}ChoiceName`, "");
          setValue(`${choiceId}ChoiceExtra`, "");
        });
      }
      return obj;
    });
    setOptionsNumber((prev) => prev.filter((id) => id.optionId !== idToDelete));
    setValue(`${idToDelete}OptionName`, "");
    setValue(`${idToDelete}OptionExtra`, "");
  };
  const onAddChoiceClick = (optionId: number) => {
    const newState = optionsNumber.map((obj) => {
      if (obj.optionId === optionId) {
        let choices = obj.choices;
        choices.push(Date.now());
        return { ...obj, choices };
      }
      return obj;
    });
    setOptionsNumber(newState);
  };
  const onDeleteChocie = (optionId: number, choiceId: number) => {
    const newState = optionsNumber.map((obj) => {
      if (obj.optionId === optionId) {
        let choices = obj.choices;
        return { ...obj, choices: choices.filter((id) => id !== choiceId) };
      }
      return obj;
    });
    setOptionsNumber(newState);
    setValue(`${choiceId}ChoiceName`, "");
    setValue(`${choiceId}ChoiceExtra`, "");
  };
  const onSubmit = async () => {
    try {
      const { description, name, price, photo, ...rest } = getValues();
      const optionObjects = optionsNumber.map((id) => ({
        name: rest[`${id.optionId}OptionName`],
        extra: +rest[`${id.optionId}OptionExtra`],
        choices: id.choices.map((choiceId) => ({
          name: rest[`${choiceId}ChoiceName`],
          extra: +rest[`${choiceId}ChoiceExtra`],
        })),
      }));
      if (photo) {
        const actualFile = photo[0];
        const formBody = new FormData();
        formBody.append("file", actualFile);
        const { url } = await (
          await fetch(
            process.env.NODE_ENV === "production"
              ? "https://hsuber-eats-backend.herokuapp.com/uploads/"
              : "http://localhost:4001/uploads/",
            {
              method: "POST",
              body: formBody,
            }
          )
        ).json();
        createDishMutation({
          variables: {
            input: {
              description,
              name,
              price: +price,
              restaurantId: +num,
              options: optionObjects,
              photo: url,
            },
          },
        });
      } else {
        createDishMutation({
          variables: {
            input: {
              description,
              name,
              price: +price,
              restaurantId: +num,
              options: optionObjects,
            },
          },
        });
      }

      navigate(-1);
    } catch (error) {}
  };
  const [createDishMutation, { loading, data }] = useMutation<
    FrontCreateDish,
    FrontCreateDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +num,
          },
        },
      },
    ],
  });
  useEffect(() => {
    if (id) {
      setNum(id);
    }
  }, [id]);
  return (
    <div className="container flex flex-col items-center justify-center mt-32">
      <Helmet>
        <title>Add Dish | Uber-Eats</title>
      </Helmet>
      <h1 className="text-lg font-semibold mb-10 select-none">Add Dish</h1>
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
            maxLength: 15,
            minLength: 2,
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
          type="number"
          placeholder="Price"
          {...register("price", {
            required: "Price is required.",
            pattern: {
              value: /^[1-9][0-9]*$/,
              message: "Only natural numbers are possible.",
            },
          })}
        />
        {errors.price?.message && (
          <FormError errorMessage={errors.price.message} />
        )}
        <input
          className="w-full py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          type="text"
          placeholder="Description"
          {...register("description", {
            required: "Description is required.",
            maxLength: 140,
            minLength: 5,
          })}
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description.message} />
        )}
        {errors.description?.type === "minLength" && (
          <FormError errorMessage="The name must be at least 2 characters long." />
        )}
        {errors.description?.type === "maxLength" && (
          <FormError errorMessage="The name must be up to 15 characters long." />
        )}
        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">Dish Options</h4>
          <span
            onClick={onAddOptionClick}
            className="cursor-pointer rounded-md text-white bg-gray-900 py-1 px-2 mt-5"
          >
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id.optionId}>
                <div className="mt-5 flex items-center">
                  <input
                    {...register(`${id.optionId}OptionName`)}
                    className="py-2 px-4 mr-3 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
                    type="text"
                    placeholder="Option Name"
                  />
                  <input
                    {...register(`${id.optionId}OptionExtra`, {
                      pattern: {
                        value: /^$|^[0-9]$|^[1-9][0-9]*$/,
                        message: "Only natural numbers are possible.",
                      },
                    })}
                    defaultValue={0}
                    className="py-2 px-4 mr-2 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
                    type="number"
                    placeholder="Option Extra"
                  />
                  <span
                    className="mr-5"
                    onClick={() => onAddChoiceClick(id.optionId)}
                  >
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      className="text-gray-900 text-xl cursor-pointer"
                    />
                  </span>
                  <span onClick={() => onDeleteOption(id.optionId)}>
                    <FontAwesomeIcon
                      icon={faDeleteLeft}
                      className="text-red-500 text-xl cursor-pointer"
                    />
                  </span>
                </div>
                {id.choices.length !== 0 &&
                  id.choices.map((choiceId) => (
                    <div
                      className="mt-1 flex justify-center items-center"
                      key={choiceId}
                    >
                      <input
                        className="mr-2 p-1.5 transition-colors rounded-md shadow-sm focus:outline-none border-2 focus:border-red-300 focus:border-opacity-80"
                        placeholder="Choice Name"
                        type="text"
                        {...register(`${choiceId}ChoiceName`)}
                      />
                      <input
                        className="mr-2 p-1.5 transition-colors rounded-md shadow-sm focus:outline-none border-2 focus:border-red-300 focus:border-opacity-80"
                        placeholder="Choice Extra"
                        defaultValue={0}
                        type="number"
                        {...register(`${choiceId}ChoiceExtra`, {
                          pattern: {
                            value: /^$|^[0-9]$|^[1-9][0-9]*$/,
                            message: "Only natural numbers are possible.",
                          },
                        })}
                      />
                      <span
                        onClick={() => onDeleteChocie(id.optionId, choiceId)}
                      >
                        <FontAwesomeIcon
                          icon={faDeleteLeft}
                          className="text-red-500 text-xl cursor-pointer"
                        />
                      </span>
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <div>
          <input type="file" accept="image/*" {...register("photo")} />
        </div>
        <Button actionText="Add Dish" canClick={isValid} loading={loading} />
        {data?.createDish?.error && (
          <FormError errorMessage={data.createDish.error} />
        )}
      </form>
    </div>
  );
};
