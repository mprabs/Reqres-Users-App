import React from "react";

import { StyleSheet, StatusBar, Image, Dimensions } from "react-native";

import { Container, Header, Content, Icon, Button, Text } from "native-base";

function WelcomeScreen({ navigation }) {
  const image = require("./assets/images.jpeg");
  let { height, width } = Dimensions.get("window");
  return (
    <Container>
      <Header>
        <Button transparent>
          <Text> welcome </Text>
        </Button>
      </Header>
      <Content style={{ backgroundColor: "blue" }}>
        <Image
          source={require("./assets/images.jpeg")}
          style={[styles.backgroundImage, { height: height / 2, width: width }]}
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "blue",
            marginTop: 50
          }}
        >
          REQ|RES USERS APP
        </Text>
        <Button
          rounded
          warning
          style={{
            alignSelf: "center",
            bottom: 1,
            position: "relative",
            marginTop: height - (height - 40),
          }}
          onPress={() => navigation.navigate("UserList")}
          iconRight
        >
          <Text>Get Started </Text>
          <Icon name="arrow-forward"></Icon>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  navbar: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
