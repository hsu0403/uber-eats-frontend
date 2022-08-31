import React from "react";

interface IDishOptionProps {
  isSelected: boolean;
  isOptionSelected: boolean;
  name: string;
  extra: number;
  dishId: number;
  choices: { name: string; extra: number | null }[] | null;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
  addChoiceFromItem: (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => void;
  removeChoiceFromItem: (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => void;
  isChoiceSelected: (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => Boolean;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  extra,
  isOptionSelected,
  isSelected,
  name,
  dishId,
  choices,
  addOptionToItem,
  removeOptionFromItem,
  addChoiceFromItem,
  removeChoiceFromItem,
  isChoiceSelected,
}) => {
  const onClick = () => {
    if (isOptionSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  const addChoiceClick = (choiceName: string) => {
    if (isChoiceSelected(dishId, name, choiceName)) {
      removeChoiceFromItem(dishId, name, choiceName);
    } else {
      addChoiceFromItem(dishId, name, choiceName);
    }
  };
  return (
    <div className="mb-2">
      <span
        onClick={onClick}
        className={`${
          isSelected ? "cursor-pointer" : ""
        } flex  items-center justify-between ${
          isOptionSelected ? "bg-rose-400 opacity-70" : ""
        }`}
      >
        <h6 className="mr-2">{name}:</h6>
        <h6 className="mr-2 text-sm opacity-70">(&#8361;{extra})</h6>
      </span>
      {isOptionSelected &&
        choices &&
        choices.map((choiceId, ondex) => (
          <span
            onClick={() => addChoiceClick(choiceId.name)}
            key={ondex}
            className={`cursor-pointer flex items-center justify-between ${
              isChoiceSelected(dishId, name, choiceId.name)
                ? "bg-rose-300 opacity-70"
                : ""
            }`}
          >
            <h6 className="ml-10">{choiceId.name}</h6>
            <h6 className="mr-2 text-sm opacity-70">
              (&#8361;{choiceId.extra})
            </h6>
          </span>
        ))}
    </div>
  );
};
