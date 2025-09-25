import { StyleSheet, Text, View } from "react-native";

const motosMock = [
  { id: 1, modelo: "Honda CG", zona: "A1" },
  { id: 2, modelo: "Yamaha Fazer", zona: "B2" },
  { id: 3, modelo: "Suzuki Yes", zona: "A2" },
];

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Mapa do Pátio</Text>

      <View style={styles.grid}>
        {["A1", "A2", "B1", "B2"].map((zona) => (
          <View key={zona} style={styles.zone}>
            <Text style={styles.zoneLabel}>{zona}</Text>
            {motosMock
              .filter((moto) => moto.zona === zona)
              .map((moto) => (
                <Text key={moto.id} style={styles.moto}>
                  🛵 {moto.modelo}
                </Text>
              ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 15 },
  zone: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  zoneLabel: { fontWeight: "bold", marginBottom: 8 },
  moto: { fontSize: 14, color: "#444" },
});
