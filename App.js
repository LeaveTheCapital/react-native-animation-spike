import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Animated,
  Alert
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop
} from "react-native-svg";
import Question from "./Question";

export default class App extends React.Component {
  state = {
    colour: "turquoise",
    colour2: "black",
    readyForQuestion: false,
    loggedIn: false,
    questionArr: [false],
    fadeAnim: new Animated.Value(0),
    fontSizeAnim: new Animated.Value(1)
  };

  circleOnPress = i => {
    const newQuestionArr = this.state.questionArr.slice();
    newQuestionArr[i] = !newQuestionArr[i];
    this.setState({ questionArr: newQuestionArr });
  };

  textOnPress = () => {
    const { questionArr } = this.state;
    const newQuestionArr = questionArr.slice();
    newQuestionArr.push(true);
    this.setState({
      questionArr: newQuestionArr,
      colour: `rgb(${Math.random() * 255}, ${Math.random() *
        255}, ${Math.random() * 255})`,
      colour2: `rgb(${Math.random() * 255}, ${Math.random() *
        255}, ${Math.random() * 255})`
    });
  };

  revealQuestion = () => {
    this.setState({ readyForQuestion: true });
  };

  componentDidMount() {
    Animated.timing(this.state.fontSizeAnim, {
      toValue: 100,
      duration: 5000
    }).start();

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 3000
    }).start();
  }

  componentDidUpdate() {}

  render() {
    let {
      fadeAnim,
      fontSizeAnim,
      loggedIn,
      readyForQuestion,
      questionArr
    } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: this.state.colour, opacity: fadeAnim }
        ]}
      >
        <Svg style={{ flex: 1 }} height="200" width="400">
          {questionArr.map((ele, i) => {
            let colour = "";
            if (ele) {
              colour = "green";
            } else {
              colour = "red";
            }
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => this.circleOnPress(i)}
              >
                <Circle
                  cx={`${40 + i * 65}`}
                  cy="100"
                  r={`${25}`}
                  stroke={colour}
                  strokeWidth="3"
                  fill={`rgb(${(i * 50) % 255}, 100, 100)`}
                />
              </TouchableWithoutFeedback>
            );
          })}
          {questionArr.map((ele, i) => {
            if (i < questionArr.length - 1) {
              return (
                <Line
                  key={i}
                  x1={`${66 + i * 65}`}
                  y1="100"
                  x2={`${79 + i * 65}`}
                  y2="100"
                  stroke={`rgb(${(i * 60) % 255}, 0, 0)`}
                  strokeWidth="2"
                />
              );
            }
          })}
        </Svg>
        <ScrollView style={[{ flex: 3 }, styles.blockItem]}>
          <Animated.Text style={[styles.textStyle, { fontSize: fontSizeAnim }]}>
            This is
            <Text style={{ color: "hotpink" }}>{"\n"}CHASING PACK</Text>
          </Animated.Text>
        </ScrollView>
        <View
          style={[{ flex: 2, backgroundColor: "skyblue" }, styles.blockItem]}
        >
          <Text
            style={{
              color: "orange",
              fontSize: 20
            }}
          >
            A live betting game
          </Text>
          {!readyForQuestion ? (
            <TouchableWithoutFeedback onPress={this.revealQuestion}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.questionQ}>Tap for a Question</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <Question />
          )}
        </View>
        <TouchableNativeFeedback onPress={this.textOnPress}>
          <View
            style={[
              { flex: 1, backgroundColor: "steelblue" },
              styles.blockItem
            ]}
          >
            <Text style={{ fontSize: 30 }}>Press Me to change colour</Text>
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#EEE8AA",
    alignItems: "center"
  },
  textStyle: {
    fontWeight: "bold"
  },
  questionQ: {
    fontSize: 35,
    color: "purple"
  },
  blockItem: {
    padding: 25,
    margin: 30,
    borderRadius: 7
  }
});
