/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';
interface CartProductItemProps {
  cartItem:{
    id:string;
    quantity:number;
    option?:string;
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
}
const CartProductItem = ({cartItem}: CartProductItemProps) => {
  const {quantity:quantityProp,product} = cartItem

  const [quantity,setQuantity ] = useState(quantityProp)

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          accessibilityLabel={product?.title}
          source={{
            uri: product?.image,
          }}
          
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {product?.title}
          </Text>
          <View style={styles.rating}>
            {[0,0,0,0,0].map((el,i)=>(

            <Icon
              style={styles.star}
              name={i < Math.floor(product?.avgRating) ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />
            ))}
            <Text>{product?.ratings}</Text>
          </View>
          <Text style={styles.price}> from ${product?.price}
          {product?.oldPrice && <Text style={styles.oldprice}>${product?.oldPrice}</Text>}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>

        <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingLeft:10
  },
  row:{
    flexDirection:'row'
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
  quantityContainer:{
    marginVertical:5,

  }
});
export default CartProductItem;
