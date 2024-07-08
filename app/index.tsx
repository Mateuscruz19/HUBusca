import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components/native";
import { Image, Pressable, View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { router } from "expo-router";

const WelcomeScreen = () => {
  return (
    <Container>
      <StatusBar style="light" />
      <ImageStyled
        source={require("../assets/images/HUBusca-inicialscreen.jpg")}
      ></ImageStyled>
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <Gradient
          colors={[
            "rgba(225, 225, 225, 0)",
            "rgba(225, 225, 225, 0)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        {/* Content */}
        <ContentContainer>
          <Animated.Text
           style={{fontSize:hp(7), color:theme.colors.neutral(0.9), fontWeight:600}}
           entering={FadeInDown.delay(400).springify()}
          >HUBusca!</Animated.Text>
          <Animated.Text
          style={{fontSize:hp(1.7), letterSpacing: 1, marginBottom:10, fontWeight:500}}
          entering={FadeInDown.delay(500).springify()}
          >Encontre o Github de qualquer usuario.</Animated.Text>
          <Animated.View
          entering={FadeInDown.delay(600).springify()}
          >
            <StartButton onPress={() => router.push('home')}>
            <StartText>Buscar</StartText>
            </StartButton>
          </Animated.View>
        </ContentContainer>
      </Animated.View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;


const ContentContainer = styled.View`
  gap: 5px; /* Corrigido para especificar unidades (px) */
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const StartButton = styled(Pressable)`
  margin-bottom: 20px;
  background-color: ${theme.colors.black};
  border-radius: ${theme.radius.xl}px;
  padding: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${hp(3)};
  letter-spacing: 1px;
  font-weight: ${theme.fontWeights.medium};
`;

const ImageStyled = styled(Image)`
  width: ${wp(100)};
  height: ${hp(80)};
  position: absolute;
`;

const Gradient = styled(LinearGradient)`

  position: absolute;
  width: ${wp(100)};
  height: ${hp(70)};
  bottom: 0;
`;

export default WelcomeScreen;
