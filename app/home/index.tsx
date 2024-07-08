import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "@/helpers/common";
import { UserProps } from "@/types/user";
import axios from "axios";


const lightTheme = {
  colors: {
    background: "#fff",
    text: "#000",
    border: "#e5e5e5",
    inputBackground: "#fff",
    placeholder: "rgba(10, 10, 10, 0.4)",
    closeIconBackground: "rgba(10, 10, 10, 0.1)",
  },
};

const darkTheme = {
  colors: {
    background: "#000",
    text: "#fff",
    border: "#333",
    inputBackground: "#333",
    placeholder: "rgba(255, 255, 255, 0.4)",
    closeIconBackground: "rgba(255, 255, 255, 0.1)",
  },
};

const FontTheme = {
  fontWeights: {
    medium: '500',
    semibold: '600',
    bold: '700',
},
radius:{
    xs:10,
    sm:12,
    md:14,
    lg:16,
    xl:18,
}
}

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<UserProps[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  const loadUser = async (userName: string) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${userName}`);
      const data = res.data;

      setUser(data);
      setError(false); // Reset error state if the user is found

      // Add user to searchedUsers array if not already present
      setSearchedUsers((prevUsers) => {
        if (!prevUsers.find((user) => user.login === data.login)) {
          return [...prevUsers, data];
        }
        return prevUsers;
      });

      console.log(data);
    } catch (error) {
      setError(true); // Set error state if there is an error fetching the user
      setUser(null); // Reset user state if there is an error
      console.error("Erro ao carregar usuário:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ paddingTop }}>
        {/* header */}
        <Header>
          <Pressable>
            <Title>HUBusca!</Title>
          </Pressable>
          <Pressable onPress={() => setIsDarkTheme(!isDarkTheme)}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={30}
              color={theme.colors.text}
            />
          </Pressable>
        </Header>

        <ScrollView contentContainerStyle={{ gap: 15 }}>
          {/* search bar */}
          <SearchBar>
            <SearchIcon>
              <Feather
                name="search"
                size={24}
                color={theme.colors.placeholder}
              />
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
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.placeholder}
                />
              </CloseIcon>
            )}
          </SearchBar>
          {!search && (
            <PerfilScrollBox>
              <Text style={{ color: theme.colors.text }}>
                Teste procurar um perfil!
              </Text>
            </PerfilScrollBox>
          )}
          {search && user && (
            <PerfilScrollBox>
              <Text style={{ color: theme.colors.text }}>{user.login}</Text>
            </PerfilScrollBox>
          )}
          {search && !user && error && (
            <PerfilScrollBox>
              <Text style={{ color: theme.colors.text }}>
                Usuário não encontrado, tente novamente.
              </Text>
            </PerfilScrollBox>
          )}
          <AllSeachBox>
            <SubTitle style={{ color: theme.colors.text }}>
              Usuários já pesquisados:
            </SubTitle>
            {searchedUsers.map((user) => (
              <View key={user.id}>
                <Text style={{ color: theme.colors.text }}>{user.login}</Text>
                <Text style={{ color: theme.colors.text }}>{user.followers}</Text>
                <Text style={{ color: theme.colors.text }}>{user.following}</Text>
                <Text style={{ color: theme.colors.text }}>{user.location}</Text>
              </View>
            ))}
          </AllSeachBox>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  display: flex;
  gap: 15px;
  background-color: ${(props) => props.theme.colors.background};
`;

const SearchBar = styled.View`
  flex-direction: row;
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
  height: ${hp(50)}px;
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
  flex-direction: column;
  margin-right: ${wp(4)}px;
  margin-left: ${wp(4)}px;
  height: ${hp(50)}px;
  align-items: center;
  padding: 6px;
  padding-left: 10px;
  border-radius: 16px;
`;

const SubTitle = styled.Text`
  font-size: ${hp(2)}px;
  font-weight: ${FontTheme.fontWeights.medium};
`;

export default Home;
