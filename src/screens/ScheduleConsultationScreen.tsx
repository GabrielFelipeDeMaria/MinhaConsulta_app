import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Center, Input, NativeBaseProvider, Select } from 'native-base';
import React from 'react';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ScheduleConsultationScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ScheduleConsultation'
>;

type Props = {
    navigation: ScheduleConsultationScreenNavigationProp;
};

const ScheduleConsultationScreen = ({ navigation }: Props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="orange">
                <Box>
                    <Select placeholder="Selecione o médico" mb={4}>
                        <Select.Item label="Dr. Rogério" value="rogerio" />
                        <Select.Item label="Dra. Amanda" value="amanda" />
                    </Select>
                    <Input placeholder="Selecione a data" mb={4} />
                    <Button onPress={() => navigation.navigate('ConfirmAppointment')}>
                        Agendar
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default ScheduleConsultationScreen;