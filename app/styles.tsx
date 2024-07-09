import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { Image, Pressable } from "react-native";
import { hp, wp } from "../helpers/common";
import { lightTheme } from "@/constants/theme";
import { FontTheme } from "@/constants/theme";

export const Container = styled.View`
  flex: 1;
`;

export const ContentContainer = styled.View`
  gap: 5px; /* Corrigido para especificar unidades (px) */
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const StartButton = styled(Pressable)`
  margin-bottom: 20px;
  background-color: ${lightTheme.colors.black};
  border-radius: ${FontTheme.radius.xl}px;
  padding: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StartText = styled.Text`
  color: ${lightTheme.colors.white};
  font-size: ${hp(3)};
  letter-spacing: 1px;
  font-weight: ${FontTheme.fontWeights.medium};
`;

export const ImageStyled = styled(Image)`
  width: ${wp(100)};
  height: ${hp(80)};
  position: absolute;
`;

export const Gradient = styled(LinearGradient)`
  position: absolute;
  width: ${wp(100)};
  height: ${hp(70)};
  bottom: 0;
`;
