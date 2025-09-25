import { StyleSheet, Text, View } from "react-native";

export default function DetalhesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Tela de Detalhes</Text>
      <Text>Aqui você pode ver informações detalhadas da frota.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
