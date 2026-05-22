import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const HomeScreen = () => {
  const entries = useSelector((state: RootState) => state.diary.entries);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {entries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No memories yet</Text>
            <Text style={styles.emptySubtext}>
              Create your first memory by tapping the Add Memory tab
            </Text>
          </View>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.entryCard}>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDate}>{item.date}</Text>
                <Text style={styles.entryContent}>{item.content}</Text>
                <Text style={styles.emotion}>Feeling: {item.emotion}</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  entryCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B9D',
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  entryDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  entryContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  emotion: {
    fontSize: 12,
    color: '#FF6B9D',
    fontWeight: '600',
  },
});

export default HomeScreen;