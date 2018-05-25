import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated
} from "react-native";

export default class componentName extends Component {
  state = {
    heightAnim: new Animated.Value(1)
  };

  componentDidMount() {
    Animated.timing(this.state.heightAnim, {
      toValue: 185,
      duration: 3000
    }).start();
  }

  render() {
    let { heightAnim, ready } = this.state;
    return (
      <Animated.View
        style={[styles.questionBox, { width: 188, height: heightAnim }]}
      >
        <Text style={styles.questionText}>
          Question 1: How many people will fall over in the next 10 minutes?
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  questionBox: {
    backgroundColor: "white",
    borderRadius: 7
  },
  questionText: {
    fontSize: 30,
    color: "purple"
  }
});
