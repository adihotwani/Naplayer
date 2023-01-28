import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity,  } from "react-native";
import { API_Key } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";

const AlbumListFetcher = () => {
    const [data, setdata ] = useState<any>([]);
    const [loading, setLoading ] = useState(true);
    var tracklink: any
    var trackcount: any
    var image: any
    var albumid: any;

    const navigation: any = useNavigation();
    let getAlbums = () => {
        fetch('https://api.napster.com/v2.2/albums/top'+API_Key)
        .then((response) => response.json())
        .then((json) => setdata(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        
    }

    useEffect(() => {
        getAlbums();
    }, [])
    
    let renderItem = ({item}: any) => {
        albumid = item.id
        image=item.links.images.href
        trackcount = item.trackCount
        tracklink=item.links.tracks.href
        let onalbumclick = () => {
            navigation.navigate('TrackDisplay',{tracks: trackcount, link: tracklink, albumid: albumid } )
        }
        return(
            
                <TouchableOpacity onPress={onalbumclick} style={styles.albumItem}>
                    <View style={{width: '80%'}}>
                        <Text style={styles.albumname}>{item.name.toString()}</Text>
                        <Text style={styles.albumartists}>{item.artistName.toString()}</Text>
                        <Text style={styles.albumrel}>{item.released.toString()}</Text>
                    </View>
                    <Text style={styles.albumtracks}>{item.trackCount.toString()}</Text>
                </TouchableOpacity>
            
        )
    }
    return(
        <View>
        {loading ? <Text style={styles.loadingtext}>Loading...</Text> : 
        ( <View style={styles.maincontainer}>
            <FlatList
            scrollEnabled= {true}
              data={data.albums}
              keyExtractor={({ id }, index) => id}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: { padding: 5, backgroundColor: '#FFF'},
    loadingtext: {fontSize: 20, color:'#000', alignItems: 'center'},
    albumItem: {margin: 5,flexDirection: 'row', borderWidth: 1, padding: 5, borderRadius: 10},
    albumname: {marginLeft: 10, marginTop: 5,color: '#000', fontWeight: 'bold', fontSize: 20},
    albumartists: {marginLeft: 20, marginTop:2, fontSize: 18,color: '#000'},
    albumrel: {marginLeft: 20, marginTop: 2,marginBottom:5, fontSize: 15,color: '#000'},
    albumtracks: {justifyContent: 'center', alignItems: 'center', fontSize: 25,color: '#000', padding: 10, fontWeight: 'bold', width: '20%'},
    touchable: {flexDirection: 'row'}
})

export default AlbumListFetcher;