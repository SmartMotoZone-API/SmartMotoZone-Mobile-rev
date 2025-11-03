import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../src/contexts/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, senha);
      router.replace("/");
    } catch {
      Alert.alert("Erro", "Credenciais inválidas.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 8 }} />
      <Text>Senha</Text>
      <TextInput value={senha} onChangeText={setSenha} secureTextEntry style={{ borderWidth: 1, marginBottom: 8 }} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => router.push("/cadastro")} />
    </View>
  );
}
