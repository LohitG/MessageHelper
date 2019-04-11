import { ExpoLinksView } from '@expo/samples';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  AppRegistry,
  Button,
  FlatList,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Recent Messages',
  };
  handleResponse = (text) => {
    this.setState({ response: text })
 }
 render() {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: '                                  Mom:', data: ['  turn on the dishwasher']},
          {title: '                                  Dad:', data: ['  take out the trash']},
          {title: '                                  Mark:', data: ['  aye bro u tryna ball?']},
          
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
      <TouchableOpacity  style = {{backgroundColor:"#f9c134", padding: 10}}
              
              >
              <Text style = {styles.submitButtonText}>                                 Refresh </Text>
           </TouchableOpacity>  
    </View>
  );
}



_handleLearnMorePress = () => {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
};

_handleHelpPress = () => {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  );
};
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
},
developmentModeText: {
  marginBottom: 20,
  color: 'rgba(0,0,0,0.4)',
  fontSize: 14,
  lineHeight: 19,
  textAlign: 'center',
},
contentContainer: {
  paddingTop: 30,
},
welcomeContainer: {
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 20,
},
welcomeImage: {
  width: 100,
  height: 80,
  resizeMode: 'contain',
  marginTop: 3,
  marginLeft: -10,
},
sectionHeader: {
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
  fontSize: 14,
  fontWeight: 'bold',
  backgroundColor: 'rgba(247,247,247,1.0)',
},
getStartedContainer: {
  alignItems: 'center',
  marginHorizontal: 50,
},
homeScreenFilename: {
  marginVertical: 7,
},
codeHighlightText: {
  color: 'rgba(96,100,109, 0.8)',
},
codeHighlightContainer: {
  backgroundColor: 'rgba(0,0,0,0.05)',
  borderRadius: 3,
  paddingHorizontal: 4,
},
getStartedText: {
  fontSize: 17,
  color: 'rgba(96,100,109, 1)',
  lineHeight: 24,
  textAlign: 'center',
},
tabBarInfoContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 20,
    },
  }),
  alignItems: 'center',
  backgroundColor: '#fbfbfb',
  paddingVertical: 20,
},
tabBarInfoText: {
  fontSize: 17,
  color: 'rgba(96,100,109, 1)',
  textAlign: 'center',
},
navigationFilename: {
  marginTop: 5,
},
helpContainer: {
  marginTop: 15,
  alignItems: 'center',
},
helpLink: {
  paddingVertical: 15,
},
helpLinkText: {
  fontSize: 14,
  color: '#2e78b7',
},
});