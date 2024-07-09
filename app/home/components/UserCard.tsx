import React from "react";
import { Pressable, Text } from "react-native";
import { DetailsButton, DetailsButtonText, UserCardContainer, UserImage, UserInfo, UserLocation, UserLogin, UserName } from "../styles";
import { GitHubUser, UserProps } from "../../../types/user";

interface UserCardProps {
  user: UserProps;
  navigation: any;
  whoTheme: any;
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
