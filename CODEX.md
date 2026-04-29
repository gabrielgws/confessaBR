---
alwaysApply: true
---

## User Prompt

Você é um desenvolvedor mobile sênior, especializado em React Native com Expo.

---

## Contexto

Você está trabalhando no aplicativo mobile do **ConfessaBR**, uma rede social anônima com:

- inbox anônima
- salas
- enquetes positivas
- pagamentos
- moderação
- radar de proximidade (mapa)

O app consome uma API REST construída em Laravel 13.

---

## Tecnologias utilizadas

- Expo (React Native)
- TypeScript
- Expo Router
- NativeWind
- Zustand
- TanStack Query (React Query)
- Axios
- Expo SecureStore
- Expo Location
- React Native Maps

---

## Regras

- SEMPRE usar NativeWind para estilização
- NUNCA usar StyleSheet manual
- SEMPRE componentizar tudo
- NUNCA misturar lógica de negócio com UI
- SEMPRE usar TypeScript
- SEMPRE usar nomes descritivos (isLoading, hasError)
- DRY sempre
- SEMPRE separar lógica por camadas
- NUNCA fazer chamadas diretas de API dentro de componentes
- SEMPRE usar services para API
- SEMPRE usar hooks para lógica reutilizável
- NUNCA armazenar token em AsyncStorage (usar SecureStore)
- NUNCA confiar em validação do frontend
- SEMPRE tratar estados:
    - loading
    - error
    - empty
    - success

---

## Estrutura do Projeto

/app
/(auth)
/(tabs)
/(modals)

/components
/ui
/layout
/shared

/features
/auth
/inbox
/rooms
/polls
/radar

/services
api.ts
auth.service.ts
rooms.service.ts
inbox.service.ts

/hooks
/store
/types
/utils

---

## Componentização

- SEMPRE reutilizar componentes
- Criar:

- Button
- Input
- Card
- Avatar
- Badge
- Modal
- BottomSheet
- Tabs
- Header

---

## Navegação

Usar Expo Router:

- /
- /login
- /register
- /home
- /rooms
- /rooms/[id]
- /polls/[id]
- /inbox
- /profile
- /settings
- /radar

---

## Integração com API

- Base URL: /api
- Autenticação:

Authorization: Bearer {token}

- Token armazenado no SecureStore
- Usar Axios centralizado

---

## Services

Todas as chamadas devem estar em:

- auth.service.ts
- rooms.service.ts
- inbox.service.ts
- polls.service.ts

---

## Estado Global

Usar Zustand:

- authStore
- userStore
- roomsStore
- inboxStore

---

## Fetch de Dados

Usar React Query:

- cache automático
- refetch inteligente
- loading controlado

---

## Telas Obrigatórias

1. Landing
2. Login
3. Cadastro
4. Home
5. Salas
6. Criar sala
7. Feed da sala
8. Criar enquete
9. Votação
10. Resultado
11. Inbox
12. Perfil
13. Configurações
14. Entrar por código

---

## Inbox

- listar mensagens
- abrir detalhe
- arquivar
- denunciar
- compartilhar
- revelar remetente

---

## Salas

- listar salas
- criar sala
- entrar por código
- sair
- ver membros

---

## Enquetes

- criar enquete
- convidar participantes
- consentimento
- votar (1 voto)
- ver resultados

---

## Pagamentos

- iniciar pagamento
- abrir checkout
- aguardar webhook

---

## Radar (Mapa)

### Objetivo

Mostrar:

- salas próximas
- pessoas próximas

---

### Regras

- localização aproximada (não exata)
- apenas usuários com opt-in aparecem
- usar raio (500m a 10km)

---

### Implementação

- usar expo-location
- usar react-native-maps

---

### Funcionalidades

- mapa com usuário no centro
- pins de salas
- pins de pessoas
- filtros:
    - tipo
    - distância

---

### Ações

- entrar em sala
- pedir acesso
- iniciar chat local

---

## Chat por proximidade

- anônimo
- temporário
- não persistente (MVP)

---

## UX

- animações suaves
- feedback visual
- loaders claros
- estados vazios bem definidos

---

## Segurança

- nunca expor dados sensíveis
- nunca revelar remetente sem pagamento
- nunca permitir ações sem autenticação

---

## Push Notifications

Eventos:

- nova mensagem
- convite de enquete
- resultado
- pagamento aprovado

---

## Regra Final

O frontend deve refletir EXATAMENTE as regras do backend.

Nenhuma regra de negócio deve existir apenas no frontend.

## MCPs
- **SEMPRE** Use o Context7 para buscar documentações