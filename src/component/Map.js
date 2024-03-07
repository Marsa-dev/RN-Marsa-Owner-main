import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
  Permissions
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import { useTranslation } from 'react-i18next';

let mapRef = null;
const { width, height } = Dimensions.get("window");
let aspectRatio = width / height;
let ltDelta = 0.0712;
let lgDelta = ltDelta * aspectRatio;

const Map = ({getLatLong}) => {
  const [coords, setCoords] = useState({
    latitude: 31.4580019,
    longitude: 74.26721,
  });
  const [locationGranted, setLocationGranted] = useState(false);
  // console.log(coords);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState('Pick up Location');

  useEffect(() => {
    // checkLocationPermission();
    // onMapReady()
  }, []);
  // useEffect(() => {
  //   geoLocation();
  // }, []);

  // useEffect(() => {
  //   getAddress(coords.latitude, coords.longitude);
  // }, [coords]);

  const onMapReady = () => {
    getMyCurrentLocation();
  };

  const getMyCurrentLocation = () => {
    geoLocation()
      .then((location) => {
        console.log("WHAT IS USER LOCATION: ", location);
        let myLocation = {};
        myLocation.latitude = location?.coords?.latitude;
        myLocation.longitude = location?.coords?.longitude;
        myLocation.latitudeDelta = ltDelta;
        myLocation.longitudeDelta = lgDelta;
        console.log("what is mylocation", myLocation);
        setCoords(myLocation);
        setLocationGranted(true);
        // getAddress(location.coords.latitude, location.coords.longitude);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLocationGranted(false);
      });
  };

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to function properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        geoLocation();
      } else {
        Alert.alert(
          'Location permission denied',
          'Please enable location services for this app.',
          [
            {
              text: 'OK',
              onPress: () => checkLocationPermission(),
            },
          ],
        );
        setLoading(false); // Hide loading indicator
      }
    } catch (err) {
      console.warn(err);
      setLoading(false); // Hide loading indicator
    }
  };

  const geoLocation = () => {
    console.log("CHEC");
    return new Promise((resolve, reject) => {
      if (Platform.OS === "ios") {
        Geolocation.requestAuthorization("whenInUse")
          .then((response) => {
            console.log("WHAT IS GEOLOCATION RESPONSE FROM IOS: ", response);
            if (response === "granted") {
              Geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              );
            } else {
              reject("location permission denied");
            }
          })
          .catch((error) => reject(error));
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
          .then((response) => {
            if (response === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                (position) => {
                  resolve(position);
                },
                (error) => {
                  reject(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              );
            } else {
              console.log("location permission denied");
              reject("location permission denied");
            }
          })
          .catch((error) => reject(error));
      }
    });
  };

  

  const getAddress = async (lat, lng) => {
    // Geocoder.fallbackToGoogle('AIzaSyAk4uqRP7reu9FMSBSqaNEp1oVBAM7mgQM');

    // // use the lib as usual
    // let res = await Geocoder.geocodePosition({lat, lng});
    // setAddress(res[0].formattedAddress);
  };

  const handleMapPress = e => {
    // Update marker's coordinate and state variables
    setCoords({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    getAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
  };
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      
        <MapView
          style={styles.map}
          mapType={'standard'}
          initialRegion={{
            latitude: coords?.latitude,
            longitude: coords?.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: coords?.latitude,
            longitude: coords?.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onMapReady={() => {
            console.log("ready to map");
            onMapReady();
          }}
          onPress={handleMapPress} // Add onPress event handler
        >
          <Marker
            coordinate={{
              latitude: coords?.latitude,
              longitude: coords?.longitude,
            }}
            >
           
          </Marker>
        </MapView>
      
  { getLatLong &&
      <View style={{position:'absolute', alignSelf:'center', bottom:0, height:hp(10)}}>
            <Button
              label={t('pickupLocation')}
              onPress={() => {getLatLong(coords)}}
            />
      </View>
  }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;