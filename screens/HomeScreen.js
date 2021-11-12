import React from 'react';
import * as firebase from "../firebase";
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {getAuth, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = () => {
    const auth = getAuth();
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login');
            })
            .catch(error => alert(error.message))
    };

    return (
        <View style={styles.screen}>
            <Text>
                Email: {auth.currentUser?.email}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: '#0782f9',
        width: '50%',
        padding: 15,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
});

export default HomeScreen;
