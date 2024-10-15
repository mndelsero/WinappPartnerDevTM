import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import DashboardHeader from "@/components/DashboardHeader";

import CategoriesPicker from "@/components/CategoriesPicker";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import ProductComponent from "@/components/ProductComponent";
import { Product } from "@/utils/types";
import { Stack } from "expo-router";

export default function Index() {
  const [loadingCategory, setLoadingCategory] = React.useState(true);
  const [category, setCategory] = React.useState(null);
  const { business } = useGlobalStore();
  const { getToken } = useAuth();
  const [productsData, setProductsData] = React.useState<Product[]>([]);
  const {
    data = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", business.id],
    queryFn: async () => {
      const token = await getToken();
      const apiService = new ApiService(token ?? "");
      const response= await apiService.getProducts( token);
      const { products } = await response.data;
        console.log('aqui estan todos los productos',products);
        
      return products;
    },


    enabled: !loadingCategory,
    cacheTime: 0,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    keepPreviousData: true,
  });
  useEffect(() => {
    if (data.length > 0) {
      if (category === null) {
        setProductsData(data);
      } else {
        setProductsData(data.filter((product: Product) => product.categoryId === category));
      }
    }
    

    console.log('data', data);
    
  }, [data,category]);

  

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: true,
       
        header: () => (
          <DashboardHeader
            notBack
            title="Productos"
            add
            href="/(authed)/(dashboard)/(tabs)/home/products/add-product"
           
          />
        ),
      }}
    />
    
    <ScrollView style={tw`w-full h-screen bg-background`}>
      <View style={tw`w-full justify-start`}>
        <CategoriesPicker
          category={category}
          setCategory={setCategory}
          setLoadingCategory={setLoadingCategory}
        />
      </View>
      <View>
        <WithLoading isLoading={isFetching} error={isError}>
          <View style={tw`flex-row flex-wrap justify-center px-2`}>
            {productsData?.length === 0 && (
              <Text style={tw`text-center mt-10 text-primary tablet:text-2xl`}>
                No hay productos en esta categoría
              </Text>
            )}
                
            <View style={tw`flex-row flex-wrap mt-4`}>
  {productsData?.map((product: Product, index: number, array: Product[]) => (
    <View style={tw`${Dimensions.get('window').width < 300 ? 'w-full' : 'w-1/2'} p-2`} key={product?.id}>
      <ProductComponent product={product} />
    </View>
  ))}
  {productsData?.length % 2 === 1 && Dimensions.get('window').width >= 300 && <View style={tw`w-1/2 p-2`}></View>}
</View>
          </View>
        </WithLoading>
      </View>
    </ScrollView>
    </>
  );
}
