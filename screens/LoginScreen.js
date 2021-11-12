import React, {useEffect, useState} from 'react';

import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {useNavigation} from "@react-navigation/native";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if (user) {
                navigation.navigate("Home");
            }
        });
    }, [onAuthStateChanged]);


    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    };

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignIn}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonOutline]}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonTextOutline}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2
    },
    buttonTextOutline: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16
    },
});

export default LoginScreen;
