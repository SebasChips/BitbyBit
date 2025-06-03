import { StyleSheet } from 'react-native';

export const getStyles = (platformOS, isWeb) => StyleSheet.create({
  counterText: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  towersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    zIndex: 15,
  },

  restartButtonContainer: {
    position: 'absolute',
    top: 5,
    right: 20,
    zIndex: 100,
    backgroundColor: 'rgba(87, 130, 185, 0.2)',
    borderRadius: 20,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(87, 130, 185, 0.2)',
  },

  restartButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },

  backButtonContainer: {
    position: 'absolute',
    top: 5,
    left: 20,
    zIndex: 100,
    backgroundColor: 'rgba(87, 130, 185, 0.2)',
    borderRadius: 20,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(87, 130, 185, 0.2)',
  },

  // Win animation styles
  winContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none'
  },

  winContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    width: '85%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.5)',
  },

  trophyIcon: {
    marginBottom: 10,
  },

  winText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgba(206, 185, 68, 0.97)',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },

  winSubText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center'
  },

  winXpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20
  },

  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 10,
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    ...(isWeb && {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
  },

  video: {
    width: '100%',
    height: '100%',
    ...(!isWeb && {
      alignSelf: 'center',
    }),
  },

  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  instructionsBox: {
    padding: 25,
    paddingTop: 15
  },

  instructionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a6da7',
    marginBottom: 20,
    textAlign: 'center',
  },

  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },

  instructionIcon: {
    width: 30,
    alignItems: 'center',
    marginRight: 10
  },

  instructionText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    lineHeight: 22
  },

  instructionBold: {
    fontWeight: 'bold',
    color: '#333'
  },

  startButton: {
    backgroundColor: '#4a6da7',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10
  },

  buttonIcon: {
    marginLeft: 5
  }
});

