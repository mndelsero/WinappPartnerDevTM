import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { toast } from "@backpackapp-io/react-native-toast";
import { useAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { ENVIROMENT } from "@/utils/constants";
import ApiService from "@/services/ApiService";
import Button from "@/components/Button";
import useGlobalStore from "@/store/useGlobalStore";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("El correo es invalido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener almenos 8 caracteres")
    .required("La contraseña es requerida"),
});

interface SignInData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { getToken, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const { setBusiness } = useGlobalStore();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    isValid,
    validateField,
  } = useFormik({
    initialValues: {
      email: ENVIROMENT === "development" ? "partner@gmail.com" : "",
      password: ENVIROMENT === "development" ? "12345678A" : "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (data: SignInData) => {
    console.log(data.email)
    console.log(data.password)
    if (isSignedIn) {

      const token = await getToken();
      if (!token) {

        return;
      }
      const apiService = new ApiService();
      const businessData = await apiService.getBussinessByUser(token);


      if (businessData && businessData.status === "success") {
        const { business } = businessData.data;

        if (business) {
          if (business.status === "Acepted") {
            // TODO
            setBusiness(business);
            router.replace("/(authed)/(dashboard)/(tabs)/home");
            return;
          }
          router.push("/(authed)/(pre-active)/revision");
          return;
        }

      } else {
        setLoading(false);
        router.push("/(authed)/(pre-active)/select-category")
      }





    } else {
      try {
        setLoading(true);

        if (!isLoaded) {
          return;
        }





        const result = await signIn.create({

          identifier: data.email,
          password: data.password,
        });
        if (result?.status === "complete") {

          toast.success("Sesión iniciada con éxito");
          await setActive({ session: result.createdSessionId });
          setLoading(false);
          router.push("/(authed)/(pre-active)/select-category");
          return;
        }
      } catch (error) {
        throw error

      }
    }
  };




  return (
    <View style={[tw`bg-white h-full flex justify-between`]}>
      <View
        style={tw`bg-white h-full mx-4 rounded-lg px-4 tablet:px-8 py-5 flex flex-col justify-around	`}
      >
        <View style={tw`flex justify-center items-center`}>
          <Text
            style={[
              tw`text-black text-center  text-4xl tablet:text-6xl`,

            ]}
          >
            Bienvenido
            {"\n"}
            de vuelta
          </Text>
        </View>

        <View style={tw`w-6/6 flex justify-center`}>
          <Input
            placeholder="Correo Electrónico"
            onFocus={handleBlur("email")}
            onChangeText={handleChange("email")}
            value={values.email}
            error={!!errors.email}
            errorMessage={errors.email}
          />

          <Input
            placeholder="Contraseña"
            onFocus={handleBlur("password")}
            onChangeText={handleChange("password")}
            value={values.password}
            error={!!errors.password}
            errorMessage={errors.password}
            secureTextEntry
          />

          <Text
            onPress={async () => {
              const validate = await validateField("email");
              if (!errors.email) {
                const email = values.email;
                await signIn
                  ?.create({
                    strategy: "reset_password_email_code",
                    identifier: email,
                  })
                  .catch((e) => {
                    console.log(e);
                  });

                toast.success(
                  "Se envio un correo para restablecer tu contraseña"
                );
                router.push("/(auth)/forgot-password");
              }
            }}
            style={tw`text-sm tablet:text-lg text-primary text-left font-bold mt-3`}
          >
            Recuperar contraseña
          </Text>
        </View>

        <View style={tw`mt-4 tablet:mt-8 flex  items-center justify-center`}>
          {loading ? (
            <ActivityIndicator color={tw.color("primary")} />
          ) : (
            <>
              <Button
                onPress={() => handleSubmit()}
                title="Iniciar Sesión"
                outline
                color={tw.color("primary")}
                textColor={tw.color("primary")}
              />

              <View style={tw`flex flex-row items-center  `}>
                <Text
                  style={tw`text-sm tablet:text-lg text-black text-left font-bold mt-3`}
                >
                  No eres miembro aún?
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-up")}
                  style={tw`mt-3`}
                >
                  <Text
                    style={[
                      tw`text-primary underline text-center  text-sm tablet:text-xl ml-1`,
                      { fontFamily: "OpenSansBold" },
                    ]}
                  >
                    Regístrate
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
