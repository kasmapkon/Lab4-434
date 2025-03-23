import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { firebase } from '../firebase/config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditNoteScreen = ({ route, navigation }) => {
  const { noteId, isNewNote } = route.params || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(!isNewNote);
  const [noteColor, setNoteColor] = useState('#f4dfb3');

  const notesRef = firebase.firestore().collection('notes');

  useEffect(() => {
    if (!isNewNote && noteId) {
      const subscriber = notesRef
        .doc(noteId)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            const noteData = documentSnapshot.data();
            setTitle(noteData.title || '');
            setContent(noteData.text || '');
            if (noteData.color) setNoteColor(noteData.color);
          }
          setLoading(false);
        });

      return () => subscriber();
    }
  }, [noteId, isNewNote]);

  const saveNote = async () => {
    if (content.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung ghi chú');
      return;
    }

    try {
      setLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const noteData = {
        title: title,
        text: content,
        color: noteColor,
        updatedAt: timestamp,
      };

      if (isNewNote) {
        noteData.createdAt = timestamp;
        await notesRef.add(noteData);
      } else {
        await notesRef.doc(noteId).update(noteData);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi lưu ghi chú:', error);
      Alert.alert('Lỗi', 'Không thể lưu ghi chú. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: noteColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isNewNote ? 'Tạo Ghi Chú' : 'Chỉnh Sửa Ghi Chú'}
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
          <Icon name="check" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Tiêu đề..."
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Nội dung ghi chú của bạn..."
          value={content}
          onChangeText={setContent}
          multiline={true}
          placeholderTextColor="#666"
          autoFocus={isNewNote}
        />
      </ScrollView>

      <View style={styles.formatBar}>
        <TouchableOpacity style={styles.formatButton}>
          <Icon name="format-bold" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.formatButton}>
          <Icon name="format-italic" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.formatButton}>
          <Icon name="format-underlined" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.formatButton}>
          <Icon name="image" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.formatButton}>
          <Icon name="keyboard-voice" size={24} color="#555" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlignVertical: 'top',
    flex: 1,
    minHeight: 300,
  },
  formatBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
  },
  formatButton: {
    padding: 8,
    marginHorizontal: 4,
  },
});

export default EditNoteScreen; 