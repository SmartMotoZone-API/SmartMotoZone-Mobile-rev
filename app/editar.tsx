import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import api from "../src/services/api.";

export default function EditarScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("");
  const [zona, setZona] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) carregarMoto();
  }, [id]);

  const carregarMoto = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/motos/${id}`);
      const { modelo, status, zonaAtual } = response.data;
      setModelo(modelo);
      setStatus(status);
      setZona(zonaAtual);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar a moto");
    } finally {
      setLoading(false);
    }
  };

  const salvar = async () => {
    if (!modelo || !status || !zona) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await api.put(`/api/motos/${id}`, { modelo, status, zonaAtual: zona });
        Alert.alert("Sucesso", "Moto atualizada com sucesso!");
      } else {
        await api.post("/api/motos", { modelo, status, zonaAtual: zona });
        Alert.alert("Sucesso", "Moto cadastrada com sucesso!");
      }
      router.replace("/");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar moto.");
    } finally {
      setLoading(false);
    }
  };

  const deletar = async () => {
    if (!id) return;
    Alert.alert("Confirmar exclusão", "Deseja realmente excluir esta moto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/api/motos/${id}`);
            Alert.alert("Sucesso", "Moto excluída com sucesso!");
            router.replace("/");
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id ? "Editar Moto" : "Nova Moto"}</Text>

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

      <Button title={id ? "Salvar Alterações" : "Cadastrar Moto"} onPress={salvar} />
      {id && <Button title="Excluir Moto" color="red" onPress={deletar} />}

      <View style={{ marginTop: 10 }}>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 8, width: "80%", borderRadius: 5 },
});
