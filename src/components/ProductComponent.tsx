import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { Product } from "@/utils/types";
import tw from "@/config/tw";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ProductComponentProps {
  product: Product;
}
export default function ProductComponent({ product }: ProductComponentProps) {
  const router = useRouter();
  return (
    <View
      style={tw`h-55 w-full bg-white rounded-3xl flex-col items-center justify-start   tablet:w-3/4 tablet:h-48 tablet:m-4 gap-0 tablet:gap-10 relative`}
    >
      <View
        style={tw`h-1/2 w-full px-2 pt-3 tablet:h-40 rounded-2xl  items-center justify-center relative`}
      >
        <Image
          resizeMode="cover"
          source={{
            uri: product.image,
          }}
          style={tw`h-26 w-full  rounded-xl tablet:h-32 tablet:w-48 tablet:rounded-2xl`}
        />
        <TouchableOpacity
          onPress={() => {
            router.push(
              `/(authed)/(dashboard)/(tabs)/home/products/${product.id}/edit`
            );
          }}
          style={tw`absolute right-0 top-0 bg-white rounded-full p-2`}
        >
          <Octicons name="pencil" size={18} color={tw.color("primary")} />
        </TouchableOpacity>
      </View>
      <View style={tw`h-1/2 w-full px-3 flex flex-col justify-between pt-1`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-black text-sm tablet:text-3xl mt-1`}>
            {product.name}
          </Text>
        </View>
        <View style={tw`flex-2 overflow-hidden`}>
          <Text
            style={tw`text-gray-500 text-xs w-full tablet:w-80 tablet:h-32 tablet:text-lg`}
          >
            {product.description.length > 50
              ? `${product.description.substring(0, 50)}...`
              : product.description}
          </Text>
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-primary text-sm  `}>${product.unitPrice}</Text>
        </View>
      </View>
    </View>
  );
}
