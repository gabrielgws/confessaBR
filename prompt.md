### **prompt.md**

→ Crie um aplicativo social anônimo chamado ConfessaBR, onde usuários podem interagir em salas, enviar mensagens anônimas e participar de enquetes positivas.

---

## **Comportamentos esperados**

- O usuário pode criar conta e fazer login.
- O usuário pode acessar o app como visitante, porém com limitações.

---

### **Perfil**

- O usuário pode criar e editar seu perfil.
- O usuário possui um username único.
- O usuário pode configurar preferências e privacidade.

---

### **Inbox Anônima**

- O usuário pode receber mensagens anônimas.
- O usuário pode visualizar, arquivar e denunciar mensagens.
- O usuário pode compartilhar mensagens sem revelar o remetente.
- O usuário pode revelar o remetente de uma mensagem apenas quando permitido e mediante pagamento.

---

### **Envio de mensagens**

- O usuário pode enviar mensagens anônimas para outros usuários.
- O remetente pode escolher permitir ou não a revelação da sua identidade.

---

### **Salas**

- O usuário pode criar salas.
- O usuário pode entrar em salas por código.
- O usuário pode sair de salas.
- O usuário pode visualizar membros da sala.

---

### **Feed da sala**

- O usuário pode visualizar mensagens anônimas dentro da sala.
- O usuário pode enviar mensagens na sala.
- O usuário pode denunciar conteúdos.
- Usuários com permissão podem moderar conteúdos.

---

### **Enquetes**

- O usuário pode criar enquetes positivas dentro de salas.
- O usuário pode convidar participantes para enquetes.
- O participante pode aceitar ou recusar participar.
- O usuário pode votar em uma enquete.
- O usuário pode votar apenas uma vez por enquete.
- O usuário pode visualizar resultados após o encerramento.

---

### **Resultados e compartilhamento**

- O usuário pode visualizar ranking de resultados.
- O usuário pode compartilhar resultados de forma visual.
- O compartilhamento não deve expor dados sensíveis sem consentimento.

---

### **Denúncias e moderação**

- O usuário pode denunciar mensagens, enquetes ou usuários.
- O sistema deve impedir denúncias duplicadas.
- Conteúdos denunciados podem ser ocultados ou removidos.
- Moderadores podem aplicar ações como bloquear ou banir.

---

### **Pagamentos**

- O usuário pode realizar pagamentos para funcionalidades específicas.
- O sistema deve liberar funcionalidades apenas após confirmação do pagamento.

---

### **Notificações**

- O usuário pode receber notificações sobre:
    - novas mensagens
    - convites de enquete
    - resultados
    - pagamentos

---

### **Radar (Proximidade)**

- O usuário pode visualizar salas próximas.
- O usuário pode visualizar pessoas próximas que optaram por aparecer.
- A localização exibida deve ser aproximada, nunca exata.
- O usuário pode criar salas baseadas na sua região.
- O usuário pode iniciar interações com pessoas próximas.

---

### **Chat por proximidade**

- O usuário pode iniciar conversas com pessoas próximas.
- As conversas são anônimas.
- As conversas podem ser temporárias.

---

### **Restrições**

- O visitante não pode criar conteúdo.
- O visitante não pode votar.
- O visitante não pode realizar pagamentos.
- O usuário não pode votar mais de uma vez na mesma enquete.
- O sistema não deve revelar identidade sem consentimento.

---

### **Experiência**

- O sistema deve ser simples, rápido e intuitivo.
- O anonimato deve ser preservado.
- O ambiente deve incentivar interações positivas.