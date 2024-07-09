import React from 'react';
import { Feather, Ionicons } from "@expo/vector-icons";
import { CloseIcon, SearchIcon, SearchInput, SearchBarContainer } from "../styles";
import { themePattern } from '../../../types/user';

type SearchBarProps = {
  loadUser: (userName: string) => void;
  theme: themePattern;
  search: string | null;  // Atualizado para string | null
  setSearch: (search: string | null) => void;
  setUser: (user: any | null) => void;
  setError: (error: boolean) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ loadUser, theme, search, setSearch, setUser, setError }) => {
  return (
    <SearchBarContainer>
      <SearchIcon>
        <Feather name="search" size={24} color={theme.placeholder} />
      </SearchIcon>
      <SearchInput
        placeholder="Procurar perfil"
        placeholderTextColor={theme.placeholder}
        value={search || ''}  // Garantir que search seja string
        onChangeText={(value) => setSearch(value)}
        onSubmitEditing={() => {
          if (search) {
            loadUser(search);
          }
        }}
        style={{ backgroundColor: theme.inputBackground }}
      />
      {search && (
        <CloseIcon
          onPress={() => {
            setSearch(null);
            setUser(null);
            setError(false);
          }}
          style={{ backgroundColor: theme.closeIconBackground }}
        >
          <Ionicons name="close" size={24} color={theme.placeholder} />
        </CloseIcon>
      )}
    </SearchBarContainer>
  );
};
