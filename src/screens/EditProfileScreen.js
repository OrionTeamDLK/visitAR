import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';


const EditProfileScreen= () => {
    return (
        <View data-test = "edit_profile_view">
            <Text data-test = "edit_profile_text">Edit profile screen</Text>
            <Text data-test = "edit_profile_text" >Editable input fields</Text>
            <NavigationButton data-test = "edit_profile_button"
			title="Update Profile"
			icon = "edit"
			navName = "Profile"
			/>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default EditProfileScreen;
