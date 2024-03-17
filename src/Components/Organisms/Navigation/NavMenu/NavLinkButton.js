import styled from "styled-components";

const NavLinkButton = styled.button`
  border-radius: 4px;
  background: transparent;
  padding: 8px 20px;
  border: solid 1px ${(props) => props.theme.colors.white};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: ${(props) => props.theme.colors.primary};
    border: solid 1px ${(props) => props.theme.colors.navFontColor};
  }
`;

export default NavLinkButton;
