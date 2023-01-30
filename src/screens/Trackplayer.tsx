import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { event } from "react-native-reanimated";
import TrackPlayer, { useTrackPlayerEvents, Event, State } from 'react-native-track-player'

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.RemotePlay,
    Event.RemotePause,
];

const Trackplayer = ({route}: any) => {
    const [currentId, setcurrentId] = useState(route.params.trackid);
    const [currenttrack, settrack] = useState(route.params.track);
    const tracklist = route.params.tracklist;
    const [isPlaying, setisPlaying] = useState(false);
    const albumid = route.params.albumid;
    // useTrackPlayerEvents(events, event => {
    //     if (event.type === Event.PlaybackError) {
    //         console.warn('An error occured while playing the current track');
    //     }
    //     if (event.type === Event.PlaybackState) {
    //         console.log(event.type)
    //     }
    //     if (event.type === Event.RemotePlay) {
    //         console.log(event.type)
    //     }
    //     if(event.type === Event.RemotePause) {
    //         console.log(event.type)
    //     }
    // });
    const setup = async () => {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add(tracklist);
      }
      useEffect(()=>{
        setup();
    },[])
    const PlayandPause = async isCurrentTrack => {
        const state = await TrackPlayer.getState();
        if (state === State.Paused && isCurrentTrack){
            setisPlaying(!isPlaying);
            TrackPlayer.play();
            return;
        }

        if( state === State.Playing && isCurrentTrack) {
            setisPlaying(!isPlaying);
            TrackPlayer.pause();
            return;
        }
        setisPlaying(true);
        TrackPlayer.play();
    }
    const playnext = () => {
        settrack(
            tracklist[(currentId+1)%tracklist.length]
        )
        setcurrentId(currentId+1);
        TrackPlayer.skipToNext();
        PlayandPause(currenttrack);
    }
    const playprev = () => {
        settrack(
            tracklist[(currentId+1)%tracklist.length]
        )
        setcurrentId(currentId+1);
        TrackPlayer.skipToPrevious();
        PlayandPause(currenttrack);
    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.coverimage} source={{uri: `https://api.napster.com/imageserver/v2/albums/${albumid}/images/500x500.png`}} />
            <Text style={styles.trackname}>{currenttrack.name}</Text>
            <View style={styles.playercontainer}>
                <TouchableOpacity onPress={playprev} style={styles.circularbutton}>
                    <Image style={{width: 60, height: 60}} source={require('./../assets/icons/leftarrow.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={PlayandPause} style={styles.circularbutton}>
                    <Image style={{width: 60, height: 60}} source={require('./../assets/icons/play.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={playnext} style={styles.circularbutton}>
                    <Image style={{width: 60, height: 60}} source={require('./../assets/icons/rightarrow.png')}/>
                </TouchableOpacity>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {width: '100%', height: '100%', backgroundColor: '#fff' },
    coverimage: {width: '100%', height: '70%', borderRadius: 20, borderWidth: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10},
    trackname: {fontWeight: 'bold' , alignSelf: 'center', marginTop: 10, fontSize: 30, color:'#37dad4'},
    playercontainer: {flexDirection: 'row', justifyContent: 'space-evenly', padding: 30},
    circularbutton: {width: 50, height: 50, borderRadius: 100/2},
})

export default Trackplayer