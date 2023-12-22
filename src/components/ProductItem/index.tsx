/* eslint-disable prettier/prettier */
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'
interface ProductItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    avgRating: number;
    ratings: number;
    price: number;
    oldPrice?: number;
  };
}
const ProductItem = ({item}: ProductItemProps) => {

  const navigation = useNavigation()
  const onPress =()=>{
    navigation.navigate('productDetails',{id:item.id})
    console.log(item.id);
    
  }
  return (
    <>
      <Pressable onPress={onPress} style={styles.root}>
        <Image
          style={styles.image}
          accessibilityLabel={item.title}
          source={{
            uri: item.image,
          }}
          
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.rating}>
            {[0,0,0,0,0].map((el,i)=>(

            <Icon
              style={styles.star}
              name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />
            ))}
            <Text>{item.ratings}</Text>
          </View>
          <Text style={styles.price}> from ${item.price}
          {item.oldPrice && <Text style={styles.oldprice}>${item.oldPrice}</Text>}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  image: {
    flex: 2,
    width:150,
    height: 150,
    resizeMode: 'contain',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldprice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  star: {
    margin: 2,
  },
});
export default ProductItem;
