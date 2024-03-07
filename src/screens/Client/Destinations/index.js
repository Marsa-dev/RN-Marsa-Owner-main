import { View, Text, Image, ScrollView, ImageBackground, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import Header from '../../../component/Header';
import SearchBar from '../../../component/SearchBar';
import icons from '../../../assets/icons/icons';
import Button from '../../../component/Button';
import fontsSize from '../../../assets/fontsSize/fontsSizes';
import { BOATS } from '../../../constants/Navigators';
import { useSelector } from 'react-redux';
import Config from '../../../../utils/config';
import FastImage from 'react-native-fast-image';

const Destinations = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const [search, setSearch] = useState(null)
  const [filteredData, setFilteredData] = useState([]);
  const data = useSelector(state=> state.data.destination)
  useEffect(()=>{
    if(isFocused){
      setSearch(null)
    }
  },[isFocused])
  const handleSearchQueryChange = (query) => {
    setSearch(query);
    filterData(query);
  };
  const filterData = (query) => {
    const filteredItems = data?.filter((item) => {
      return item?.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredData(filteredItems);
  };
  const destinations = search ? filteredData : data
  return (
    <View style={styles.container}>
      <Header 
        title={'Top Yachting Destinations'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <SearchBar
            onChangeText={handleSearchQueryChange}
            value={search}
          />
        {
          data? 
            destinations?.map((item, index)=>{
            return(
              <FastImage
                style={styles.backgroundImage}
                source={{
                  uri: Config.BASE_URL + item?.image,
                  priority: FastImage.priority.normal,
                }}
                key={index.toString()}
                blurRadius={1}
              >
                <View style={[styles.itemContainer, {}]}>
                  <View style={styles.con1}>
                    <View style={styles.location}>
                      <Image 
                        source={icons.currentLocation}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.locationText}>{item?.title}</Text>
                    </View>
                    <View style={styles.button}> 
                      <Button
                        label={'See boats'}
                        width={'100%'}
                        textSize={fontsSize.px_10}
                        height={hp(3.5)}
                        onPress={()=> navigation.navigate(BOATS)}
                      />
                    </View>
                  </View>
                  <View style={styles.con2}></View>
                  <View style={styles.con3}>
                    <FastImage
                      style={styles.descriptionContainer}
                      source={{
                        uri: Config.BASE_URL + item?.image,
                        priority: FastImage.priority.normal,
                      }}
                      key={index.toString()}
                      resizeMode={FastImage.resizeMode.cover} // Adjust the resizeMode as needed
                      blurRadius={100}
                    >
                      <Text numberOfLines={3} style={styles.description}>
                        {item?.description}
                      </Text>
                    </FastImage>
                  </View>
                </View>
              </FastImage>
            )
          })
          :
          null
        }
        </View>

      </ScrollView>
    </View>
  )
}

export default Destinations