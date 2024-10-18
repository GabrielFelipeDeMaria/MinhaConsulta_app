import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Center, Input, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Alert as RNAlert } from 'react-native'; // Importar o Alert do React Native
import { login } from '../api/auth'; // Importe a função de login que você já criou
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            console.log('Token:', token);
            await AsyncStorage.setItem('token', token);
            RNAlert.alert('Login realizado com sucesso!');
            navigation.navigate('ConsultationsList');
        } catch (err: unknown) {
            // Verificar se err é uma instância de Error
            if (err instanceof Error) {
                RNAlert.alert('Erro', err.message);
            } else {
                RNAlert.alert('Erro', 'Ocorreu um erro inesperado.');
            }
        }
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} bg="orange">
                <Box>
                    <Input
                        placeholder="Usuário"
                        mb={4}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Input
                        placeholder="Senha"
                        mb={4}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button onPress={handleLogin}>
                        Entrar
                    </Button>
                    <Button onPress={() => navigation.navigate('SignUp')} mt={4}>
                        Cadastrar
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default LoginScreen;