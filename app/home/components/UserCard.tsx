import { DetailsButton, DetailsButtonText, UserCardContainer, UserImage, UserInfo, UserLocation, UserLogin, UserName } from "@/app/home/styles";
import { Pressable } from "react-native";

export const UserCard = ({ user, navigation, whoTheme }) => {
    return (
      <UserCardContainer>
        <Pressable onPress={() => navigation.navigate('details/index', { userName: user.login }, { whoTheme:whoTheme})}>
          <UserImage source={{ uri: user.avatar_url }} />
        </Pressable>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserLogin>{user.login}</UserLogin>
          <UserLocation>{user.location}</UserLocation>
          <DetailsButton onPress={() => navigation.navigate('details/index', { userName: user.login }, { whoTheme:whoTheme})}>
            <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
          </DetailsButton>
        </UserInfo>
      </UserCardContainer>
    );
  };