import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler
} from "react-native";

import {
  Container,
  ListItem,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Icon,
  Button,
  Text,
  Header,
  Title,
  Body,
} from "native-base";

export default class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadInBrowser = () => {
    Linking.openURL(this.state.dataSource.ad.url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const imageSource = this.state.dataSource.data.avatar;
      return (
        <Container>
          <Header>
            <Left>
              <Button onPress={() => this.props.navigation.goBack(null)} transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ flex:2 }}>
              <Title>Details of {this.state.dataSource.data.first_name}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => BackHandler.exitApp()}>
                <Icon name="power" />
              </Button>
            </Right>
          </Header>
          <Content>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{ uri: imageSource }} />
                  <Body>
                    <Text>
                      {this.state.dataSource.data.first_name +
                        " " +
                        this.state.dataSource.data.last_name}
                    </Text>
                    <Text note>{this.state.dataSource.data.email}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: imageSource }}
                    style={{ height: 300, width: "100%", flex: 1 }}
                  />
                  {/* <Button style={{ width: "100%" }}>
                  </Button> */}
                </Body>
              </CardItem>

              <CardItem>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "#FF9501" }}>
                      <Icon active name="podium" />
                    </Button>
                  </Left>
                </ListItem>
                <Body>
                  <Text style={{ color: "#8E8B8B" }}>Company Name</Text>
                  <Text>{this.state.dataSource.ad.company}</Text>
                </Body>
              </CardItem>
              <TouchableOpacity onPress={() => this.loadInBrowser()}>
                <CardItem>
                  <ListItem icon>
                    <Left>
                      <Button style={{ backgroundColor: "#FF9501" }}>
                        <Icon active name="link" />
                      </Button>
                    </Left>
                  </ListItem>
                  <Body>
                    <Text style={{ color: "#8E8B8B" }}>Website</Text>
                    <Text>{this.state.dataSource.ad.url}</Text>
                  </Body>
                  <Right>
                    <Icon name="send"></Icon>
                  </Right>
                </CardItem>
              </TouchableOpacity>
              <CardItem>
                <Body>
                  <Text style={{ color: "#8E8B8B" }}>About</Text>
                  <Text>{this.state.dataSource.ad.text}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
