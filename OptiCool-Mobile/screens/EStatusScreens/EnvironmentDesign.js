import { StyleSheet, Dimensions } from 'react-native';

// Get the screen width and height
const { width, height } = Dimensions.get('window');

// Calculate the maximum width for each container (adjust margin as necessary)
const maxContainerWidth = (width - 20) / 2; // Adjust the divisor for number of containers and margin

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1, // This will make the ImageBackground take the full screen
    justifyContent: 'flex-start', // Align the content from the top
    padding: 16, // Add padding to ensure content is not too close to edges
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 8,
  },
  intro: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 10,
    marginBottom: -16,
    marginLeft: 9,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'normal', // This makes "Hey" thinner
    color: '#050a20', // Ensure text is visible on background
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold', // This makes "John" bolder
    color: '#4f5e70', // Ensure text is visible on background
  },
  avatar: {
    marginTop: -5,
    marginRight: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  singleStatusCard: {
    backgroundColor: '#ebf2fa', // Unified background for the single box
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-around', // Space out items evenly
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 20,
  },
  statusItem: {
    alignItems: 'center', // Center align text inside each item
    flex: 1, // Ensure each item takes up equal space
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#9eaab8',
    marginLeft: 10,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f5e70',
    marginLeft: 30,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 15,
  },
  
  cityTemp: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  cityName: {
    fontSize: 16,
    color: '#000',
  },
  applianceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5, // Add horizontal margin between cards

  },
  applianceText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  applianceStatus: {
    color: 'green',
  },
  applianceStatusInactive: {
    color: 'red',
  },

  emptyCard: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginLeft: 10,
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  tempLabel: {
    fontSize: 16,
  },
  tempValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
