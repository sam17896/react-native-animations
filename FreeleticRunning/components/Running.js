import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Polyline } from 'react-native-maps';
import RNLocation from 'react-native-location';
import Monitor from './Monitor';
import * as turf from '@turf/turf';
import Pin from './Pin';
RNLocation.configure({
    distanceFilter: 1,
    interval: 1000
});

const distanceBetween = (lastPosition, currentPosition) => {
    var from = turf.point([lastPosition.longitude, lastPosition.latitude]);
    var to = turf.point([currentPosition.longitude, currentPosition.latitude]);
    var options = { units: 'meters' };

    var distance = turf.distance(from, to, options);
    return Math.round(distance);
}
export default class Running extends Component {
  constructor(props) {
    super(props);
    this.state = {
        positions: [],
        distance: 0
    };
  }

  componentDidMount() {
    RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse"
        }
      }).then(granted => {
          if(granted) {
            this.locationSubcribtion = RNLocation.subscribeToLocationUpdates((location) => {
                this._map.animateCamera({center: {latitude: location[0].latitude, longitude:  location[0].longitude}}, 1000);
                const {latitude, longitude} = this.props;
                const lastPosition = this.state.positions.length === 0 ? { latitude, longitude, speed: 0 } : this.state.positions[this.state.positions.length - 1]
                const distance = this.state.distance + distanceBetween(lastPosition, location[0]);
                const pace = location[0].speed
                this.setState({ positions: this.state.positions.concat(location[0]), distance, pace })
            }, err => {
                console.log(err);
            });
          }
      })
    }

componentWillUnmount() {
    if(this.locationSubcribtion) {
        this.locationSubcribtion()
    }
        
}

  render() {
    const { positions, distance, pace } = this.state;
    const {  latitude, longitude, distance: totalDistance } = this.props;
    const currentPosition = positions.length === 0 ? { latitude, longitude } : positions[positions.length - 1];
    return (
      <View style={styles.container}>
        <Monitor {...{ distance, pace, totalDistance }}  />
        <MapView
            ref={ref => this._map = ref}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude, 
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.01
            }}
        >
            <Marker coordinate={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
            }}
            anchor={{x: 0.5, y: 0.5}}
            >
                <Pin />
            </Marker>
            <Polyline  coordinates={positions} strokeWidth={10} strokeColor={'#f2b659'} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 0.61
    }
})
