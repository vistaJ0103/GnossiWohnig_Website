import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { signOut, useAuth } from "../../../../firebaseProvider";
import Text from "../../../Atoms/Text";

const SignOutButton = styled.button`
  border: 0;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
  width: fit-content;
  padding: 12px 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Text size="14px" weight="bold" marginBottom="8px">
        {t("Auth.LoggedInAs")}
      </Text>
      {user && (
        <Text size="14px" marginBottom="20px">
          {user.email}
        </Text>
      )}
      <SignOutButton onClick={handleSignOut} aria-label="Abmelden">
        <Text color="#ffffff" size="13px">
          {t("Auth.Logout")}
        </Text>
      </SignOutButton>
    </>
  );
};

export default Settings;
