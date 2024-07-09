import styled from "styled-components/native";
import { FontTheme } from "../../constants/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.inputBackground};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.border};
`;

export const BackButton = styled.Pressable``;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.text};
`;

export const ThemeToggle = styled.Pressable``;

export const UserProfileStyled = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.inputBackground};
  border-color: ${(props) => props.theme.border};
  border-width: 1px;
  border-radius: 16px;
  padding: 15px;
`;

export const UserImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
`;

export const UserInfo = styled.View``;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.text};
`;

export const UserLogin = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

export const UserStats = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`;

export const UserLocation = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

export const ReposTitle = styled.Text`
  font-size: 22px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

export const RepoCardStyled = styled.Pressable`
  background-color: ${(props) => props.theme.inputBackground};
  border-color: ${(props) => props.theme.border};
  border-width: 1px;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const RepoName = styled.Text`
  font-size: 18px;
  font-weight: ${FontTheme.fontWeights.semibold};
  color: ${(props) => props.theme.text};
`;

export const RepoLanguage = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

export const RepoDescription = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

export const RepoDates = styled.View`
  margin-top: 10px;
`;

export const ErrorBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;
