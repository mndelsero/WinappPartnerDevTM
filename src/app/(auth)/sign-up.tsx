import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "@/config/tw";
import Input from "@/components/Input";
import * as yup from "yup";
import { toast } from "@backpackapp-io/react-native-toast";
import { useSignUp, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import InputDatePicker from "@/components/InputDatePicker";
import { parse } from "date-fns";
import BottomSheetRef, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFormik } from "formik";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Button from "@/components/Button";

const schema = yup.object().shape({
  firstName: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  phone: yup.string().required("El teléfono es requerido"),
  birthDate: yup
    .string()
    .required("La fecha de nacimiento es requerida")
    .test("age", "Debes ser mayor de 18 años", (value) => {
      const date = parse(value, "dd/MM/yyyy", new Date());
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      console.log(age);
      return age >= 18;
    }),
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
}

export default function SignUpScreen() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [visible, setVisible] = React.useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = useState("");
  const { user } = useUser();
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const router = useRouter();

  const { handleBlur, handleChange, handleSubmit, errors, isValid, values } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthDate: "",
        phone: "",
      },

      validationSchema: schema,
      onSubmit: async (values) => {
        await onSubmit(values);
      },
    });

  const onSubmit = async (data: SignInData) => {
    try {
      setVisible(true);
      if (!isLoaded) {
        return;
      }
      setLoading(true);
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
        // birthday: data.birthDate,
        unsafeMetadata: {
          role: "partner",
        },
      });

      const result = await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      bottomSheetRef.current?.expand();
      setLoading(false);
    } catch (e) {
      console.log(e?.errors[0].code);
      let error = "";
      // @ts-ignore
      switch (e?.errors[0].code) {
        case "form_identifier_exists":
          error = "El correo ya esta registrado";
          break;
        case "form_password_pwned":
          error = "La contraseña es muy debil";
          break;
        case "form_password_length_too_short":
          error = "La contraseña es muy corta";
          break;
        default:
          error = "No se pudo registrar el usuario";
          break;
      }
      toast.error(error);
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      if (value.length === 6) {
        if (!isLoaded) {
          return;
        }
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          
          code: value,
        });
        console.log(completeSignUp)
        if (completeSignUp.status !== "complete") {
          toast.error("Codigo incorrecto");
          return;
        }
        if (completeSignUp.status === "complete") {
          bottomSheetRef.current?.close();
          setLoading(false);
          await setActive({ session: completeSignUp.createdSessionId });

          toast.success("Usuario registrado correctamente");
          router.push("/(authed)/(pre-active)/select-category");
        }
      }
    })();
  }, [value]);

  return (
    <BottomSheetModalProvider>
      <ScrollView style={[tw`bg-white h-full`]}>
        <View style={tw`bg-white mx-4  rounded-lg px-4 tablet:px-8 py-5 flex h-full `}>
  
          <View style={tw`w-6/6 flex justify-between h-full bg-white`}>

			<View>
            <Input
              placeholder="Nombre"
              onFocus={handleBlur("firstName")}
              onChangeText={handleChange("firstName")}
              value={values.firstName}
              error={!!errors.firstName}
              errorMessage={errors.firstName}
              lineal
            />

            <Input
              placeholder="Apellido"
              onFocus={handleBlur("lastName")}
              onChangeText={handleChange("lastName")}
              value={values.lastName}
              error={!!errors.lastName}
              errorMessage={errors.lastName}
              lineal
            />

            <Input
              placeholder="Correo Electrónico"
              onFocus={handleBlur("email")}
              onChangeText={handleChange("email")}
              value={values.email}
              error={!!errors.email}
              errorMessage={errors.email}
              lineal
            />

            <Input
              placeholder="Contraseña"
              onFocus={handleBlur("password")}
              onChangeText={handleChange("password")}
              value={values.password}
              error={!!errors.password}
              errorMessage={errors.password}
              secureTextEntry
              lineal
            />

            <InputDatePicker
              display ="spinner"
              placeholder="Fecha de nacimiento"
              onFocus={handleBlur("birthDate")}
              onChangeText={handleChange("birthDate")}
              value={values.birthDate === "" ? undefined : values.birthDate}
              error={!!errors.birthDate}
              errorMessage={errors.birthDate}
            />

            <Input
              placeholder="Numero de Teléfono"
              onFocus={handleBlur("phone")}
              onChangeText={handleChange("phone")}
              value={values.phone}
              error={!!errors.phone}
              errorMessage={errors.phone}
              lineal
            />
			</View>

            <View style={tw`mt-20 tablet:mt-8 flex  items-center`}>
              <Button
                disabled={loading || !isValid}
                onPress={() => handleSubmit()}
                title={loading ? "" : "Registrarse"}
                color={tw.color("primary")}
                textColor={tw.color("primary")}
                outline
              />
              <Text
                onPress={() => router.push("/(auth)/sign-in")}
                style={tw`text-sm tablet:text-lg text-black text-right font-bold mt-3`}
              >
                Ya tienes una cuenta?
                <Text style={tw`text-primary underline`}> Inicia sesión</Text>
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>
      <BottomSheet
        enableOverDrag
        ref={bottomSheetRef}
        snapPoints={["50%"]}
        index={-1}
      >
        <View style={tw`h-full w-full p-5`}>
          <Text style={tw`text-center text-2xl tablet:text-4xl`}>
            Verificación de Correo
          </Text>
          <Text style={tw`text-center text-sm mt-2 tablet:text-2xl`}>
            Se ha enviado un código de verificación a tu correo electrónico
          </Text>

          {loading ? (
            <ActivityIndicator style={tw`mt-20 text-3xl tablet:text-8xl`} />
          ) : (
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={6}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={tw.style(
                    styles.cell,
                    isFocused && styles.focusCell,
                    "text-2xl tablet:text-4xl"
                  )}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          )}
        </View>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    flex: 1,
    justifyContent: "center",

    margin: "auto",
    alignItems: "center",
  },
  cell: {
    width: Dimensions.get("window").width / 8,
    margin: 5,
    height: Dimensions.get("window").width / 8,
    lineHeight: Dimensions.get("window").width / 8,
    borderWidth: 2,
    borderRadius: Dimensions.get("window").width / 25,
    borderColor: "grey",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
