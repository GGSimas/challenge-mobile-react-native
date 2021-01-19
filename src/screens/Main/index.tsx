import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ListHeroes from '../../components/ListHeroes';
import ModalHeroe from '../../components/ModalHeroe';
import Header from '../../components/Header';
import api from '../../service/api';
import Toast from 'react-native-toast-message';

export interface HeroesResponse {
  id: number;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Main: React.FC = () => {
  const [response, setResponse] = useState<HeroesResponse[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [hero, setHero] = useState<HeroesResponse>({} as HeroesResponse);
  const [limit, setLimit] = useState(30);
  const [modalVisible, setModalVisible] = useState(false);

  const loadHeroes = useCallback(() => {
    api
      .get('/characters', {
        params: {
          limit,
        },
      })
      .then((resp) => {
        setResponse(resp.data.data.results);
      });
  }, [limit]);

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  const handleSearchHeroe = useCallback(() => {
    if (!termoBusca) {
      loadHeroes();
      return Toast.show({
        type: 'info',
        text1: 'Nenhum nome foi informado',
        text2: 'Lista vai ser reiniciada',
        position: 'top',
      });
    }
    api
      .get('/characters', {
        params: {
          nameStartsWith: termoBusca,
        },
      })
      .then((resp) => {
        setResponse(resp.data.data.results);
      });
    setTermoBusca('');
    Keyboard.dismiss();
  }, [termoBusca, loadHeroes]);

  const handleNewCallApi = useCallback(() => {
    if (response.length < 30) {
      return;
    }
    setLimit(limit + 10);
  }, [limit, response]);

  const handleHeroeDetails = useCallback((item: HeroesResponse) => {
    setModalVisible(true);
    setHero(item);
  }, []);

  return (
    <SafeAreaView style={styled.container}>
      <Header>
        <View>
          <Text style={styled.headerText}>Faça uma busca pelo seu heroi.</Text>

          <View style={styled.headerSearch}>
            <TextInput
              style={styled.headerSearchInput}
              value={termoBusca}
              onChangeText={setTermoBusca}
            />

            <TouchableOpacity
              style={styled.headerSearchButton}
              onPress={handleSearchHeroe}>
              <Icon
                style={styled.headerIconSearch}
                name="search"
                size={16}
                color="#fff"
              />
              <Text style={styled.headerSearchButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Header>

      <ListHeroes
        hero={response}
        handleHeroeDetails={handleHeroeDetails}
        handleNewCallApi={handleNewCallApi}
      />

      <ModalHeroe
        visible={modalVisible}
        hero={hero}
        onCloseModal={() => setModalVisible(false)}
        origin="main"
      />
    </SafeAreaView>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  headerText: {
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  headerSearch: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: 240,
    height: 38,
    borderRadius: 4,
  },
  headerSearchButton: {
    backgroundColor: '#3ea849',
    width: 90,
    marginLeft: 12,
    height: 38,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerIconSearch: {
    marginRight: 10,
  },
  headerSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Main;
