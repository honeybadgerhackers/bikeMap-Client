import React from 'react';
import { StyleSheet, Button, View, Text, Image, Easing, ActivityIndicator, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo';
import Modal from 'react-native-modal';
import Rating from 'react-native-rating';
import PropTypes from 'prop-types';
import { appColors } from '../constants';
import AddPhoto from './addPhotoButton';

const buttonColor = appColors.aquamarine;

const ModalView = ({
  visibleModal,
  saveTrip,
  cancelTrip,
  googleMapImage,
  tripName,
  tripData,
  speedCounter,
  avgSpeed,
  rating,
  closeModal,
  openRatingModal,
  setRating,
  starIcons,
  getImage,
  imageBase64,
  routeName,
  getRouteName,
}) => {
  return (
    <View>
      <Modal
        isVisible={visibleModal === 1}
        backdropOpacity={0.70}
        backdropColor={appColors.logoBlue}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['rgba(0,96,255,0.02)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 600,
            }}
          />
          <Text style={styles.header}>Save Trip</Text>
          <View style={styles.modalBody}>
            <View style={styles.imageContainer}>
              <View style={styles.imageInnerContainer}>
                {loadingImage()}
                { googleMapImage === null ? null : mapImage(googleMapImage) }
              </View>
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.text}>{tripData ? tripData.routeTitle : null}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonLeft}>
              <Button
                onPress={() => {
                  cancelTrip();
                  closeModal();
                }}
                title="No"
                color={buttonColor}
              />
            </View>
            <View style={styles.buttonRight}>
              <Button
                onPress={() => {
                  closeModal();
                  setTimeout(openRatingModal, 500);
                }}
                title="Yes"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={visibleModal === 2}
        backdropOpacity={0.70}
        backdropColor={appColors.logoBlue}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['rgba(0,96,255,0.02)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 600,
            }}
          />
          <Text style={styles.header}>Ride Info</Text>
          <View style={styles.modalBody}>
            <TextInput
              style={styles.routeNameInput}
              onChangeText={getRouteName}
              placeholder="Route Name"
              placeholderTextColor="white"
            />
            <AddPhoto getImage={getImage} />
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Rating
                  onChange={rating => setRating(rating)}
                  selectedStar={starIcons.filled}
                  unselectedStar={starIcons.unfilled}
                  config={{
                    easing: Easing.inOut(Easing.ease),
                    duration: 350,
                  }}
                  stagger={80}
                  maxScale={1.4}
                  starStyle={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonLeft}>
              <Button
                onPress={() => {
                  if (rating === 0) {
                    Alert.alert('Please Rate Your Trip');
                  } else {
                    saveTrip({
                      speedCounter,
                      avgSpeed,
                      rating,
                      imageBase64,
                      routeName,
                    }, tripData);
                    closeModal();
                  }
                }}
                title="Save"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "rgba(0,0,0,0)",
    color: appColors.lightBlue,
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    backgroundColor: "rgba(0,0,0,0)",
    padding: 15,
  },
  text: {
    color: appColors.lightBlue,
    fontSize: 18,
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: appColors.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalBody: {
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    zIndex: 1,
    width: 340,
    height: 330,
    borderRadius: 6,
    borderWidth: 4,
    borderColor: appColors.logoBlue,
  },
  imageLoading: {
    position: "absolute",
    zIndex: 0,
    width: 340,
    height: 330,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)",
  },
  rating: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
  addPhotoContainer: {
    // flexDirection: "row"
  },
  addPhoto: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "stretch",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(104, 146, 179, 0.25)",
  },
  buttonRight: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0)",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(104, 146, 179, 0.25)",
  },
  buttonLeft: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0)",
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  routeNameInput: {
    textAlign: 'center',
    height: 40,
    width: 225,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    fontSize: 25,
  },
});

const mapImage = (googleMapImage) => (
  <Image
    style={styles.image}
    source={{uri: googleMapImage}}
  />
);

const loadingImage = () => (
  <View style={styles.imageLoading}>
    <ActivityIndicator
      size="large"
      color={appColors.begonia}
    />
  </View>
);

ModalView.propTypes = {
  visibleModal: PropTypes.number,
  googleMapImage: PropTypes.string,
  tripName: PropTypes.string,
  tripData: PropTypes.shape({}),
  rating: PropTypes.number.isRequired,
  speedCounter: PropTypes.number.isRequired,
  avgSpeed: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  saveTrip: PropTypes.func.isRequired,
  cancelTrip: PropTypes.func.isRequired,
  openRatingModal: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  starIcons: PropTypes.shape({
    filled: PropTypes.number.isRequired,
    unfilled: PropTypes.number.isRequired,
  }).isRequired,
};

ModalView.defaultProps = {
  visibleModal: null,
  googleMapImage: null,
  tripName: null,
  tripData: null,
};

export default ModalView;
