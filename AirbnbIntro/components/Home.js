import * as React from "react";
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
} from "react-native";

import Category from "./Category";
import CityCard from "./CityCard";
import HomeCard from "./HomeCard";
import StyleGuide from "./StyleGuide";

import {
  Homes, Experiences, Restaurants, CapeTown, London, LosAngeles, Miami, Nairobi, Paris, SanFrancisco, Tokyo,
} from "./Images";

const homes = [
  {
    category1: "Entire apartment",
    category2: "1 bedroom",
    title: "Centric studio with roof top terrace",
    price: {
      amount: 85,
      currency: "CHF",
    },
    // eslint-disable-next-line max-len
    picture: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/homes%2F19115781%2Fb16db24e-d530-4601-8ac1-9af91e8c06fc.jpg?alt=media&token=46c15767-8008-4e64-bfef-92865faab2c2",
  },
  {
    category1: "Entire apartment",
    category2: "1 bedroom",
    title: "Great studio in Zurich center",
    price: {
      amount: 52,
      currency: "CHF",
    },
    // eslint-disable-next-line max-len
    picture: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/homes%2F10055779%2F4d82a918-3a61-4da2-965d-e33b76d891f6.jpg?alt=media&token=115f1f99-7dc5-4942-9a60-7d342aae2435",
  },
];

// eslint-disable-next-line react/prefer-stateless-function
export default class Explore extends React.PureComponent {

  explore = React.createRef();
  city = React.createRef();
  
  componentDidMount() {
    const { onLoad } = this.props;
    setTimeout(() => {
      onLoad()
    }, 1000);
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View>
            <Text ref={this.explore} style={styles.title1}>Explore</Text>
            <ScrollView horizontal style={styles.scrollView} contentContainerStyle={styles.container}>
              <Category label="Homes" image={Homes} />
              <Category label="Experiences" image={Experiences} />
              <Category label="Restaurants" image={Restaurants} />
            </ScrollView>
            <View>
              <Text style={styles.title2} ref={this.city}>Zürich</Text>
              <ScrollView
                horizontal
                style={styles.scrollView}
                contentContainerStyle={styles.container}
              >
                <HomeCard home={homes[0]} />
                <HomeCard home={homes[1]} />
              </ScrollView>
            </View>
            <View>
              <ScrollView horizontal style={styles.scrollView} contentContainerStyle={styles.container}>
                <CityCard label="Cape Town" image={CapeTown} />
                <CityCard label="London" image={London} />
                <CityCard label="Los Angeles" image={LosAngeles} />
                <CityCard label="Miami" image={Miami} />
                <CityCard label="Nairobi" image={Nairobi} />
                <CityCard label="Paris" image={Paris} />
                <CityCard label="San Francisco" image={SanFrancisco} />
                <CityCard label="Tokyo" image={Tokyo} />
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  title1: {
    ...StyleGuide.typography.title1,
    paddingLeft: StyleGuide.spacing.base,
  },
  title2: {
    ...StyleGuide.typography.title2,
    paddingLeft: StyleGuide.spacing.base,
  },
  scrollView: {
    paddingHorizontal: StyleGuide.spacing.base,
    marginBottom: StyleGuide.spacing.base,
  },
  container: {
    paddingRight: StyleGuide.spacing.base,
  },
});
