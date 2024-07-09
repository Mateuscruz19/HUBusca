import React from 'react';
import { Text } from "react-native";
import { UserImage, UserInfo, UserLocation, UserLogin, UserName, UserStats } from "../styles";

export const UserProfile = ({ user, theme }) => {
  return (
    <React.Fragment>
      <UserImage source={{ uri: user.avatar_url }} />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserLogin>@{user.login}</UserLogin>
        <Text style={{ color: theme.colors.text }}>ID: {user.id}</Text>
        <Text style={{ color: theme.colors.text }}>
          Repositórios Públicos: {user.public_repos}
        </Text>
        <UserStats>
          <Text style={{ color: theme.colors.text }}>
            {user.followers} Seguidores
          </Text>
          <Text style={{ color: theme.colors.text }}>
            {user.following} Seguindo
          </Text>
        </UserStats>
        <UserLocation>{user.location}</UserLocation>
      </UserInfo>
    </React.Fragment>
  );
};
