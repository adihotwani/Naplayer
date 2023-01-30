import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { API_Key } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";

type linkprops = {
    link: string;
    tracks: string;
    albumid: string;
}

const TrackListFetcher = (props: linkprops) => {
    var track: any
    var tracklist: any
    const [data, setdata ] = useState<any>([]);
    const [loading, setLoading ] = useState(true);
    const navigation: any = useNavigation();
    const [albumid1,setalbumid] = useState('');
    const imageurl = `https://api.napster.com/imageserver/v2/albums/${albumid1}/images/500x500.png`
    let getTracks = () => {
        fetch(props.link.toString()+API_Key)
        .then((response) => response.json())
        .then((json) => setdata(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } 
    useEffect(()=>{
        
        tracklist = data.tracks;
        console.log(props.link)
        console.log(albumid1)
        console.log(props.albumid);
        setalbumid(props.albumid)
        getTracks();
    },[])
    const renderItem = ({item, index}: any) => {
        track=item
        let min: any = Math.round((item.playbackSeconds)/60);
        let ontrackclick =() => {
            navigation.navigate('Trackplayer', {albumid: albumid1, track: track,tracks: tracklist,trackid: index})
        }
        return(
            <TouchableOpacity onPress={ontrackclick} style={styles.trackItem}>
                    <Image style={styles.playbutton} source={require('./../assets/buttons/playpause.png')} />
                    <View style={{width: '80%'}}>
                        <Text style={styles.trackname}>{item.name.toString()}</Text>
                        <Text style={styles.tracktime}>{min} min</Text>
                        <Text style={styles.trackartist}>{item.artistName.toString()}</Text>
                    </View>
                </TouchableOpacity>
        )
    }
    return(
        <View>
        {loading ? <Text style={styles.loadingtext}>Loading...</Text> : 
        ( <View style={styles.maincontainer}>
            <Image style={{width: '100%', height: '25%', borderRadius: 20, borderWidth: 1}} source={{uri: imageurl}}/>
            <Text style={{color: '#000', fontSize: 20}}>Total tracks: {props.tracks}</Text>
            <FlatList
            scrollEnabled= {true}
              data={data.tracks}
              keyExtractor={({ id }, index) => id}
              renderItem={renderItem}
              extraData={albumid1}
            />
          </View>
        )}
      </View>
    )
}

const styles = StyleSheet.create({
    trackItem: {margin: 5,flexDirection: 'row', borderWidth: 1, padding: 5, borderRadius: 10},
    maincontainer: { padding: 5, backgroundColor: '#FFF'},
    loadingtext: {fontSize: 20, color:'#000', alignItems: 'center'},
    trackname: {marginLeft: 10, marginTop: 5,color: '#000', fontWeight: 'bold', fontSize: 20},
    tracktime: {marginLeft: 20, marginTop:2, fontSize: 18,color: '#000'},
    trackartist: {marginLeft: 20, marginTop: 2,marginBottom:5, fontSize: 15,color: '#000'},
    playbutton: {justifyContent: 'center', alignItems: 'center', color: '#000', padding: 10, fontWeight: 'bold', width: '20%', height: '100%'},
})

export default TrackListFetcher;