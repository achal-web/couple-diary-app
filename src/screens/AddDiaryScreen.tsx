import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addEntry } from '../redux/slices/diarySlice';
import { v4 as uuidv4 } from 'uuid';

const AddDiaryScreen = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('Happy');

  const emotions = ['Happy', 'Sad', 'Excited', 'Grateful', 'Loved', 'Peaceful'];

  const handleAddEntry = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newEntry = {
      id: uuidv4(),
      title,
      content,
      emotion,
      date: new Date().toLocaleDateString(),
    };

    dispatch(addEntry(newEntry));
    setTitle('');
    setContent('');
    setEmotion('Happy');
    Alert.alert('Success', 'Memory saved!');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Give your memory a title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>How are you feeling?</Text>
        <View style={styles.emotionContainer}>
          {emotions.map((e) => (
            <TouchableOpacity
              key={e}
              style={[
                styles.emotionButton,
                emotion === e && styles.emotionButtonActive,
              ]}
              onPress={() => setEmotion(e)}>
              <Text
                style={[
                  styles.emotionButtonText,
                  emotion === e && styles.emotionButtonTextActive,
                ]}>
                {e}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Your Memory</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your memory here..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          placeholderTextColor="#ccc"
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
          <Text style={styles.buttonText}>Save Memory</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 150,
  },
  emotionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emotionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  emotionButtonActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  emotionButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  emotionButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddDiaryScreen;