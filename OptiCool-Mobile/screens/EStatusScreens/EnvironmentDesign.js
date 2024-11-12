import { StyleSheet, Dimensions } from 'react-native';

// Get the screen width and height
const { width, height } = Dimensions.get('window');

// Calculate the maximum width for each container (adjust margin as necessary)
const maxContainerWidth = (width - 20) / 2; // Adjust the divisor for number of containers and margin

const styles = StyleSheet.create({
  outerCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:  height * 0.05,
    marginBottom:  height * 0.05,
  },
  container: {
    // width: maxContainerWidth, // Use the calculated maximum width
    width: maxContainerWidth,
    height: height * 0.35, // Keep a consistent height
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%', // Horizontal margin for spacing
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.04, // 4% of screen height for vertical padding
    paddingHorizontal: width * 0.05, // 5% of screen width for horizontal padding
    gap: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#002569',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 25,
    borderRadius: 25,
  },
  up: {
    fontStyle: 'bold',
    fontWeight: '600',
    fontSize: width * 0.05, // Responsive font size
    lineHeight: height * 0.04, // Adjust line height based on height
    textAlign: 'center',
    color: '#000000',
  },
  percent: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: width * 0.1, // Responsive font size
    lineHeight: height * 0.1, // Adjust line height based on height
    textAlign: 'center',
    color: '#000000',
  },
  bottom: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: width * 0.05, // Responsive font size
    lineHeight: height * 0.04, // Adjust line height based on height
    textAlign: 'center',
    color: '#000000',
  },
  customIcon: {
    position: 'absolute',
    width: width * 0.15, // Responsive icon size
    height: width * 0.15, // Keep icon square
    top: -height * 0.02, // Adjust vertical position as needed
    right: -width * 0.05, // Position it slightly outside the top-right corner
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 25,
    borderRadius: 25,
  },
  
});

export default styles;
