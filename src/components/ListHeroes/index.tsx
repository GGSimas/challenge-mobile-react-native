import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {HeroesResponse} from '../../screens/Main';

interface ListHero {
  hero: HeroesResponse[];
  handleNewCallApi?: () => void;
  handleHeroeDetails: (item: HeroesResponse) => void;
}

const ListHeroes: React.FC<ListHero> = ({
  hero,
  handleHeroeDetails,
  handleNewCallApi,
}) => {
  return (
    <View style={styled.list}>
      <FlatList
        data={hero}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <View style={styled.listItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styled.listItemImage}
                source={{
                  uri: `${item?.thumbnail?.path}.${item?.thumbnail?.extension}`,
                }}
              />
              <Text style={styled.listItemTitle}>{item.name}</Text>
            </View>

            <TouchableOpacity onPress={() => handleHeroeDetails(item)}>
              <Text>
                <Icon name="arrow-right" size={24} />
              </Text>
            </TouchableOpacity>
          </View>
        )}
        onEndReached={handleNewCallApi}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styled = StyleSheet.create({
  list: {
    marginTop: 10,
    marginBottom: 150,
    padding: 15,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
    marginRight: 10,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListHeroes;
