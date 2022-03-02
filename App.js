/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect }from 'react';
import {View, Text, TouchableOpacity, StatusBar, Linking} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.5); 



const App: () => Node = () => { 

  const [Quote, setQuote] = useState('Loading...'); 
  const [Author, setAuthor ] = useState('Loading...'); 
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const randomQuotes = () => {
    fetch('http://api.quotable.io/random').then(results => results.json()).then(result => {
      console.log(result.content);
      setQuote(result.content);
      setAuthor(result.author);
      setIsLoading(false);
    })
  }

  //to generate new Quotes
  useEffect(() => {
    randomQuotes();
  }, [])

  //to speak the quote when button pressed
  const speakNow = () => {
    Tts.stop();
    Tts.speak(Quote + 'by' + Author); 
    Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
  }

    //to copy Quote to clipboard 
  const copyToClipboard = () => {
    Clipboard.setString(Quote);
    Snackbar.show({
      text: 'Quote Copied',
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  const tweetNow = () => {
    const url = "https://twitter.com/intent/tweet?text=" + Quote;
  Linking.openURL(url);
  }
 

  return (
    <View style={{flex: 1, justifyContent: 'center', 
          alignItems: 'center', backgroundColor: 'lightblue'}}
        >
          <StatusBar barStyle='light-content'/>

      <View style={{width: '90%', backgroundColor: '#fff', 
                      borderRadius: 20, padding: 20 }}> 

              <Text style={{textAlign: 'center', fontSize: 26, 
              fontWeight: '600', color: '#333'
                      }}> 
                      {isLoading? 'Loading...' :'Quote Of The Day!'} </Text>

                      {/**Quote component */}
                <FontAwesome5 name='quote-left' 
                      style={{fontSize: 20, marginBottom: -20, 
                      textAlign: 'left'}} />      
                 
                  <Text style={{
                        color: '#000', fontSize: 16, 
                        lineHeight: 26, 
                        letterSpacing: 1.1, 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        paddingHorizontal: 30,
                      }}
                      > 
                      {Quote}
                         </Text>  
                          <FontAwesome5 name='quote-right' 
                                        style={{fontSize: 20, marginTop: -30, 
                                        marginBotton: 20, textAlign: 'right'}} />
                          
                            {/**author section  */}
                         <Text style={{textAlign: 'right', fontWeight: 'bold',
                                fontSize: 16, color: '#000' }}> ---{Author} </Text>
      </View>

<View> 
      <TouchableOpacity >
        <Text onPress={randomQuotes}
                style={{
                  backgroundColor: '#5372f0',
                  padding: 20,
                  borderRadius: 30, 
                  marginVertical: 20,
                }}
              >Generate New Quote </Text>

      </TouchableOpacity>

          {/**this is the 3 buttons section with speech reading, copy buttons and twitter share button
           * the speak button is not working beause theres is an issue with google 
           */}
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
         <TouchableOpacity  onPress={speakNow} 
                            style={{borderWidth: 2,
                            borderColor: '#5372f0',
                            padding: 15,
                            backgroundColor: isSpeaking ? '#red' : 'orange'
                      }} >
        <FontAwesome name="volume-up" size={22} color='#5372f0' />        
         </TouchableOpacity>

         <TouchableOpacity  onPress={copyToClipboard} 
                        style={{borderWidth: 2,
                          borderColor: '#5372f0'
                      }} >
        <FontAwesome name="copy" size={22} color='#5372f0' />        
         </TouchableOpacity>
         <TouchableOpacity  onPress={tweetNow} 
                        style={{borderWidth: 2,
                          borderColor: '#5372f0'
                      }} >
        <FontAwesome name="twitter" size={22} color='#5372f0' />        
         </TouchableOpacity>
        </View>
      </View> 
    </View>
  );
};


export default App;
