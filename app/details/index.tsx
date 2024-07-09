import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { GitHubUser, GitHubRepo } from "@/types/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "@/constants/theme";
import {
  BackButton,
  Container,
  ErrorBox,
  ErrorText,
  Header,
  ReposTitle,
  ThemeToggle,
  Title,
} from "./styles";
import { RepoCard } from "./components/RepoCard";
import { UserProfile } from "./components/UserProfile";
import { loadRep } from "@/services/LoadRep"; // Importe a função loadUserDetails

type DetailsRouteProp = RouteProp<
  { params: { userName: string; whoTheme: boolean } },
  "params"
>;

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { userName } = route.params;
  const { whoTheme } = route.params;
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user: userData, repos: reposData } = await  loadRep(
          userName
        );
        setUser(userData);
        setRepos(reposData);
        setError(false);
      } catch (error) {
        setError(true);
        setUser(null);
        console.error("Erro ao carregar usuário:", error);
      }
    };

    fetchUserData();
    setIsDarkTheme(whoTheme);
  }, []);

  const theme = isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation();

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ paddingTop }}>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={theme.colors.text} />
          </BackButton>
          <Title>Detalhes do Perfil</Title>
          <ThemeToggle onPress={() => setIsDarkTheme(!isDarkTheme)}>
            <Feather name="sun" size={24} color={theme.colors.text} />
          </ThemeToggle>
        </Header>
        {user && (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <UserProfile user={user} theme={theme} />
            <ReposTitle>Repositórios</ReposTitle>
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} theme={theme} />
            ))}
          </ScrollView>
        )}
        {error && (
          <ErrorBox>
            <ErrorText>Erro ao carregar usuário. Tente novamente.</ErrorText>
          </ErrorBox>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Details;
