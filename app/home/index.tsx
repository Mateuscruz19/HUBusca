import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { ThemeProvider } from 'styled-components/native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { router } from 'expo-router';
import { hp, wp } from '@/helpers/common';
import { UserProps } from '@/types/user';

const lightTheme = {
  colors: {
    background: '#fff',
    text: '#000',
    border: '#e5e5e5',
    inputBackground: '#fff',
    placeholder: 'rgba(10, 10, 10, 0.4)',
    closeIconBackground: 'rgba(10, 10, 10, 0.1)',
  },
};

const darkTheme = {
  colors: {
    background: '#000',
    text: '#fff',
    border: '#333',
    inputBackground: '#333',
    placeholder: 'rgba(255, 255, 255, 0.4)',
    closeIconBackground: 'rgba(255, 255, 255, 0.1)',
  },
};

const FontTheme = {
  fontWeights: {
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};
const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<UserProps[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation();

  const loadUser = async (userName: string) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${userName}`);
      const data = res.data;

      const { avatar_url, login, id, name, location } = data;

      const userData: UserProps = {
        id,
        avatar_url,
        login,
        name,
        location,
      };

      setUser(userData);
      setError(false);

      setSearchedUsers((prevUsers) => {
        if (!prevUsers.find((user) => user.login === data.login)) {
          return [...prevUsers, data];
        }
        return prevUsers;
      });
    } catch (error) {
      setError(true);
      setUser(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ paddingTop }}>
        <Header>
          <Pressable>
            <Title>HUBusca!</Title>
          </Pressable>
          <Pressable onPress={() => setIsDarkTheme(!isDarkTheme)}>
            <MaterialCommunityIcons name="theme-light-dark" size={30} color={theme.colors.text} />
          </Pressable>
        </Header>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <SearchBar>
            <SearchIcon>
              <Feather name="search" size={24} color={theme.colors.placeholder} />
            </SearchIcon>
            <SearchInput
              placeholder="Procurar perfil"
              placeholderTextColor={theme.colors.placeholder}
              value={search}
              onChangeText={(value) => setSearch(value)}
              onSubmitEditing={() => {
                if (search) {
                  loadUser(search);
                }
              }}
              style={{ backgroundColor: theme.colors.inputBackground }}
            />
            {search && (
              <CloseIcon
                onPress={() => {
                  setSearch(null);
                  setUser(null);
                  setError(false);
                }}
                style={{ backgroundColor: theme.colors.closeIconBackground }}
              >
                <Ionicons name="close" size={24} color={theme.colors.placeholder} />
              </CloseIcon>
            )}
          </SearchBar>
          {!search && (
            <PerfilScrollBox>
              <Text style={{ color: theme.colors.text }}>Tente pesquisar um perfil no Github!</Text>
            </PerfilScrollBox>
          )}
          {search && user && <UserCard key={user.id} user={user} theme={theme} navigation={navigation} whoTheme={isDarkTheme} />}
          {search && !user && error && (
            <PerfilScrollBox>
              <Text style={{ color: theme.colors.text }}>Usuário não encontrado, tente novamente.</Text>
            </PerfilScrollBox>
          )}
          <AllSeachBox>
            <SubTitle style={{ color: theme.colors.text }}>Usuários já pesquisados:</SubTitle>
            {searchedUsers.map((user) => (
              <UserCard key={user.id} user={user} theme={theme} navigation={navigation} whoTheme={isDarkTheme} />
            ))}
          </AllSeachBox>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

const UserCard = ({ user, navigation, whoTheme }) => {
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

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const SearchBar = styled.View`
  flex-direction: row;
  margin-top:15px;
  margin-right: ${wp(4)}px;
  margin-left: ${wp(4)}px;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.inputBackground};
  padding: 6px;
  padding-left: 10px;
  border-radius: 16px;
`;

const SearchIcon = styled.View`
  padding: 8px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: ${hp(1.8)}px;
`;

const CloseIcon = styled.Pressable`
  padding: 8px;
  border-radius: 12px;
`;

const Title = styled.Text`
  font-size: ${hp(4)}px;
  font-weight: ${FontTheme.fontWeights.semibold};
  color: ${(props) => props.theme.colors.text};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${wp(4)}px;
  margin-right: ${wp(4)}px;
`;

const PerfilScrollBox = styled.View`
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-color: ${(props) => props.theme.colors.border};
  border-width: 1px;
  flex-direction: row;
  margin-right: ${wp(4)}px;
  margin-left: ${wp(4)}px;
  height: ${hp(20)}px;
  margin-top:15px;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 6px;
  padding-left: 10px;
  border-radius: 16px;
`;

const AllSeachBox = styled.View`
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-color: ${(props) => props.theme.colors.border};
  border-width: 1px;
  flex: 1;
  margin-top:15px;
  margin-bottom:15px;
  align-items: center;
  margin-right: ${wp(4)}px;
  margin-left: ${wp(4)}px;
  padding: 6px;
  padding-left: 10px;
  border-radius: 16px;
`;

const SubTitle = styled.Text`
  font-size: ${hp(2)}px;
  font-weight: ${FontTheme.fontWeights.medium};
`;

// UserCard Styles
const UserCardContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-color: ${(props) => props.theme.colors.border};
  border-width: 1px;
  border-radius: 16px;
  margin: 10px;
  padding: 15px;
  align-items: center;
`;

const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: ${hp(2.2)}px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

const UserLogin = styled.Text`
  font-size: ${hp(1.8)}px;
  color: ${(props) => props.theme.colors.text};
`;

const UserLocation = styled.Text`
  font-size: ${hp(1.6)}px;
  color: ${(props) => props.theme.colors.text};
`;

const DetailsButton = styled.Pressable`
  background-color: ${(props) => props.theme.colors.text};
  border-radius: ${FontTheme.radius.sm}px;
  padding: 6px 12px;
  margin-top: 10px;
  align-items: center;
`;

const DetailsButtonText = styled.Text`
  font-size: ${hp(1.8)}px;
  color: ${(props) => props.theme.colors.background};
  font-weight: ${FontTheme.fontWeights.semibold};
`;

export default Home;
