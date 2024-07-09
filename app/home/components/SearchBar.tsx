import React from 'react';
import { Feather, Ionicons } from "@expo/vector-icons";
import { CloseIcon, SearchIcon, SearchInput, SearchBarContainer } from "../styles";

export const SearchBar = ({ loadUser, theme, search, setSearch, setUser, setError }) => {
  return (
    <SearchBarContainer>
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
    </SearchBarContainer>
  );
};
