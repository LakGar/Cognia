import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // Containers
  screenContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 60,
  },

  //Button
  button: {
    flex: 1,
    maxHeight: 50,
    borderRadius: 3,
  },

  //Text
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "grey",
    fontWeight: "500",
  },
  // screenContainerCenter: {
  //   flex: 1,
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: "#edffee",
  //   justifyContent: "center",
  //   alignItems: "center", // Fixed typo "alignItem" to "alignItems"
  //   padding: 20,
  // },

  cardContainer: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginLeft: 10,
    height: 255,
    minWidth: 250,
  },

  cardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  // Shadow
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // // Text Styles
  // smallLogoText: {
  //   color: "#145658",
  //   fontSize: 25,
  //   fontWeight: "800",
  //   width: "100%",
  //   textAlign: "left",
  // },
  // smallText: {
  //   textAlign: "right",
  //   fontWeight: "700",
  // },
  // buttonText: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   textAlign: "center",
  // },
  // buttonTextPrimary: {
  //   color: "#fff",
  // },
  // buttonTextSecondary: {
  //   color: "#fff",
  // },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  detailsText: {
    fontSize: 14,
    color: "dodgerblue",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  subTitleText: {
    fontSize: 14,
    color: "lightgrey",
    marginBottom: 10,
    width: "90%",
    fontWeight: "500",
  },
  details: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
    marginLeft: 5, // Space between icon and text
  },
  expandedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#145658",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },

  // buttonPrimary: {
  //   backgroundColor: "#8f9f60",
  // },
  // buttonDarkGreen: {
  //   backgroundColor: "#637826",
  // },
  // buttonSecondary: {
  //   backgroundColor: "#906146",
  // },
  // whiteButton: {
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 12,
  //   alignSelf: "flex-start",
  //   marginBottom: 10,
  // },

  // // Inputs
  // inputContainer: {
  //   flex: 1,
  //   backgroundColor: "#f8fff8",
  //   width: "100%",
  //   flexDirection: "row",
  //   padding: 15,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   borderWidth: 1,
  //   borderRadius: 12,
  //   maxHeight: 60,
  // },
  // input: {
  //   flex: 1,
  //   paddingHorizontal: 10,
  //   fontSize: 18,
  //   fontWeight: "600",
  // },

  // Avatars
  avatarContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  personImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
    borderColor: "#fff", // Add a white border around the image for better contrast
    borderWidth: 2,
  },

  // // Modal Overlay
  // overlay: {
  //   flex: 1,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  //   justifyContent: "flex-end", // Align the modal at the bottom
  // },
  // expandedContent: {
  //   width: "100%",
  //   height: "100%" * 0.7, // The height of the expanded modal
  //   backgroundColor: "#fff",
  //   borderRadius: 12,
  //   padding: 20,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  // },
  // closeButton: {
  //   position: "absolute",
  //   top: 20,
  //   right: 20,
  // },
});
