import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../src/contexts/AuthContext";

export default function CadastroScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const validarFormulario = () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Erro", "E-mail inválido.");
      return false;
    }
    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return false;
    }
    return true;
  };

  const handleCadastro = async () => {
    if (!validarFormulario()) return;
    setLoading(true);

    try {
      await register(email, senha);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/login"); // volta pra tela de login
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>Criar Conta</Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 }}
      />

      <Text>Senha</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 }}
      />

      <Text>Confirmar Senha</Text>
      <TextInput
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="Repita sua senha"
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20 }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Button title="Cadastrar" onPress={handleCadastro} />
          <View style={{ marginTop: 12 }}>
            <Button title="Voltar ao Login" onPress={() => router.push("/login")} />
          </View>
        </>
      )}
    </View>
  );
}
