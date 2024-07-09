import React, { useState } from 'react';
import { Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { darkTheme, lightTheme } from '@/constants/theme';
import { UserProps } from '@/types/user';
import {
  AllSeachBox,
  Container,
  Header,
  PerfilScrollBox,
  SubTitle,
  Title,
} from './styles';
import { UserCard } from './components/UserCard';
import { SearchBar } from './components/SearchBar'; // Corrigido caminho do componente SearchBar

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
          <SearchBar
            search={search}
            setSearch={setSearch}
            loadUser={loadUser}
            theme={theme}
            setUser={setUser}
            setError={setError}
          />
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

export default Home;
