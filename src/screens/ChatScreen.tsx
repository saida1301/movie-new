import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { sendMessageToChatGPT } from '../sendMessageToChatGpt';
import { borderRadius, colors, fontSizes, spacing } from '../assets/themes';
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

  const renderItem = ({ item }:{ item: Message }) => {
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
          placeholder="Mesajınızı yazın..."
          placeholderTextColor={"#8843E1"}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <TouchableOpacity onPress={handleSend}>
            <Text style={{color: "#8843E1", marginRight:10}}>Göndər</Text>
          </TouchableOpacity>

        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor:colors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.medium,
  },
  textInput: {
    color: colors.white,
width: '80%',
    marginRight: spacing.medium,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.small,
    padding: spacing.small,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.medium,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    backgroundColor: colors.primary,
    padding: spacing.small,
    borderRadius: borderRadius.small,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    marginRight: 8,
    marginLeft: '20%',
  },
  messageText: {
    fontSize: fontSizes.small,
  },
});

export default ChatScreen;
