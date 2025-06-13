import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  // Layout
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  
  // Header
  headerContainer: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#000000',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 40,
  },
  headerImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  
  // Form
  formContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  formSection: {
    marginBottom: 25,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  
  // Inputs
  input: {
    backgroundColor: '#f8f8f8',
    color: '#333',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputLabel: {
    color: '#555',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  webDateInputContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  webDateInput: {
    width: '100%',
    fontSize: 16,
    border: 'none',
    backgroundColor: 'transparent',
    padding: 16,
    color: '#333',
  },
webDateContainer: {
  width: '100%',
  marginBottom: 16,
},
webInputWrapper: {
  position: 'relative',
  width: '100%',
},
webDateInput: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  zIndex: 10,
  cursor: 'pointer',
},
webDateDisplay: {
  backgroundColor: '#f8f8f8',
  color: '#333',
  borderRadius: 12,
  padding: 16,
  fontSize: 16,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderStyle: 'solid',
  pointerEvents: 'none',
},
datePickerButton: {
  backgroundColor: '#f8f8f8',
  borderRadius: 12,
  padding: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#e0e0e0',
},
  datePickerText: {
    color: '#333',
    fontSize: 16,
  },
  calendarIcon: {
    fontSize: 20,
  },
  datePickerWrapper: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    ...Platform.select({
      android: {
        width: '100%',
      },
      ios: {
        width: '100%',
      },
    }),
  },
  datePicker: {
    width: '100%',
  },
  
  // Topics
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  topicButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  topicButtonSelected: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  selectedTopicText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  unselectedTopicText: {
    color: '#555',
  },
  topicsCounter: {
    color: '#999',
    fontSize: 14,
    textAlign: 'right',
  },
  topicsCounterFull: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  
  // Buttons
  buttonsContainer: {
    marginTop: 20,
    gap: 15,
  },
  button: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
  },
  submitButton: {
    backgroundColor: '#6C63FF',
  },
  disabledButton: {
    opacity: 0.6,
  },
  
  // Section Title
  sectionTitle: {
    color: '#6C63FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  // Loading
  loadingText: {
    color: '#6C63FF',
    marginTop: 20,
    fontSize: 16,
  },
  webDateInputWrapper: {
    position: 'relative',
    width: '100%',
    height: 50,
  },
  webDateInputNative: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 0.1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
   }
  
});