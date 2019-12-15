import React from "react";
import {
  StyleSheet, View,
} from "react-native";

import Home from "./components/Home";
import Tabbar from "./components/Tabbar";
import Intro from './components/Intro';


const measure =  (ref) => new Promise(
  resolve => ref.current.measureInWindow(
    (x, y, width, height) => resolve({x, y, width, height}) )
)


export default class App extends React.Component {
  home = React.createRef();
  state = {
    steps: null
  }

  onLoad = async () => {
    const explore = measure(this.home.current.explore);
    const city = measure(this.home.current.city);
    const measurements = await Promise.all([explore, city]);
    const steps = [{
      x: measurements[0].x,
      y:  measurements[0].y,
      label: "Explore what the app has to offer. Choose between homes, experiences, restaurants, and more.",
    }, {
      x:  measurements[1].x,
      y:  measurements[1].y,
      label: "Find the best accomodation in your favorite city.",
    }];
    this.setState({steps});
  }

  render() {
    const { onLoad } = this;
    const { steps } = this.state;
    return (
      <View style={styles.container}>
        <Home ref={this.home}  onLoad={onLoad}/>
        <Tabbar />
        {
          steps && (
            <Intro {...{steps}}/>
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
