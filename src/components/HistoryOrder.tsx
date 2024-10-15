import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "@/config/tw";
import { Status } from "@/utils/constants";
import { format } from "date-fns";
import { formatDate } from "@/utils/helpers";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "react-query";
import Dialog from "react-native-dialog";
import ApiService from "@/services/ApiService";
import AreYouSureModal from "./AreYouSureModal";
import { toast } from "@backpackapp-io/react-native-toast";
import { AntDesign } from "@expo/vector-icons";

interface OrderProps {
  clientName: string;
  orderId: string;
  orderTotal: number;
  orderDetail: {
    product_id: string;
    product: string;
    quantity: number;
  }[];
  hasUsedCode: boolean;
  type: number;
  discount?: number;
  date: string;
  refetch?: () => void;
}

export default function HistoryOrder({
  clientName,
  orderId,
  orderTotal,
  orderDetail = [],
  hasUsedCode,
  type,
  discount,
  date,
  refetch,
}: OrderProps) {
  const orderDate = new Date(date);
  const day = orderDate.getDate();
  const month = orderDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que debes sumar 1 para obtener el mes correcto.
  
  const [visible, setVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const showDialog = (order) => {
    setSelectedHistory(order);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);



  return (
    <>
    
    
    <View style={tw`w-full `}>
      <View
        style={tw`rounded-xl bg-white px-3 py-2 shadow-sm  pb-4 tablet:pb-8 tablet:py-4 tablet:rounded-2xl overflow-hidden`}
      >
        <View style={tw`flex-col`}>
          <View style={tw`flex-row justify-between`}>
            <Text
              style={tw`text-gray-400 font-bold tablet:text-3xl text-xl mb-2`}
            >
              {clientName}
            </Text>
            <Text
              style={tw`text-primary font-bold tablet:text-3xl text-xl mb-2`}
            >
              {`${day}/${month}`}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-1/3`}>
              <Text
                style={tw`text-gray-400 font-light text-sm tablet:text-xl `}
              >
                Descuento
              </Text>
              <Text
                style={tw`text-gray-500 font-light text-lg tablet:text-2xl `}
              >
                {/*  @ts-ignore */}
                {hasUsedCode ? type === 1 && `${discount}%` : "No plica"}
              </Text>
            </View>

            <View style={tw`w-1/3`}>
              <Text
                style={tw`text-gray-400 font-light text-sm tablet:text-2xl text-center `}
              >
                Monto total
              </Text>
              <Text
                style={tw`text-gray-500 font-light text-lg tablet:text-2xl  text-center`}
              >
                $ {orderTotal}
              </Text>
            </View>
            <View style={tw`w-1/3`}>
              <Text
                style={tw`text-gray-400 font-light text-sm tablet:text-xl text-right`}
              >
                id del pedido
              </Text>
              <Text
                style={tw`text-gray-500 font-light text-lg tablet:text-2xl text-right`}
              >
                {/*  @ts-ignore */}
                {orderId}
              </Text>
              
            </View>
          </View>
          <View style={tw`flex-row justify-end `}>
            <TouchableOpacity
              style={tw` `}
              onPress={() => showDialog({id: orderId, total: orderTotal, descuento: discount, date: formatDate(date), orderDetail: orderDetail})}
            >
              <Text style={tw`text-right underline text-primary`} >Ver detalles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    
    </View>

    {selectedHistory && (

<Dialog.Container visible={visible}  contentStyle={tw`dark:bg-white bg-white`} blurStyle={
				{backgroundColor:"#fff"}
			} >
  <TouchableOpacity
    style={tw`absolute top-2 right-2`}
    onPress={hideDialog}
  >
    <AntDesign name="close" size={24} color="black" />
  </TouchableOpacity>
  <Dialog.Description>
    <View style={tw`flex flex-col gap-2`}>
      <Text style={tw`text-sm text-primary`}>
        Id del pedido:{" "}
        <Text style={tw`text-sm text-gray-500`}>
          {selectedHistory.id}
        </Text>{" "}
      </Text>
      <Text style={tw`text-sm text-primary`}>
        Monto total:{" "}
        <Text style={tw`text-sm text-gray-500`}>
          ${selectedHistory.total}
        </Text>
      </Text>
      <Text style={tw`text-sm text-primary`}>
        Descuento:{" "}
        <Text style={tw`text-sm text-gray-500`}>
          NO
        {/* {type === 1 && `${selectedHistory.descuento}%`} */}
        </Text>
      </Text>
      <Text style={tw`text-sm text-primary`}>
        Fecha de pedido:{" "}
        <Text style={tw`text-sm text-gray-500`}>
          {selectedHistory.date}
        </Text>
      </Text>
      <Text style={tw`text-sm text-gray-900`}>
        Detalles del pedido:{" "}
      </Text>
      <View style={tw`flex-col`}>
     {selectedHistory.orderDetail && selectedHistory.orderDetail.map((detail, index) => (
    <View style={tw`flex-row`} key={detail.product_id}>
      <Text style={tw`text-primary text-sm tablet:text-2xl`}>
        {detail.quantity}x {" "}
      </Text>
      <Text style={tw`text-gray-800 text-sm tablet:text-2xl`}>
        {detail.product}
      </Text>
    </View>
  ))}
</View>
      
    </View>
  </Dialog.Description>
</Dialog.Container>
)}
    </>
  );
}
