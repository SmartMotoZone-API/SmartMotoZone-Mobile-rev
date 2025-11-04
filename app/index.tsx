import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../src/contexts/ThemeContext";
import api from "../src/services/api.";

type Moto = {
  id: number;
  modelo: string;
  status: string;
  zonaAtual?: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { colors, toggleTheme, theme } = useTheme();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarMotos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/motos");
      setMotos(response.data);
    } catch (error) {
      alert("Erro ao carregar as motos 🚨");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMotos();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>SmartMotoZone 🚀</Text>

      {/* Botões de navegação */}
      <View style={styles.buttons}>
        <Button title="📋 Detalhes" onPress={() => router.push("/detalhes")} />
        <Button title="⚙️ Configurações" onPress={() => router.push("/configuracoes")} />
        <Button title="✏️ Editar Moto" onPress={() => router.push("/editar")} />
        <Button title="🗺️ Ver Mapa" onPress={() => router.push("/mapa")} />
      </View>

      {/* Lista de motos */}
      <Text style={[styles.subtitle, { color: colors.text }]}>📍 Motos Cadastradas</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.text} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                { backgroundColor: colors.card, borderColor: colors.text },
              ]}
            >
              <Text style={[styles.itemTitle, { color: colors.text }]}>{item.modelo}</Text>
              <Text style={[styles.itemSub, { color: colors.text }]}>
                {item.status} • Zona {item.zonaAtual ?? "—"}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ width: "100%", marginTop: 10 }}
        />
      )}

      {/* Botão para atualizar */}
      <View style={{ marginTop: 20 }}>
        <Button title="🔄 Atualizar Lista" onPress={carregarMotos} />
      </View>

      {/* Alternar tema */}
      <View style={{ marginTop: 30 }}>
        <Button
          title={theme === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
          onPress={toggleTheme}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 20, fontWeight: "600", marginTop: 20 },
  buttons: { gap: 10, width: "80%", marginTop: 10 },
  item: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    width: "100%",
  },
  itemTitle: { fontSize: 18, fontWeight: "600" },
  itemSub: { fontSize: 14, marginTop: 4 },
});
