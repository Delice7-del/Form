import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  // 1. Text inputs state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  // 2. Radio button state (Gender)
  const [gender, setGender] = useState('Male');

  // 3. Checkboxes state (Hobbies)
  const [hobbies, setHobbies] = useState([]);

  // 4. Dropdown / Picker state (Country)
  const [country, setCountry] = useState('');

  // 5. Switch state (Notifications)
  const [notifications, setNotifications] = useState(false);

  // 6. Slider state (Rating 1 to 10)
  const [rating, setRating] = useState(5);

  // 7. Date picker state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 8. Time picker state
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 9. Camera / Image picker state
  const [imageUri, setImageUri] = useState(null);

  // 10. Terms & Conditions state
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Touch interaction demo state
  const [lastTouched, setLastTouched] = useState('None');

  // Validation & status messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Toggle hobby in/out of array
  const toggleHobby = (hobby) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((item) => item !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  // Date picker change handler
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Time picker change handler
  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Launch camera to take a photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Launch device image library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Validate and submit form
  const handleSubmit = () => {
    if (!fullName.trim()) {
      setErrorMessage('Validation Error: Full Name is required.');
      setSuccessMessage('');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Validation Error: Email is required.');
      setSuccessMessage('');
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email.trim())) {
      setErrorMessage('Validation Error: Please enter a valid email address.');
      setSuccessMessage('');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Validation Error: You must agree to the Terms & Conditions.');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Form submitted successfully! Check terminal console.');

    // Construct submitted form data object with all fields
    const formData = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website.trim(),
      password: password,
      showPassword: showPassword,
      age: age,
      address: address,
      gender: gender,
      hobbies: hobbies,
      country: country,
      notifications: notifications,
      rating: rating,
      date: date.toDateString(),
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUri: imageUri,
      agreeTerms: agreeTerms,
    };

    console.log('Submitted Form Data:', formData);
  };

  // Reset all inputs to default values
  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setPassword('');
    setShowPassword(false);
    setAge('');
    setAddress('');
    setGender('Male');
    setHobbies([]);
    setCountry('');
    setNotifications(false);
    setRating(5);
    setDate(new Date());
    setTime(new Date());
    setShowDatePicker(false);
    setShowTimePicker(false);
    setImageUri(null);
    setAgreeTerms(false);
    setLastTouched('None');
    setErrorMessage('');
    setSuccessMessage('');
    console.log('Form has been reset to default values.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>React Native Form Assignment</Text>

        {/* Validation Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Success Message */}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        {/* 1. Full Name */}
        <Text style={styles.label}>1. Full Name (Required):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* 2. Email */}
        <Text style={styles.label}>2. Email (Required):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* 3. Phone Number */}
        <Text style={styles.label}>3. Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* 4. URL Input */}
        <Text style={styles.label}>4. Website / Portfolio URL:</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com"
          value={website}
          onChangeText={setWebsite}
          keyboardType="url"
          autoCapitalize="none"
        />

        {/* 5. Password with Visibility Toggle */}
        <Text style={styles.label}>5. Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable
          style={styles.checkboxRow}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Checkbox
            style={styles.checkbox}
            value={showPassword}
            onValueChange={setShowPassword}
          />
          <Text style={styles.checkboxLabel}>Show Password</Text>
        </Pressable>

        {/* 6. Age */}
        <Text style={styles.label}>6. Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* 7. Address / Description */}
        <Text style={styles.label}>7. Address / Description:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter address or description"
          value={address}
          onChangeText={setAddress}
          multiline={true}
          numberOfLines={4}
        />

        {/* 8. Gender (Circular Radio Buttons) */}
        <Text style={styles.label}>8. Gender (Radio Buttons):</Text>
        <View style={styles.radioGroup}>
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: gender === 'Male' }}
            style={styles.radioOption}
            onPress={() => setGender('Male')}
          >
            <View style={[styles.radioCircle, gender === 'Male' && styles.radioCircleSelected]}>
              {gender === 'Male' && <View style={styles.radioInnerDot} />}
            </View>
            <Text style={styles.radioLabel}>Male</Text>
          </Pressable>

          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: gender === 'Female' }}
            style={styles.radioOption}
            onPress={() => setGender('Female')}
          >
            <View style={[styles.radioCircle, gender === 'Female' && styles.radioCircleSelected]}>
              {gender === 'Female' && <View style={styles.radioInnerDot} />}
            </View>
            <Text style={styles.radioLabel}>Female</Text>
          </Pressable>

          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: gender === 'Other' }}
            style={styles.radioOption}
            onPress={() => setGender('Other')}
          >
            <View style={[styles.radioCircle, gender === 'Other' && styles.radioCircleSelected]}>
              {gender === 'Other' && <View style={styles.radioInnerDot} />}
            </View>
            <Text style={styles.radioLabel}>Other</Text>
          </Pressable>
        </View>

        {/* 9. Hobbies (Checkboxes) */}
        <Text style={styles.label}>9. Hobbies (Checkboxes):</Text>
        <View style={styles.checkboxGroup}>
          <Pressable
            style={styles.checkboxRow}
            onPress={() => toggleHobby('Reading')}
          >
            <Checkbox
              style={styles.checkbox}
              value={hobbies.includes('Reading')}
              onValueChange={() => toggleHobby('Reading')}
            />
            <Text style={styles.checkboxLabel}>Reading</Text>
          </Pressable>
          <Pressable
            style={styles.checkboxRow}
            onPress={() => toggleHobby('Sports')}
          >
            <Checkbox
              style={styles.checkbox}
              value={hobbies.includes('Sports')}
              onValueChange={() => toggleHobby('Sports')}
            />
            <Text style={styles.checkboxLabel}>Sports</Text>
          </Pressable>
          <Pressable
            style={styles.checkboxRow}
            onPress={() => toggleHobby('Music')}
          >
            <Checkbox
              style={styles.checkbox}
              value={hobbies.includes('Music')}
              onValueChange={() => toggleHobby('Music')}
            />
            <Text style={styles.checkboxLabel}>Music</Text>
          </Pressable>
          <Pressable
            style={styles.checkboxRow}
            onPress={() => toggleHobby('Traveling')}
          >
            <Checkbox
              style={styles.checkbox}
              value={hobbies.includes('Traveling')}
              onValueChange={() => toggleHobby('Traveling')}
            />
            <Text style={styles.checkboxLabel}>Traveling</Text>
          </Pressable>
        </View>

        {/* 10. Country Picker */}
        <Text style={styles.label}>10. Country (Picker / Dropdown):</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
          >
            <Picker.Item label="-- Select a Country --" value="" />
            <Picker.Item label="United States" value="United States" />
            <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="United Kingdom" value="United Kingdom" />
            <Picker.Item label="Rwanda" value="Rwanda" />
            <Picker.Item label="Australia" value="Australia" />
            <Picker.Item label="Germany" value="Germany" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* 11. Notifications Switch */}
        <Text style={styles.label}>11. Notifications (Switch):</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>
            {notifications ? 'Notifications are ON' : 'Notifications are OFF'}
          </Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        {/* 12. Rating Slider */}
        <Text style={styles.label}>12. Rating (Slider): {rating} / 10</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={rating}
          onValueChange={setRating}
        />

        {/* 13. Date Picker */}
        <Text style={styles.label}>13. Date Selection (DatePicker):</Text>
        <Text style={styles.dateDisplay}>Selected Date: {date.toDateString()}</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title={showDatePicker ? 'Close Date Picker' : 'Select Date'}
            onPress={() => setShowDatePicker(!showDatePicker)}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* 14. Time Picker */}
        <Text style={styles.label}>14. Time Selection (TimePicker):</Text>
        <Text style={styles.dateDisplay}>
          Selected Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            title={showTimePicker ? 'Close Time Picker' : 'Select Time'}
            onPress={() => setShowTimePicker(!showTimePicker)}
          />
        </View>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* 15. Photo (Camera / Gallery) */}
        <Text style={styles.label}>15. Photo (Camera / Gallery):</Text>
        <Text style={styles.dateDisplay}>
          {imageUri ? `Selected: ${imageUri.split('/').pop()}` : 'No photo chosen'}
        </Text>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}
        <View style={styles.buttonWrapper}>
          <Button
            title="Open Camera"
            onPress={takePhoto}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title={imageUri ? 'Change from Gallery' : 'Upload from Gallery'}
            onPress={pickImage}
          />
        </View>

        {/* 16. Terms & Conditions Checkbox */}
        <Text style={styles.label}>16. Terms & Conditions:</Text>
        <Pressable
          style={styles.checkboxRow}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <Checkbox
            style={styles.checkbox}
            value={agreeTerms}
            onValueChange={setAgreeTerms}
          />
          <Text style={styles.checkboxLabel}>
            I agree to the Terms & Conditions (Required)
          </Text>
        </Pressable>

        {/* Touch Interaction Demonstration Components */}
        <Text style={[styles.label, styles.sectionHeader]}>
          Touch Interaction Components:
        </Text>
        <Text style={styles.touchStatus}>
          Last Touch Component Pressed: {lastTouched}
        </Text>

        {/* A. Pressable Demo */}
        <Pressable
          style={styles.touchBox}
          onPress={() => {
            setLastTouched('Pressable');
            console.log('Pressable was pressed!');
          }}
        >
          <Text style={styles.touchBoxText}>Pressable (Tap me)</Text>
        </Pressable>

        {/* B. TouchableOpacity Demo */}
        <TouchableOpacity
          style={styles.touchBox}
          onPress={() => {
            setLastTouched('TouchableOpacity');
            console.log('TouchableOpacity was pressed!');
          }}
        >
          <Text style={styles.touchBoxText}>TouchableOpacity (Tap me)</Text>
        </TouchableOpacity>

        {/* C. TouchableHighlight Demo */}
        <TouchableHighlight
          style={styles.touchBox}
          underlayColor="#ddd"
          onPress={() => {
            setLastTouched('TouchableHighlight');
            console.log('TouchableHighlight was pressed!');
          }}
        >
          <Text style={styles.touchBoxText}>TouchableHighlight (Tap me)</Text>
        </TouchableHighlight>

        {/* D. TouchableWithoutFeedback Demo */}
        <TouchableWithoutFeedback
          onPress={() => {
            setLastTouched('TouchableWithoutFeedback');
            console.log('TouchableWithoutFeedback was pressed!');
          }}
        >
          <View style={styles.touchBox}>
            <Text style={styles.touchBoxText}>TouchableWithoutFeedback (Tap me)</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Action Buttons Section (Left-aligned) */}
        <View style={styles.actionButtonsContainer}>
          {/* Submit button */}
          <View style={styles.buttonWrapper}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>

          {/* Reset button */}
          <View style={styles.buttonWrapper}>
            <Button title="Reset" color="#666" onPress={handleReset} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
    fontWeight: '600',
  },
  successText: {
    color: '#2e7d32',
    marginBottom: 8,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  // Radio Buttons Styles
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 4,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioCircleSelected: {
    borderColor: '#2196F3',
  },
  radioInnerDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  radioLabel: {
    fontSize: 15,
    color: '#222',
  },
  // Checkboxes Styles
  checkboxGroup: {
    marginTop: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  switchText: {
    fontSize: 15,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  dateDisplay: {
    fontSize: 15,
    marginBottom: 6,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginVertical: 6,
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    marginTop: 22,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  touchStatus: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    textAlign: 'left',
  },
  // Left-aligned Touch Components
  touchBox: {
    width: 220,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
  },
  touchBoxText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  // Left-aligned Buttons
  actionButtonsContainer: {
    marginTop: 14,
    alignItems: 'flex-start',
  },
  buttonWrapper: {
    width: 200,
    alignSelf: 'flex-start',
    marginVertical: 6,
  },
});
