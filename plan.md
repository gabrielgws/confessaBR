@specs/001-confessabr-mobile

- Use **Expo (React Native)** como base do projeto (faça o setup)
- Use **TypeScript** obrigatoriamente em todo o projeto
- Use **Expo Router** para navegação (faça o setup)
- Use **NativeWind** como sistema de estilização (faça o setup)
- Use **Zustand** para gerenciamento de estado global (faça o setup)
- Use **TanStack Query (React Query)** para fetch e cache de dados (faça o setup)
- Use **Axios** para comunicação com a API (faça o setup)
- Use **Expo SecureStore** para armazenar o token de autenticação (faça o setup)

- Use **Expo Location** para obter localização do usuário (faça o setup)
- Use **React Native Maps** para renderizar o mapa (faça o setup)

- Consuma a API REST do ConfessaBR (Laravel 13)
- Todas as requisições devem usar autenticação via Bearer Token

- Componentize TUDO
- Crie componentes reutilizáveis para UI (button, input, card, avatar, etc)
- Separe lógica de negócio da interface

- Organize o projeto por features:
    - auth
    - inbox
    - rooms
    - polls
    - radar

- Crie uma tela de Radar (mapa) com:
    - salas próximas
    - pessoas próximas (opt-in)
    - raio de busca configurável
    - localização aproximada (não exata)

- O usuário não autenticado deve ter acesso limitado (modo visitante)
- Nenhuma regra de negócio deve existir apenas no frontend