import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditarScreen() {
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("");
  const [zona, setZona] = useState("");

  const limpar = () => {
    setModelo("");
    setStatus("");
    setZona("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ Editar Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />

      <TextInput
        style={styles.input}
        placeholder="Zona (ex: A1)"
        value={zona}
        onChangeText={setZona}
      />

      <Button title="Salvar" onPress={() => alert(`Moto salva: ${modelo}, ${status}, ${zona}`)} />
      <Button title="Limpar" onPress={limpar} color="red" />

      <Text style={styles.preview}>
        Pré-visualização: {modelo || "??"} | {status || "??"} | {zona || "??"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 8, width: "80%", borderRadius: 5 },
  preview: { marginTop: 15, fontSize: 16, fontStyle: "italic" },
});
