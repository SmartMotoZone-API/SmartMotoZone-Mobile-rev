import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function ConfiguracoesScreen() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [salvo, setSalvo] = useState("");

  useEffect(() => {
    (async () => {
      const nome = await AsyncStorage.getItem("nomeUsuario");
      if (nome) {
        setNomeUsuario(nome);
        setSalvo(nome);
      }
    })();
  }, []);

  const salvarNome = async () => {
    await AsyncStorage.setItem("nomeUsuario", nomeUsuario);
    setSalvo(nomeUsuario);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Configurações</Text>

      <Text>Digite seu nome:</Text>
      <TextInput
        style={styles.input}
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
        placeholder="Seu nome"
      />

      <Button title="Salvar" onPress={salvarNome} />

      {salvo ? <Text style={styles.info}>Nome salvo: {salvo}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 8, width: "80%", borderRadius: 5 },
  info: { marginTop: 10, fontSize: 16, fontStyle: "italic" },
});
