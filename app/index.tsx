import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartMotoZone 🚀</Text>

      <Button title="📋 Detalhes" onPress={() => router.push("/Detalhes")} />
      <Button title="⚙️ Configurações" onPress={() => router.push("/Configuracoes")} />
      <Button title="✏️ Editar Moto" onPress={() => router.push("/Editar")} />
      <Button title="🗺️ Ver Mapa" onPress={() => router.push("/Mapa")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", gap: 15 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
