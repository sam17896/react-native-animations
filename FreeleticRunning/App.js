import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, PermissionsAndroid, ActivityIndicator } from 'react-native';
import RNLocation from 'react-native-location';
import Running from './components/Running';

RNLocation.configure({
  distanceFilter: 5.0
})
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready : false
    };
  }

  async componentDidMount() {
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
      if(granted) {
        RNLocation.getLatestLocation().then(location => {
          const {latitude, longitude} = location;
          this.setState({ ready: true, latitude, longitude })
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  requestLocationPermission = async() => {
    try {
      if(Platform.OS == 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'This App needs access to your location ' +
                      'so we can know where you are.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use locations ")
        } else {
          console.log("Location permission denied")
        }
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    const { ready, latitude, longitude } = this.state;
    return (<>
    <StatusBar barStyle="light-content" />
    {
      !ready && (<View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View> ) 
    }
    {
      ready && <Running distance={200} {...{latitude, longitude}}/>

    }
    </>)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29252b',
    alignItems: 'center',
    justifyContent: 'center'
  }
})