import React from "react";

export const useToggleModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggleModal];
};
