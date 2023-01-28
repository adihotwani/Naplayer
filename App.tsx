/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import AlbumList from './src/screens/AlbumList';
import TrackDisplay from './src/screens/TrackDisplay';
import Trackplayer from './src/screens/Trackplayer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='AlbumList' component={AlbumList} />
        <Stack.Screen name='TrackDisplay' component={TrackDisplay} />
        <Stack.Screen name='Trackplayer' component={Trackplayer} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};



export default App;
