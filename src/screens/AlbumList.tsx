import React from 'react';
import { View, } from 'react-native';
import AlbumListFetcher from '../components/AlbumListFetcher';

const AlbumList = ({navigation}: any) => {
    return(
        <View style={{width: '100%', height: '100%'}}>
            <AlbumListFetcher/>
        </View>
    )
}





export default AlbumList;
