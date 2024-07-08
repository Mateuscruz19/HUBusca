import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { UserProps } from "@/types/user";
import axios from "axios";

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const loadUser = async (userName: string) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${userName}`);
      const data = res.data;

      setUser(data);
      console.log(data);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  return (
    <Container style={{ paddingTop }}>
      {/* header */}
      <Header>
        <Pressable>
          <Title>HUBusca!</Title>
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="theme-light-dark" size={30} color="black" />
        </Pressable>
      </Header>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* search bar */}
        <SearchBar>
          <SearchIcon>
            <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
          </SearchIcon>
          <SearchInput
            placeholder="Procurar perfil"
            value={search}
            onChangeText={value => setSearch(value)}
            onSubmitEditing={() => {
              if (search) {
                loadUser(search);
              }
            }}
          />
          {search && (
            <CloseIcon onPress={() => setSearch(null)}>
              <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
            </CloseIcon>
          )}
        </SearchBar>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  gap: 15px;
`;

const SearchBar = styled.View`
  flex-direction: row;
  margin-right: ${wp(4)}px;
  margin-left: ${wp(4)}px;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.grayBG};
  background-color: ${theme.colors.white};
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
  background-color: ${theme.colors.neutral(0.1)};
  padding: 8px;
  border-radius: 12px;
`;

const Title = styled.Text`
  font-size: ${hp(4)}px;
  font-weight: ${theme.fontWeights.semibold};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${wp(4)}px;
  margin-right: ${wp(4)}px;
`;

export default Home;
