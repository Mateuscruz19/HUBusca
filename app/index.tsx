import { StatusBar } from "expo-status-bar";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { hp } from "../helpers/common";
import { router } from "expo-router";
import { lightTheme } from "../constants/theme";
import {
  Container,
  ContentContainer,
  Gradient,
  ImageStyled,
  StartButton,
  StartText,
} from "./styles";

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
        <ContentContainer>
          <Animated.Text
            style={{
              fontSize: hp(7),
              color: lightTheme.colors.neutral(0.9),
              fontWeight: 600,
            }}
            entering={FadeInDown.delay(400).springify()}
          >
            HUBusca!
          </Animated.Text>
          <Animated.Text
            style={{
              fontSize: hp(1.7),
              letterSpacing: 1,
              marginBottom: 10,
              fontWeight: 500,
            }}
            entering={FadeInDown.delay(500).springify()}
          >
            Encontre o Github de qualquer usuario.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <StartButton onPress={() => router.push("home")}>
              <StartText>Buscar</StartText>
            </StartButton>
          </Animated.View>
        </ContentContainer>
      </Animated.View>
    </Container>
  );
};

export default WelcomeScreen;
