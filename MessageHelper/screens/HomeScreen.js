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
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    phone: '',
    code: ''
 }
 handlePhone = (text) => {
    this.setState({ phone: text })
 }
  handleCode = (text) => {
    this.setState({ code: text })
 }
  render() {  
    return (  
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/MessageIcon.png')
                  : require('../assets/images/MessageIcon.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            
              
            <Text style={styles.getStartedText}>Enter your phone number:</Text>
            
            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <TextInput style={(styles.class, {height: 30, width:250})} 
               underlineColorAndroid = "transparent"
               placeholder = "Phone Number"
               placeholderTextColor = "#a4afc1"
               autoCapitalize = "none"
               onChangeText = {this.handlePhone}
               />
            </View> 
            <View>
            
             <TouchableOpacity  style = {{backgroundColor:"#f9c134", padding: 10}}
              
               >
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>   
              </View>           
            <Text style={styles.getStartedText}>
              Enter your code:
            </Text>
            
            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <TextInput style={(styles.class, {height: 30, width:250})}
               underlineColorAndroid = "transparent"
               placeholder = "Code"
               placeholderTextColor = "#a4afc1"
               autoCapitalize = "none"
               onChangeText = {this.handleCode}/>
      
            </View>
            <View>
            <TouchableOpacity style = {{backgroundColor:"#f9c134", padding: 10}}>
               <Text style = {styles.submitButtonText}>
                  Submit
               </Text>    
               </TouchableOpacity>
            </View>
          </View>
                
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Didn't recieve text?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        
      </View>
    );
  }

  

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.google.com/document/d/1OZVqHYkyu_sHYJTiGhRvqB4RIFRJb8CF3zP_Fsw_-dE/edit'
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
