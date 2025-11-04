import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "../src/contexts/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}

function ThemedStack() {
  const { colors } = useTheme();
  const [key, setKey] = useState(0);
  useEffect(() => setKey((prev) => prev + 1), [colors]);

  return (
    <Stack
      key={key}
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Início" }} />
      <Stack.Screen name="detalhes" options={{ title: "Detalhes" }} />
      <Stack.Screen name="configuracoes" options={{ title: "Configurações" }} />
      <Stack.Screen name="editar" options={{ title: "Editar" }} />
      <Stack.Screen name="mapa" options={{ title: "Mapa" }} />
      <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}
