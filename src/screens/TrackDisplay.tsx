import React, { useEffect } from "react";
import { Text, View } from "react-native";
import TrackListFetcher from "../components/TrackListFetcher";


const TrackDisplay = ({route}: any) => {
  const { tracks, link, albumid } = route.params;
    return(
        <View style={{width: '100%', height: '100%'}}>
            <TrackListFetcher link= {link} tracks={tracks} albumid={albumid}/>
        </View>
    )
}


export default TrackDisplay;