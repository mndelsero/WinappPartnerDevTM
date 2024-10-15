import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import useGlobalStore from "@/store/useGlobalStore";
import AreYouSureModal from "./AreYouSureModal";
import { useMutation } from "react-query";
import ApiService from "@/services/ApiService";
import { toast } from "@backpackapp-io/react-native-toast";

interface DiscountProps {
  title: string;
  description: string;
  points?: number;
  id: number;
  refetch: () => void;
  type: string;
}
export default function Discount({
  title,
  description,
  points,
  id,
  refetch,
}: DiscountProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const { getToken } = useAuth();
  const { business } = useGlobalStore();
  const { isLoading, mutate } = useMutation({
    mutationKey: "deleteDiscount",
    onError: () => {},
    onSuccess: () => {
      toast.success("Codigo de descuento eliminado");
      refetch();
    },
    mutationFn: async () => {
      const token = await getToken({ template: "supabase" });
      const api = new ApiService(token ?? "");
      await api.deleteCodes(id, business.id ?? -1);
    },
  });

  return (
    <View
      style={tw`w-full bg-white h-38 rounded-2xl py-3 px-5 tablet:h-50 my-2 relative`}
    >
      <TouchableOpacity
        onPress={() => {}}
        style={tw`absolute right-2 top-1 bg-white rounded-full p-2 z-10 tablet:right-5 tablet:top-2`}
      >
        <AntDesign
          name="edit"
          size={Dimensions.get("window").width >= 1024 ? 35 : 20}
          color={tw.color("black")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowDialog(true);
        }}
        style={tw`absolute right-14 top-1 bg-white rounded-full p-2 z-10 tablet:right-5 tablet:top-2`}
      >
        <AntDesign
          name="delete"
          size={Dimensions.get("window").width >= 1024 ? 35 : 20}
          color={tw.color("black")}
        />
      </TouchableOpacity>

      <View style={tw`border-b-2 border-white pb-5`}>
        <Text style={tw`text-black text-xl tablet:text-3xl`}>{title}</Text>
        <Text style={tw`text-gray-600 text-sm tablet:text-xl mt-1 font-light mt-3`}>
          {description}
        </Text>
      </View>
      <View style={tw`justify-end w-full items-start `}>
        <Text
          style={tw`text-primary text-lg mt-1 font-light tablet:text-3xl tablet:mt-4`}
        >
          {points} Puntos
        </Text>
      </View>
      <AreYouSureModal
        setShow={setShowDialog}
        show={showDialog}
        title={`Eliminar ${title}`}
        onAccept={mutate}
        onCancel={() => setShowDialog(false)}
        onAcceptText="Eliminar"
        onCancelText="Cancelar"
        description="¿Estas seguro que deseas eliminar este código de descuento?"
        loading={isLoading}
      />
    </View>
  );
}
function getToken(arg0: { template: string }) {
  throw new Error("Function not implemented.");
}
