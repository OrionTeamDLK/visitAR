import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';


const EditProfileScreen= () => {
    return (
        <View>
            <Text>Edit profile screen</Text>
            <Text>Editable input fields</Text>
            <NavigationButton 
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