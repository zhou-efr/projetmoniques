import React, {Component} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deleteIcon from '../files/images/icons/noun-delete-34719.png';
import Medicine from './Medicine';

const backgroundColor = '#BDC8C0';

class Saved extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      registered: '',
      medicines: [],
      refreshing: false,
      showModal: false,
      data: {},
    };
  }

  async componentDidMount() {
    try {
      await this.load();
    } catch (err) {
      console.log(err);
    }
  }

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
    await this.load();
  };

  load = async () => {
    console.log('loading registered medicines');
    let names;
    const state_registered = this.state.registered;
    let medicines = [];
    try {
      const registered = await AsyncStorage.getItem('registered');
      if (registered !== null) {
        console.log(registered);
      } else {
        this.setState({medicines: []});
      }
      if (state_registered !== registered) {
        this.setState({registered: registered});

        names = registered;
        let names_list = names.split('|');
        for (const namesKey in names_list) {
          try {
            const medicine = await AsyncStorage.getItem(
              String(names_list[namesKey]),
            );
            if (medicine !== null) {
              // console.log(medicine);
              medicines.push(JSON.parse(medicine));
              console.log('medicine load :');
              console.log(names_list[namesKey]);
            } else {
              console.log('medicine load failed :');
              console.log(names_list[namesKey]);
            }
          } catch (e) {
            console.log(e);
          }
        }

        this.setState({medicines: medicines});
      }
    } catch (error) {
      this.setState({medicines: []});
      console.log('error while loading medicines');
    }
    console.log('loaded registered medicines');
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.load().then(() => this.setState({refreshing: false}));
  };

  handleClosingModal = () => {
    this.setState({
      showModal: false,
      data: {},
    });
  };

  onViewMedicine = medicine => {
    this.setState({
      showModal: true,
      data: medicine,
    });
  };

  render() {
    console.log('state medicines : ');
    console.log(this.state.medicines);
    const {refreshing, showModal, data} = this.state;
    return (
      <View style={styles.mainContainer}>
        {showModal ? (
          <></>
        ) : (
          <ScrollView
            style={styles.medicineList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {!this.state.medicines ? (
              <></>
            ) : (
              this.state.medicines.map((medicine, index) => (
                <View style={styles.itemView} key={index}>
                  <TouchableOpacity
                    style={styles.medicineOpacity}
                    onPress={() => this.onViewMedicine(medicine)}>
                    <Text style={styles.medicine}>
                      {medicine.name.split(';')[0]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.delete(medicine)}>
                    <Image style={styles.deleteIcon} source={deleteIcon} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        )}
        <Medicine
          visible={showModal}
          toggleVisible={e => {
            this.handleClosingModal();
          }}
          data={data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineOpacity: {
    maxWidth: '80%',
  },
  medicineList: {
    flexDirection: 'column',
    height: '100%',
    padding: 5,
  },
  medicine: {
    color: '#394848',
    fontSize: 20,
    marginTop: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteIcon: {
    height: 15,
    width: 15,
  },
});

export default Saved;
