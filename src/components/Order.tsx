import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
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
  status: Status;
  date: string;
  refetch?: () => void;
}

const typesText = {
  1: "Descuento de ",
  2: "Producto Gratis",
  3: "2x1",
};

export default function Order({
  clientName,
  orderId,
  orderTotal,
  orderDetail = [],
  hasUsedCode,
  type,
  discount,
  date,
  status,
  refetch,
}: OrderProps) {
  const [showDialogCancel, setShowDialogCancel] = React.useState(false);
  const [showDialogPrepare, setShowDialogPrepare] = React.useState(false);
  const [showDialogReady, setShowDialogReady] = React.useState(false);
  const [showDialogCompleted, setShowDialogCompleted] = React.useState(false);
  const { getToken } = useAuth();
  const cancel = useMutation({
    mutationKey: "cancelOrder",
    onError: () => {
      toast.error("Error al actualizar el pedido");
    },
    mutationFn: async () => {
      const token = (await getToken()) ?? "";
      const apiService = new ApiService(token);
      await apiService.changeStatusOrder(orderId, Status.Cancelled);
    },
    onSuccess: () => {
      toast.success("Pedido actualizado a cancelado");
      setShowDialogCancel(false);
      refetch?.();
    },
  });
  const prepare = useMutation({
    mutationKey: "prepareOrder",
    onSuccess: () => {
      toast.success("Pedido actualizado a preparando");
      setShowDialogPrepare(false);
      refetch?.();
    },
    onError: () => {
      toast.error("Error al actualizar el pedido");
    },
    mutationFn: async () => {
      const token = (await getToken()) ?? "";
      const apiService = new ApiService(token);
      await apiService.changeStatusOrder(orderId, Status.Preparing);
    },
  });

  const ready = useMutation({
    mutationKey: "readyOrder",
    onSuccess: () => {
      toast.success("Pedido actualizado a listo para retirar");
      setShowDialogReady(false);
      refetch?.();
    },
    onError: () => {
      toast.error("Error al actualizar el pedido");
    },
    mutationFn: async () => {
      const token = (await getToken()) ?? "";
      const apiService = new ApiService(token);
      await apiService.changeStatusOrder(orderId, Status.ForPickup);
    },
  });
  const completed = useMutation({
    mutationKey: "completedOrder",
    onSuccess: () => {
      toast.success("Pedido actualizado a listo para retirar");
      setShowDialogReady(false);
      refetch?.();
    },
    onError: () => {
      toast.error("Error al actualizar el pedido");
    },
    mutationFn: async () => {
      const token = (await getToken()) ?? "";
      const apiService = new ApiService(token);
      await apiService.changeStatusOrder(orderId, 4).then((res) => {
        console.log("completed", res);
      });
    },
  });

  return (
    <View style={tw`w-full   `}>
      <View
        style={tw`rounded-xl bg-white px-3 py-2   shadow-sm  pb-4 tablet:pb-8 tablet:py-4  tablet:rounded-2xl  overflow-hidden`}
      >
        <View style={tw`flex-row`}>
          <View style={tw` w-2/5`}>
            <Text
              style={tw`text-gray-400 font-bold tablet:text-3xl text-xl mb-2`}
            >
              {clientName}
            </Text>
            <View style={tw`flex-col`}>
              {orderDetail.map((detail, index) => (
                <View style={tw`flex-row`} key={detail.product_id}>
                  <Text style={tw`text-gray-800 text-sm tablet:text-2xl`}>
                    {detail.quantity} x
                  </Text>
                  <Text style={tw`text-gray-800 text-sm tablet:text-2xl`}>
                    {detail.product}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={tw` w-3/5 flex-row justify-between`}>
            <View style={tw`w-full  `}>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`w-1/2`}>
                  <Text
                    style={tw`text-gray-400 font-light text-sm tablet:text-xl `}
                  >
                    id de pedido
                  </Text>
                  <Text
                    style={tw`text-gray-500 font-light text-lg tablet:text-2xl `}
                  >
                    {orderId}
                  </Text>
                </View>
                <View style={tw`w-1/2`}>
                  <Text
                    style={tw`text-gray-400 font-light text-sm tablet:text-2xl text-right `}
                  >
                    Monto total
                  </Text>
                  <Text
                    style={tw`text-gray-500 font-light text-lg tablet:text-2xl  text-right`}
                  >
                    $ {orderTotal}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row justify-between`}>
                {status === Status.Pending && (
                  <View style={tw`flex-row justify-center items-center gap-3`}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setShowDialogCancel(true);
                      }}
                      style={tw`bg-red-400 rounded-2xl px-4 py-2 mt-4 self-center z-10 elevation-4 shadow-2xl tablet:px-6 tablet:py-3 tablet:rounded-3xl`}
                    >
                      <Text style={tw`text-white font-bold tablet:text-xl`}>
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowDialogPrepare(true);
                      }}
                      style={tw`bg-green-500 rounded-2xl px-4 py-2 mt-4 self-center z-10 elevation-4 shadow-2xl tablet:px-6 tablet:py-3 tablet:rounded-3xl`}
                    >
                      <Text style={tw`text-white font-bold tablet:text-xl`}>
                        Preparar
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...tw`rounded-b-lg bg-primary px-3 py-1 mx-4 tablet:pb-8 tablet:py-4 tablet:rounded-2xl shadow-lg  overflow-hidden`,
        }}
      >
        <Text style={tw` text-lg text-gray-900  `}>
          Status:{" "}
          <Text style={tw` text-white`}>
            {status === Status.Pending ? "Pendiente" : ""}
            {status === Status.Preparing ? "Preparando" : ""}
            {status === Status.ForPickup ? "Listo para retirar" : ""}
            {status === Status.Completed ? "Completado" : ""}
            {status === Status.Cancelled ? "Cancelado" : ""}
          </Text>
        </Text>
      </View>

      {/* <Text style={tw`text-gray-400 font-bold tablet:text-3xl text-xl`}>
		{clientName}
      {/* {hasUsedCode && (
        <View style={tw`mt-4`}>
          <View style={tw`flex w-5/6`}>
            <Text style={tw`text-gray-500 font-light text-lg tablet:text-2xl`}>
              Se utilizo un codigo de regalo
            </Text>
            <View style={tw`rounded-full flex items-start mt-2`}>
              <Text
                style={tw`text-white font-bold text-sm py-2 px-4 bg-primary overflow-hidden rounded-2xl tablet:text-lg tablet:py-3 tablet:px-6 tablet:rounded-3xl`}
              >
                 @ts-ignore 
                {typesText[type]} {type === 1 && `${discount}%`}
              </Text>
            </View>
          </View>
        </View>
      )} */}
      {/* <Text style={tw`text-gray-500 text-sm self-center mt-2 tablet:text-xl`}>
        Fecha:{" "}
        <Text style={tw`font-bold`}>
          {formatDate(date)}
          {format(new Date(date), "dd/MM/yyyy HH:mm")}
        </Text>
      </Text> */}

      {/*   {status === Status.Preparing && (
        <View style={tw`flex-row justify-center items-center gap-3`}>
          <TouchableOpacity
            onPress={() => {
              setShowDialogReady(true);
            }}
            style={tw`bg-white rounded-2xl px-4 py-2 mt-4 self-center z-10 elevation-4 shadow-2xl tablet:px-6 tablet:py-3 tablet:rounded-3xl`}
          >
            <Text style={tw`text-primary font-bold tablet:text-xl`}>Listo</Text>
          </TouchableOpacity>
        </View>
      )} */}
      {/*  {status === Status.ForPickup && (
        <View style={tw`flex-row justify-center items-center gap-3`}>
          <TouchableOpacity
            onPress={() => {
              setShowDialogCompleted(true);
            }}
            style={tw`bg-white rounded-2xl px-4 py-2 mt-4 self-center z-10 elevation-4 shadow-2xl tablet:px-6 tablet:py-3 tablet:rounded-3xl`}
          >
            <Text style={tw`text-primary font-bold tablet:text-xl`}>
              Terminado
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
      <AreYouSureModal
        show={showDialogCancel}
        setShow={setShowDialogCancel}
        description="¿Estas seguro que deseas cancelar el pedido?"
        onAccept={cancel.mutate}
        loading={cancel.isLoading}
        onCancel={() => setShowDialogCancel(false)}
        onAcceptText="Aceptar"
        onCancelText="Cancelar"
        title="Cancelar Pedido"
      />

      <AreYouSureModal
        show={showDialogPrepare}
        setShow={setShowDialogPrepare}
        description="¿Estas seguro que deseas preparar el pedido?"
        onAccept={prepare.mutate}
        loading={prepare.isLoading}
        onCancel={() => setShowDialogPrepare(false)}
        onAcceptText="Aceptar"
        onCancelText="Cancelar"
        title="Preparar Pedido"
      />

      <AreYouSureModal
        show={showDialogReady}
        setShow={setShowDialogReady}
        description="¿Estas seguro que deseas marcar la orden como lista?"
        onAccept={ready.mutate}
        loading={ready.isLoading}
        onCancel={() => setShowDialogReady(false)}
        onAcceptText="Aceptar"
        onCancelText="Cancelar"
        title="Orden Lista"
      />
      <AreYouSureModal
        show={showDialogCompleted}
        setShow={setShowDialogCompleted}
        description="¿Estas seguro que deseas marcar la orden como completada?"
        onAccept={completed.mutate}
        loading={completed.isLoading}
        onCancel={() => setShowDialogCompleted(false)}
        onAcceptText="Aceptar"
        onCancelText="Cancelar"
        title="Orden Completada"
      />

      {/* <Dialog.Container visible={showDialogPrepare}>
				<Dialog.Title>Preparar Pedido</Dialog.Title>
				<Dialog.Description>
					¿Estas seguro que deseas preparar el pedido?
				</Dialog.Description>
				<Dialog.Button
					label="Cancelar"
					onPress={() => setShowDialogPrepare(false)}
				/>
				<Dialog.Button label="Aceptar" onPress={prepare.mutate} />
			</Dialog.Container>
			<Dialog.Container visible={showDialogReady}>
				<Dialog.Title>Orden Lista</Dialog.Title>
				<Dialog.Description>
					¿Estas seguro que deseas marcar la orden como lista?
				</Dialog.Description>
				<Dialog.Button
					label="Cancelar"
					onPress={() => setShowDialogReady(false)}
				/>
				<Dialog.Button label={<ActivityIndicator />} onPress={ready.mutate} />
			</Dialog.Container> */}
    </View>
  );
}
