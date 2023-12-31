import React, { useState } from "react";

import { useBasket } from "@contexts/basket";
import AddToOrder from "./add-to-order";
import { ItemDetailsProps } from "./item-details.types";
import {
  detailsWraperStyles,
  headingParagraphStyles,
  headingStyles,
  imgStyles,
  modifierHeadingStyles,
  modifierParagraphStyles,
  modifierWrapperStyles,
  subDetailsWrapperStyles,
  subHeadingParagraphStyles,
  subHeadingStyles,
  wrapperStyles,
  checkboxStyles,
} from "./item-details.styles";
import { ItemModifier } from "../item-details/item-details.types";

const ItemDetails: React.FC<ItemDetailsProps> = (props) => {
  const { item, closeAfterPopoverAdding } = props;
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [selectedModifier, setSelectedModifier] = useState<
    ItemModifier | undefined
  >();
  const { dispatch } = useBasket();
  console.log({ selectedModifier });

  const hasItemModifiers = item.modifiers ?? false;

  const renderModifier = () =>
    item?.modifiers[0].items.map((modifier) => (
      <div style={modifierWrapperStyles}>
        <div>
          <h1 style={modifierHeadingStyles}>{modifier.name}</h1>
          <p style={modifierParagraphStyles}>{`R$ ${
            item.price + modifier.price
          }`}</p>
        </div>

        <input
          style={checkboxStyles}
          type="checkbox"
          onChange={() => setSelectedModifier(modifier)}
          checked={selectedModifier?.id === modifier.id}
        />
      </div>
    ));

  const renderModifierHeader = () => (
    <div style={subDetailsWrapperStyles}>
      <h1 style={subHeadingStyles}>
        {hasItemModifiers && item.modifiers[0].name}
      </h1>
      <p style={subHeadingParagraphStyles}>Lorem ipsum dolor amet</p>
    </div>
  );

  const normalizedImgSrc =
    item.images !== undefined ? item.images[0].image : false;

  const hasImgSrc = normalizedImgSrc;

  return (
    <div style={wrapperStyles} key={item.name}>
      {hasImgSrc && <img style={imgStyles} src={normalizedImgSrc} />}

      <div style={detailsWraperStyles}>
        <h1 style={headingStyles}>{item.name}</h1>
        <p style={headingParagraphStyles}>{item.description}</p>
      </div>

      {hasItemModifiers && renderModifierHeader()}
      {hasItemModifiers && renderModifier()}

      <AddToOrder
        price={item.price}
        handleQuantityChange={setQuantityToAdd}
        onClickAddToOrder={() => {
          dispatch({
            type: "ADD_ITEM",
            item: { ...item, quantity: quantityToAdd },
          });
          closeAfterPopoverAdding();
        }}
        quantityToAdd={quantityToAdd}
      />
    </div>
  );
};

export default ItemDetails;
