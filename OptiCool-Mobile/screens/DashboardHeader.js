// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Pressable,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Avatar } from "react-native-paper";

// const DashboardHeader = ({ user, styles, handleOptionSelect }) => {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

//   return (
//     <>
//       <View style={styles.header}>
//         <View style={styles.nameContainer}>
//           <Text style={styles.greeting}>
//             Hey, <Text style={styles.name}>{user.username}</Text>
//           </Text>
//         </View>
//         {/* Alert Icon (beside avatar) */}
//         <MaterialCommunityIcons
//           name="bell"
//           size={24}
//           color="#6ea4dd"
//           onPress={() => alert("Alert clicked!")}
//           style={styles.alertIconContainer}
//         />
//         <TouchableOpacity
//           onPress={toggleDropdown}
//           style={styles.avatarContainer}
//         >
//           <Avatar.Image
//             source={{
//               uri: user.avatar?.url || "https://example.com/default-avatar.png",
//             }}
//             size={40}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Dropdown Menu */}
//       {isDropdownVisible && (
//         <Modal
//           transparent={true}
//           animationType="none"
//           visible={isDropdownVisible}
//           onRequestClose={toggleDropdown}
//         >
//           <Pressable style={styles.overlay} onPress={toggleDropdown} />
//           <View style={styles.dropdown}>
//             <TouchableOpacity
//               onPress={() => handleOptionSelect("Profile")}
//               style={styles.dropdownItem}
//             >
//               <Text style={styles.dropdownText}>View Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => handleOptionSelect("Settings")}
//               style={styles.dropdownItem}
//             >
//               <Text style={styles.dropdownText}>Settings</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => handleOptionSelect("NotifScreen")}
//               style={styles.dropdownItem}
//             >
//               <Text style={styles.dropdownText}>Notif Test</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => handleOptionSelect("Logout")}
//               style={styles.dropdownItem}
//             >
//               <Text style={styles.dropdownText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default DashboardHeader;
