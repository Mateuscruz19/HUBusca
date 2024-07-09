import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components/native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { GitHubUser, GitHubRepo } from "@/types/user"; // Importe os novos tipos
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

type DetailsRouteProp = RouteProp<{ params: { userName: string; whoTheme: boolean } }, "params">;

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
    loadUser(userName);
    setIsDarkTheme(whoTheme)
  }, []);

  const theme = isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation();

  const loadUser = async (userName: string) => {
    try {
      const userRes = await axios.get(
        `https://api.github.com/users/${userName}`
      );
      const reposRes = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );

      const userData: GitHubUser = userRes.data;
      const reposData: GitHubRepo[] = reposRes.data;

      setUser(userData);
      setRepos(reposData);
      setError(false);
    } catch (error) {
      setError(true);
      setUser(null);
      console.error("Erro ao carregar usuário:", error);
    }
  };

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
            <UserProfile>
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
            </UserProfile>
            <ReposTitle>Repositórios</ReposTitle>
            {repos.map((repo) => (
                
              <RepoCard
                key={repo.id}>
                    
                <RepoName>{repo.name}</RepoName>
                <RepoLanguage>{repo.language}</RepoLanguage>
                <RepoDescription>{repo.description}</RepoDescription>
                <RepoDates>
                  <Text style={{ color: theme.colors.text }}>
                    Criado em: {new Date(repo.created_at).toLocaleDateString()}
                  </Text>
                  <Text style={{ color: theme.colors.text }}>
                    Último push: {new Date(repo.pushed_at).toLocaleDateString()}
                  </Text>
                </RepoDates>
                <ExternalLink href={repo.html_url}>
                  <ThemedText type="link">Veja mais!</ThemedText>
                </ExternalLink>
              </RepoCard>
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

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

const BackButton = styled.Pressable``;

const Title = styled.Text`
  font-size: 24px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

const ThemeToggle = styled.Pressable``;

const UserProfile = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-color: ${(props) => props.theme.colors.border};
  border-width: 1px;
  border-radius: 16px;
  padding: 15px;
`;

const UserImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
`;

const UserInfo = styled.View`
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

const UserLogin = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

const UserStats = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`;

const UserLocation = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

const ReposTitle = styled.Text`
  font-size: 22px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

const RepoCard = styled.Pressable`
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-color: ${(props) => props.theme.colors.border};
  border-width: 1px;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 10px;
`;

const RepoName = styled.Text`
  font-size: 18px;
  font-weight: ${FontTheme.fontWeights.semibold};
  color: ${(props) => props.theme.colors.text};
`;

const RepoLanguage = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

const RepoDescription = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

const RepoDates = styled.View`
  margin-top: 10px;
`;

const ErrorBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
`;

export default Details;
