# 🚀 SmartMotoZone

O **SmartMotoZone** é um aplicativo mobile desenvolvido em **React Native com Expo**, criado para otimizar o **mapeamento inteligente e a gestão de motos em pátios de múltiplas filiais** da Mottu.  
A solução permite o controle visual das zonas de estacionamento (A1, B1, C2...) e o gerenciamento de informações de cada moto, integrando-se a uma **API REST Java (Spring Boot)**.

---

## 🧠 Visão Geral

O projeto tem como objetivo fornecer uma ferramenta digital para:
- Identificar e localizar motos em diferentes zonas de pátio.
- Permitir atualização de status e zona via formulário dinâmico.
- Integrar-se à **API SmartMotoZone-Java** para obter e registrar dados reais.
- Gerenciar as operações com temas personalizáveis e armazenamento local persistente.

---

## 📱 Funcionalidades Principais

✅ **Mapeamento por Zonas** — Exibição visual das motos conforme suas zonas (A1, A2, B1...).  
✅ **CRUD de Motos** — Criar, listar, atualizar e remover motos (via API).  
✅ **Tema Claro/Escuro** — Interface adaptável ao gosto do usuário.  
✅ **Formulário Reativo** — Edição e salvamento dinâmico de dados.  
✅ **Persistência Local** — Armazena preferências e dados com AsyncStorage.  
✅ **Login e Cadastro de Usuário** — Integração com backend para autenticação.  
✅ **Distribuição via Firebase App Distribution** — Deploy de versões de teste.  

---

## 🧩 Tecnologias Utilizadas

### 🧱 Frontend (Mobile)
- **React Native (Expo SDK 51+)**
- **TypeScript**
- **Expo Router** — Navegação entre telas
- **Axios** — Comunicação com API
- **AsyncStorage** — Armazenamento local persistente
- **Context API + Hooks** — Tema e estado global
- **Firebase App Distribution** — Distribuição de builds Android

### ⚙️ Backend (API)
- **Java 17**
- **Spring Boot 3+**
- **Spring Security (JWT)**
- **Spring Data JPA**
- **Hibernate**
- **PostgreSQL**
- **Swagger OpenAPI**

---

## 🧠 Como Executar o Projeto

1. Instala as depedencias

   ```bash
   npm install
   npm install @react-native-async-storage/async-storage
   ```

2. Comece o app com

   ```bash
   npx expo start
   ```
A Api de Java é obtida nesse link: https://github.com/SmartMotoZone-API/SmartoMotoZone-Java

---
## 👤 Integrantes 

Gabriel Yuji Suzuki - RM556588
Lucas Felix Vassiliades - RM97677
Luiz Eduardo Da Silva Pinto - RM555213