import styled from 'styled-components/native';
import { hp, wp } from '@/helpers/common';
import { FontTheme } from '@/constants/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  background-color: ${(props) => props.theme.colors.inputBackground};
`;
export const SearchBar = styled.View`
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

export const SearchIcon = styled.View`
  padding: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: ${hp(1.8)}px;
`;

export const CloseIcon = styled.Pressable`
  padding: 8px;
  border-radius: 12px;
`;

export const Title = styled.Text`
  font-size: ${hp(4)}px;
  font-weight: ${FontTheme.fontWeights.semibold};
  color: ${(props) => props.theme.colors.text};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${wp(4)}px;
  margin-right: ${wp(4)}px;
`;

export const PerfilScrollBox = styled.View`
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

export const AllSeachBox = styled.View`
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

export const SubTitle = styled.Text`
  font-size: ${hp(2)}px;
  font-weight: ${FontTheme.fontWeights.medium};
`;

// UserCard Styles
export const UserCardContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-color: ${(props) => props.theme.colors.border};
  border-width: 1px;
  border-radius: 16px;
  margin: 10px;
  padding: 15px;
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: ${hp(2.2)}px;
  font-weight: ${FontTheme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const UserLogin = styled.Text`
  font-size: ${hp(1.8)}px;
  color: ${(props) => props.theme.colors.text};
`;

export const UserLocation = styled.Text`
  font-size: ${hp(1.6)}px;
  color: ${(props) => props.theme.colors.text};
`;

export const DetailsButton = styled.Pressable`
  background-color: ${(props) => props.theme.colors.text};
  border-radius: ${FontTheme.radius.sm}px;
  padding: 6px 12px;
  margin-top: 10px;
  align-items: center;
`;

export const DetailsButtonText = styled.Text`
  font-size: ${hp(1.8)}px;
  color: ${(props) => props.theme.colors.background};
  font-weight: ${FontTheme.fontWeights.semibold};
`;

