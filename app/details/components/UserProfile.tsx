import React from 'react';
import { Text } from "react-native";
import { UserImage, UserInfo, UserLocation, UserLogin, UserName, UserProfileStyled, UserStats } from "../styles";
import { UserProps, themePattern } from '../../../types/user';

interface UserProfileProps {
  user: UserProps;
  theme: themePattern;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, theme }) => {
  return (
    <UserProfileStyled>
      <UserImage source={{ uri: user.avatar_url }} />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserLogin>@{user.login}</UserLogin>
        <Text style={{ color: theme.text }}>ID: {user.id}</Text>
        <Text style={{ color: theme.text }}>
          Repositórios Públicos: {user.public_repos}
        </Text>
        <UserStats>
          <Text style={{ color: theme.text }}>
            {user.followers} Seguidores
          </Text>
          <Text style={{ color: theme.text }}>
            {user.following} Seguindo
          </Text>
        </UserStats>
        <UserLocation>{user.location}</UserLocation>
      </UserInfo>
    </UserProfileStyled>
  );
};
