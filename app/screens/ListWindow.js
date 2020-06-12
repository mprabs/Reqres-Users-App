import React, { Component } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Footer,
  FooterTab,
  Body,
  Segment,
} from "native-base";

export default class viewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      response: null,
      clickFlag: true,
    };
  }

  componentDidMount() {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          response: responseJson,
          clickFlag: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  swipeLeft() {
    this.componentDidMount();
  }

  swipeRight() {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          response: responseJson,
          clickFlag: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const navigation = this.props.navigation;
      return (
        <Container>
          <Header hasSegment>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack(null)}
              >
                <Icon name="home" />
              </Button>
            </Left>
            <Body>
              <Segment>
                <Button first active={this.state.clickFlag}>
                  <Icon name="arrow-back" onPress={() => this.swipeLeft()} />
                </Button>
                <Button last active={!this.state.clickFlag}>
                  <Icon
                    name="arrow-forward"
                    onPress={() => this.swipeRight()}
                  />
                </Button>
              </Segment>
            </Body>
            <Right>
              <Button transparent onPress={() => BackHandler.exitApp()}>
                <Icon name="power" />
              </Button>
            </Right>
          </Header>
          <Content>
            {this.state.dataSource.map((val, key) => {
              return (
                <Card key={key}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("userDetails", val)}
                  >
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: val.avatar }} />
                        <Body>
                          <Text>{val.first_name + " " + val.last_name}</Text>
                          <Text note>{val.email}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        source={{ uri: val.avatar }}
                        style={{ height: 200, width: 100, flex: 1 }}
                      />
                    </CardItem>
                    <CardItem>
                      <Button transparent>
                        <Icon active name="eye" />
                        <Text>View Details</Text>
                      </Button>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              );
            })}
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Text style={{ color: "white" }}>
                  Page : {this.state.response.page} /{" "}
                  {this.state.response.total_pages}
                </Text>
              </Button>
            </FooterTab>
          </Footer>
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
