import React from "react";
import { Pressable, Text } from "react-native";
import { DetailsButton, DetailsButtonText, UserCardContainer, UserImage, UserInfo, UserLocation, UserLogin, UserName } from "../styles";
import { GitHubUser, UserProps } from "../../../types/user"; // Certifique-se de importar o tipo correto para GitHubUser

interface UserCardProps {
  user: UserProps; // Ajuste o tipo para GitHubUser
  navigation: any; // Defina o tipo correto para navigation
  whoTheme: any; // Defina o tipo correto para whoTheme
}

export const UserCard: React.FC<UserCardProps> = ({ user, navigation, whoTheme }) => {
  return (
    <UserCardContainer>
      <Pressable onPress={() => navigation.navigate('details/index', { userName: user.login, whoTheme: whoTheme })}>
        <UserImage source={{ uri: user.avatar_url }} />
      </Pressable>
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserLogin>{user.login}</UserLogin>
        <UserLocation>{user.location}</UserLocation>
        <DetailsButton onPress={() => navigation.navigate('details/index', { userName: user.login, whoTheme: whoTheme })}>
          <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
        </DetailsButton>
      </UserInfo>
    </UserCardContainer>
  );
};
