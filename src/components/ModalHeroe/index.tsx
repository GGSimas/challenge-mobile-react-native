import React, {useCallback} from 'react';
import {
  View,
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {
  addHeroesFavRequest,
  removeHeroFavRequest,
} from '../../redux/Heroes/actions';
import {HeroesResponse} from '../../screens/Main';

interface HeroProps extends HeroesResponse {
  comics?: {
    available?: number;
  };
  series?: {
    available?: number;
  };
  stories?: {
    available?: number;
  };
  events?: {
    available?: number;
  };
}
interface HeroeModal extends ModalProps {
  hero: HeroProps;
  onCloseModal: () => void;
  origin?: string;
}

const ModalHeroe: React.FC<HeroeModal> = ({
  hero,
  visible,
  onCloseModal,
  origin,
}) => {
  const dispatch = useDispatch();

  const handleAddFavHero = useCallback(
    (item: HeroesResponse) => {
      dispatch(addHeroesFavRequest(item));
      onCloseModal();
    },
    [dispatch, onCloseModal],
  );

  const handleRemoveFavHero = useCallback(
    (heroId: number) => {
      dispatch(removeHeroFavRequest(heroId));
      onCloseModal();
    },
    [dispatch, onCloseModal],
  );
  return (
    <View style={style.modal}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onCloseModal}>
        <View style={style.modalView}>
          <TouchableOpacity
            style={style.modalCloseButton}
            onPress={onCloseModal}>
            <Text style={style.modalCloseButtonText}>x</Text>
          </TouchableOpacity>

          <Image
            style={style.modalImage}
            source={{
              uri: `${hero?.thumbnail?.path}.${hero?.thumbnail?.extension}`,
            }}
          />

          <Text style={style.modalHeroName}>{hero?.name}</Text>

          {hero?.description ? (
            <Text style={style.modalHeroDescription}>{hero?.description}</Text>
          ) : (
            <Text style={style.modalHeroDescription}>
              Este heroi não possui uma descrição
            </Text>
          )}

          <View style={style.modalHeroesHistoric}>
            <View style={{padding: 12}}>
              <View style={style.modalHeroesHistoricGroup}>
                <Text style={style.modalHeroesHistoricTitle}>HQs</Text>
                <Text>{hero?.comics?.available}</Text>
              </View>

              <View style={style.modalHeroesHistoricGroup}>
                <Text style={style.modalHeroesHistoricTitle}>Eventos</Text>
                <Text style={style.modalHeroesHistoricCount}>
                  {hero?.events?.available}
                </Text>
              </View>
            </View>
            <View style={{padding: 12}}>
              <View style={style.modalHeroesHistoricGroup}>
                <Text style={style.modalHeroesHistoricTitle}>Series</Text>
                <Text style={style.modalHeroesHistoricCount}>
                  {hero?.series?.available}
                </Text>
              </View>

              <View style={style.modalHeroesHistoricGroup}>
                <Text style={style.modalHeroesHistoricTitle}>Histórias</Text>
                <Text style={style.modalHeroesHistoricCount}>
                  {hero?.stories?.available}
                </Text>
              </View>
            </View>
          </View>

          {origin === 'main' ? (
            <TouchableOpacity
              style={style.ModalFavButton}
              onPress={() => handleAddFavHero(hero)}>
              <Icon name="heart" size={16} color="#fff" />
              <Text style={style.ModalFavButtonText}> Favoritar </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.ModalFavButton}
              onPress={() => handleRemoveFavHero(hero.id)}>
              <Icon name="heart" size={16} color="#fff" />
              <Text style={style.ModalFavButtonText}> Tirar Favorito</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalCloseButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  modalCloseButtonText: {
    fontSize: 18,
  },
  modalImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalHeroName: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalHeroDescription: {
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 10,
  },
  modalHeroesHistoric: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 15,
  },
  modalHeroesHistoricGroup: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeroesHistoricTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalHeroesHistoricCount: {
    fontSize: 16,
  },
  ModalFavButton: {
    backgroundColor: '#EB2227',
    borderRadius: 5,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    flexDirection: 'row',
  },
  ModalFavButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
export default ModalHeroe;
