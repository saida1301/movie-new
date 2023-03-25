import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { sendMessageToChatGPT } from '../sendMessageToChatGpt';
interface Message {
  message: string;
  isUser: boolean;
}

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message) return;

    setLoading(true);
    try {
      const chatResponse = await sendMessageToChatGPT(message);
      setChatHistory(prevHistory => [...prevHistory, { message, isUser: true }, { message: chatResponse, isUser: false }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setMessage('');
  };

  const renderItem = ({ item }:any) => {
    return (
      <View style={[styles.messageContainer, item.isUser && styles.userMessageContainer]}>
        <View style={[styles.messageBubble, item.isUser && styles.userMessageBubble]}>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chatContainer}
        data={chatHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor={"#8843E1"}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <TouchableOpacity onPress={handleSend}>
            <Text style={{color: "#8843E1", marginRight:10}}>Send</Text>
          </TouchableOpacity>

        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#8843E1 ',
  },
  textInput: {
    color: "white",
width: '80%',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#8843E1',
    borderRadius: 8,
    padding: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    marginRight: 8,
    marginLeft: '20%',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatScreen;
