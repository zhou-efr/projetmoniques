import React, {Component} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';

class Medicine extends Component {
  constructor(props) {
    super(props);
    this.state = {saved: false};
  }

  async componentDidMount() {
    try {
      await this.is_saved(this.props.data);
    } catch (err) {
      console.log(err);
    }
  }

  toggleVisible = () => {
    this.props.toggleVisible();
  };

  is_saved = async medicine => {
    console.log('is saved');
    let names = [];
    this.setState({saved: false});
    try {
      console.log('sent');
      const registered = await AsyncStorage.getItem('registered');
      console.log('receive');
      if (registered !== null) {
        console.log(registered);
        names = registered;
        names = names.split('|');
        for (const namesKey in names) {
          if (medicine.CIS.toString() === names[namesKey]) {
            this.setState({saved: true});
          }
        }
      } else {
        console.log('registered is null');
      }
    } catch (error) {
      console.log('error while reaching register');
      console.log(error);
    }
  };

  save = async medicine => {
    try {
      console.log('save');
      let names = [];
      try {
        const registered = await AsyncStorage.getItem('registered');
        if (registered !== null) {
          console.log(registered);
          names = registered;
          names = names.split('|');
        }
      } catch (error) {
        console.log('error while reaching register');
        console.log(error);
      }
      console.log('registering medicine');
      console.log(medicine.CIS);
      console.log(medicine);
      try {
        await AsyncStorage.setItem(
          String(medicine.CIS),
          JSON.stringify(medicine),
        );
      } catch (e) {
        console.log('error while saving medicine');
        console.log(e);
        return;
      }
      names.push(medicine.CIS);
      await AsyncStorage.setItem('registered', names.join('|'));
    } catch (error) {
      console.log('error while saving register');
      console.log(error);
    }
    console.log('medicine registered');
    await this.is_saved(medicine);
  };

  delete = async medicine => {
    try {
      console.log('delete');
      let names = [];
      try {
        const registered = await AsyncStorage.getItem('registered');
        if (registered !== null) {
          console.log(registered);
          names = registered;
          names = names.split('|');
        }
      } catch (error) {
        console.log('error while reaching register');
        console.log(error);
      }
      console.log('deleting medicine');
      console.log(medicine.CIS);
      try {
        await AsyncStorage.removeItem(String(medicine.CIS));
      } catch (e) {
        console.log('error while removing medicine');
        console.log(e);
        return;
      }
      for (let namesKey in names) {
        if (names[namesKey] === medicine.CIS.toString()) {
          names.splice(namesKey, 1);
          namesKey--;
        }
      }
      console.log(names);
      await AsyncStorage.setItem('registered', names.join('|'));
    } catch (error) {
      console.log('error while saving register');
      console.log(error);
    }
    console.log('medicine delete');
    await this.is_saved(medicine);
  };

  render() {
    const isVisible = this.props.visible;

    if (!this.props.data || !isVisible) {
      return <></>;
    }
    const data = this.props.data;
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isVisible}
        style={styles.ModalComponent}
        onRequestClose={() => this.toggleVisible()}>
        <BlurView
          style={styles.blurViewStyle}
          blurType={'light'}
          blurAmount={20}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.medicineContainer}>
              <Text style={styles.mainTitle}>
                {data.name.includes(';') ? data.name.split(';')[0] : data.name}
              </Text>

              <View
                style={[
                  styles.CategoryContainer,
                  {backgroundColor: '#E05B413C'},
                ]}>
                <Text style={styles.CategorySubtitle}>
                  Forme Pharmaceutique
                </Text>
                <Text style={styles.CategoryDescription}>
                  {data.pharmaceutic_form}
                </Text>
              </View>

              <View
                style={[
                  styles.CategoryContainer,
                  {backgroundColor: '#F991583C'},
                ]}>
                <Text style={styles.CategorySubtitle}>
                  Voie d’administration
                </Text>
                <Text style={styles.CategoryDescription}>
                  {data.administrate}
                </Text>
              </View>

              <View
                style={[
                  styles.CategoryContainer,
                  {marginBottom: 50, backgroundColor: '#90C9CC3C'},
                ]}>
                <Text style={styles.CategorySubtitle}>Contre-Indication</Text>
                <Text style={styles.CategoryDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Culpa dignissimos ea illo nihil pariatur, rerum soluta veniam!
                  Culpa, dolor, magni minima, nesciunt obcaecati odio placeat
                  porro provident quae sequi soluta. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Adipisci aspernatur consequatur
                  corporis cum dolorum inventore libero magnam maxime, modi non
                  quas quia quidem quis repudiandae saepe sit soluta, temporibus
                  veniam.
                </Text>
              </View>
            </ScrollView>
            <View style={styles.MedicineButtonsContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.state.saved
                    ? this.delete(this.props.data)
                    : this.save(this.props.data)
                }>
                <Text style={styles.closingButton}>
                  {this.state.saved ? 'DELETE' : 'SAVE'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleVisible}>
                <Text style={styles.closingButton}>FERMER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  MedicineButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    width: '100%',
  },
  CategoryContainer: {
    flexDirection: 'column',
    marginTop: 5,
    // backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    borderBottomColor: 'rgba(80,87,87,0.75)',
    borderBottomWidth: 2,
  },
  CategorySubtitle: {
    color: '#394848',
    fontSize: 20,
  },
  CategoryDescription: {
    fontSize: 17,
    textAlign: 'justify',
  },
  mainTitle: {
    color: '#394848',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    overflow: 'hidden',
    marginTop: 10,
  },
  medicineContainer: {
    backgroundColor: '#ffffff00',
    padding: 20,
    marginBottom: 10,
  },
  ModalComponent: {
    backgroundColor: '#ffffff00',
    overflow: 'scroll',
  },
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.29)',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: '#000',

    width: '100%',
    height: '100%',
  },
  blurViewStyle: {
    backgroundColor: '#ffffff00',
    overflow: 'hidden',
    position: 'absolute',
    top: '5%',
    left: '10%',
    bottom: '20%',
    right: '10%',
  },
  closingButton: {
    color: '#5b756d',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Medicine;
