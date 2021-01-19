import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import ModalHeroe from '../../components/ModalHeroe';
import {IHeroes} from '../../redux/Heroes/types';
import {IState} from '../../redux/store';
import ListHeroes from '../../components/ListHeroes';
import {HeroesResponse} from '../Main';
import Header from '../../components/Header';

const Favorite: React.FC = () => {
  const heroes = useSelector<IState, IHeroes[]>((state) => state.heroes.heroes);
  const [termoBusca, setTermoBusca] = useState('');
  const [favHeroes, setFavHeroes] = useState<HeroesResponse[]>([]);
  const [hero, setHero] = useState<HeroesResponse>({} as HeroesResponse);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setFavHeroes(heroes);
  }, [heroes]);

  const handleSearchHeroe = useCallback(() => {
    if (!termoBusca) {
      setFavHeroes(heroes);
      return Toast.show({
        type: 'info',
        text1: 'Nenhum nome foi informado',
        text2: 'Lista vai ser reiniciada',
        position: 'top',
      });
    }
    const filteredHeroes = heroes.filter((hero) =>
      hero.name.includes(termoBusca),
    );
    setFavHeroes(filteredHeroes);

    setTermoBusca('');
    Keyboard.dismiss();
  }, [termoBusca, heroes]);

  const handleHeroeDetails = useCallback((item: HeroesResponse) => {
    setModalVisible(true);
    setHero(item);
  }, []);

  return (
    <View style={styled.container}>
      <Header>
        <Text style={styled.headerText}>
          Faça uma busca pelo seu heroi Favorito
        </Text>

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
      </Header>

      <ListHeroes hero={favHeroes} handleHeroeDetails={handleHeroeDetails} />

      <ModalHeroe
        visible={modalVisible}
        hero={hero}
        onCloseModal={() => setModalVisible(false)}
      />
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
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
export default Favorite;
