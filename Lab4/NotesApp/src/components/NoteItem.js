import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = [
  '#8ef6e4', 
  '#9896f1', 
  '#d59bf6', 
  '#edb1f1', 
  '#f4dfb3', 
  '#a6d9f7', 
  '#f8c4b4', 
  '#b5f5ec', 
  '#d3adf7', 
  '#f6ffbe', 
];

const NoteItem = ({ note, onPress, onLongPress }) => {
  const bgColor = note.color || COLORS[Math.floor(Math.random() * COLORS.length)];

  const formatDate = timestamp => {
    if (!timestamp) return '';
    
    try {
      const date = timestamp.toDate();
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (error) {
      return '';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: bgColor }]} 
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {note.title || 'Không có tiêu đề'}
        </Text>
        <Text style={styles.noteText} numberOfLines={4}>
          {note.text}
        </Text>
        <Text style={styles.dateText}>
          {formatDate(note.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 8,
    minHeight: 150,
  },
  noteContainer: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
});

export default NoteItem; 