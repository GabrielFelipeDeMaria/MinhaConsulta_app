import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Usar AsyncStorage para armazenar o token

// Definindo a interface Consultation
interface Consultation {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
  username: string;
}

const ConsultationsListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [error, setError] = useState<string | null>(null);  // Para lidar com erros

  useEffect(() => {
    // Função assíncrona para recuperar o token e fazer a requisição
    const fetchConsultations = async () => {
      try {
        // Recupera o token JWT do AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('Token não encontrado. Faça login novamente.');
          return;
        }

        // Faz a requisição para o backend com o token de autenticação
        const response = await axios.get('http://localhost:3000/api/consultations', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });

        // Verifica se os dados são válidos
        if (response.data && Array.isArray(response.data)) {
          setConsultations(response.data);  // Preenche o estado com as consultas
        } else {
          setError('Nenhuma consulta encontrada.');
        }
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        setError('Erro ao buscar consultas.');
      }
    };

    fetchConsultations();  // Chama a função para buscar as consultas
  }, []);

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <Text>Paciente: {item.username}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Médico: {item.doctor}</Text>
      <Text>Especialidade: {item.specialty}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>  // Mostra o erro, se houver
      ) : (
        <FlatList
          data={consultations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  consultationItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ConsultationsListScreen;