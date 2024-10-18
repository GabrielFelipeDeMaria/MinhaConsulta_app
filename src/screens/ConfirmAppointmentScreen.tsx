import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Center, NativeBaseProvider, Text } from 'native-base';
import React from 'react';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ConfirmAppointmentScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ConfirmAppointment'
>;

type Props = {
    navigation: ConfirmAppointmentScreenNavigationProp;
};

const ConfirmAppointmentScreen = ({ navigation }: Props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="orange">
                <Box>
                    <Text>Consulta agendada com sucesso!</Text>
                    <Button mt={4} onPress={() => navigation.navigate('ConsultationsList')}>
                        Voltar para Consultas
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default ConfirmAppointmentScreen;