import React, { Fragment, useEffect, useState } from "react";

import Popover from "@components/pop-over";
import ItemDetails from "@pages/item-details";
import Basket from "@pages/basket";
import AddToOrder from "@pages/item-details/add-to-order";
import { MainLayout } from "@layouts";
import { useResponsiveness } from "@contexts/responsiveness";
import { useData } from "@contexts/restaurant";
import { ItemDetailsProp } from "@pages/item-details/item-details.types";
import {
  Collapser,
  InputSearch,
  MenuNav,
  MenuOption,
  NavBar,
} from "@components";
import {
  basketWrapperStyles,
  menuNavWrapperSmStyles,
  menuNavWrapperStyles,
  wrapperSmStyles,
  wrapperStyles,
  lastOptionStyles,
} from "./online-menu.styles";

const imgsFallback = [
  "/src/assets/burguerOption.png",
  "/src/assets/drinksOption.png",
  "/src/assets/dessertsOption.png",
];

const OnlineMenu: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [popoverContent, setPopoverContent] = useState<JSX.Element>(<></>);
  const { isSmall } = useResponsiveness();
  const [{ restaurant, menu }] = useData();

  const isLoading = restaurant === null || menu === null;

  const sectionsMenu = menu?.sections.map((section, index) => {
    return { label: section?.name, src: imgsFallback[index] };
  });

  const renderNavBar = () => (
    <NavBar
      options={[
        { label: "Menu", href: "/menu" },
        { label: "Entrar", href: "/entrar" },
        { label: "Contato", href: "/contato" },
      ]}
    />
  );

  const handleMenuOptionClick = (item: ItemDetailsProp) => () => {
    setPopoverContent(
      <ItemDetails
        item={item}
        closeAfterPopoverAdding={() => setIsPopoverOpen(false)}
      />
    );
    setIsPopoverOpen(true);
  };

  const handleMyBasketClick = () => {
    setPopoverContent(<Basket />);
    setIsPopoverOpen(true);
  };

  useEffect(() => {
    if (typeof popoverContent === typeof Basket && !isSmall) {
      setIsPopoverOpen(false);
      setPopoverContent(<></>);
    }
  }, [isSmall]);

  const renderMenuOptions = () =>
    !isLoading &&
    menu?.sections.map((section, sectionIndex) => {
      const isLastOption = sectionIndex + 1 === menu.sections?.length;
      return (
        <Fragment key={`${section.name}-key`}>
          <Collapser category={section.name} id={`${section.name}-key`}>
            {section.items.map((item) => {
              return (
                <Fragment key={item.id}>
                  <MenuOption
                    title={item.name}
                    id={item.id}
                    description={item.description}
                    price={item.price}
                    imgSrc={item?.images?.find(() => true)?.image}
                    isPopoverOpen={isPopoverOpen}
                    onClick={handleMenuOptionClick(item as ItemDetailsProp)}
                  />
                </Fragment>
              );
            })}
          </Collapser>
          {isLastOption && <div style={lastOptionStyles} />}
        </Fragment>
      );
    });

  const handleClosePopOver = () => {
    setPopoverContent(<></>);
    setIsPopoverOpen(false);
  };

  const PopverWithContent = () => {
    return (
      <Popover isOpen={isPopoverOpen} onClose={handleClosePopOver}>
        {popoverContent}
      </Popover>
    );
  };

  const AddToOrderFooterOnMobile = () => (
    <AddToOrder
      isPopOverClosed={!isPopoverOpen}
      onClickYourBasket={handleMyBasketClick}
    />
  );

  const BasketOnPc = () => (
    <div style={basketWrapperStyles}>
      <Basket />
    </div>
  );

  return (
    <>
      {renderNavBar()}
      <MainLayout isLoading={isLoading}>
        {!isLoading && <InputSearch placeholder="Search menu items" />}
        <div style={isSmall ? wrapperSmStyles : wrapperStyles}>
          <div style={isSmall ? menuNavWrapperSmStyles : menuNavWrapperStyles}>
            {!isLoading && <MenuNav options={sectionsMenu} />}
            <PopverWithContent />
            {renderMenuOptions()}
          </div>

          {isSmall && !isPopoverOpen ? (
            <AddToOrderFooterOnMobile />
          ) : (
            <BasketOnPc />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default OnlineMenu;
