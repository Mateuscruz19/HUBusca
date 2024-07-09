import React from "react";
import { Text } from "react-native";
import { ExternalLink } from "./ExternalLink";
import { ThemedText } from "./ThemedText";
import { RepoDates, RepoDescription, RepoLanguage, RepoName } from "../styles";

export const RepoCard = ({ repo, theme }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
