import React from "react";
import { Text } from "react-native";
import { ExternalLink } from "./ExternalLink";
import { ThemedText } from "./ThemedText";
import { RepoDates, RepoDescription, RepoLanguage, RepoName,RepoCardStyled } from "../styles";
import { themePattern, GitHubRepo } from "../../../types/user";


interface RepoCardProps {
    repo: GitHubRepo;
    theme: themePattern;
  }
  
  export const RepoCard: React.FC<RepoCardProps> = ({ repo, theme }) => {
  return (
        <RepoCardStyled>
        <RepoName>{repo.name}</RepoName>
        <RepoLanguage>{repo.language}</RepoLanguage>
        <RepoDescription>{repo.description}</RepoDescription>
        <RepoDates>
          <Text style={{ color: theme.text }}>
            Criado em: {new Date(repo.created_at).toLocaleDateString()}
          </Text>
          <Text style={{ color: theme.text }}>
            Último push: {new Date(repo.pushed_at).toLocaleDateString()}
          </Text>
        </RepoDates>
        <ExternalLink href={repo.html_url}>
          <ThemedText type="link">Veja mais!</ThemedText>
        </ExternalLink>
        </RepoCardStyled>
  );
};
