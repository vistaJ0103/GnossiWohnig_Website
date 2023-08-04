import React from "react";
import { bool } from "prop-types";

import styled from "styled-components";

export const StyledBurgerContainer = styled.nav`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.burgerBGColor};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  text-align: left;
  padding: 0px 0px;
  position: absolute;
  top: 80px;
  left: 0px;
  transition: transform 0.3s ease-in-out;
  width: 100%;

  > * {
    border-top: dotted 2px ${(props) => props.theme.colors.primary};
  }

  &:last-child {
    border-bottom: dotted 2px ${(props) => props.theme.colors.primary};
  }
`;

const BurgerContainer = ({ open, ...props }) => {
  return (
    <StyledBurgerContainer open={open} {...props}>
      {props.children}
    </StyledBurgerContainer>
  );
};

BurgerContainer.propTypes = {
  open: bool.isRequired,
};

export default BurgerContainer;
