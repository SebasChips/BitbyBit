import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      color: '#333',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    topicsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    topicButton: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '48%',
    },
    selectedTopic: {
      backgroundColor: '#4CAF50',
    },
    topicText: {
      textAlign: 'center',
      color: '#333',
    },
    selectedTopicText: {
      color: '#fff',
    },
    selectionText: {
      textAlign: 'right',
      fontSize: 14,
      color: '#666',
    },
    submitButton: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });