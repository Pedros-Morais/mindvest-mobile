# 📱 MindVest - Plataforma de Educação Financeira

<img width="120" height="262" alt="simulator_screenshot_A216C88C-31D6-4395-A3F0-75C84E8E2C92" src="https://github.com/user-attachments/assets/5f1d4884-87e9-46f4-9854-e7dcaea8952e" />


Uma aplicação móvel gamificada para aprendizado de investimentos, inspirada no Duolingo, desenvolvida em React Native com Expo.

## 👥 Estudantes

| Nome | RM |
|------|-----|
| Gustavo Vegi | RM550188 |
| Pedro Henrique Silva de Morais | RM98804 |
| Lucas Rodrigues Delfino | RM550196 |
| Luisa Cristina dos Santos Neves | RM551889 |
| Gabriel Aparecido Cassalho Xavier | RM99794 |

## 🎯 Sobre o Projeto

O MindVest é uma plataforma educacional gamificada que transforma o aprendizado sobre investimentos em uma experiência envolvente e interativa. Utilizando elementos de gamificação similares ao Duolingo, o app oferece lições estruturadas, sistema de XP, conquistas e acompanhamento de progresso.

### ✨ Principais Funcionalidades

- **🏠 Tela Inicial Gamificada**: Dashboard com metas diárias, contador de sequência e progresso
- **📚 Sistema de Lições**: Unidades estruturadas com lições progressivas sobre investimentos
- **🎮 Gamificação Completa**: Sistema de XP, níveis, conquistas e streaks
- **📊 Acompanhamento de Progresso**: Estatísticas detalhadas e gráficos de evolução
- **🎨 Interface Moderna**: Design inspirado no Duolingo com animações fluidas
- **🔐 Sistema de Autenticação**: Telas de boas-vindas, login e cadastro
- **🌙 Tema Adaptativo**: Suporte a modo claro e escuro

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** - Framework principal
- **Expo Router** - Navegação baseada em arquivos
- **TypeScript** - Tipagem estática
- **React Native Reanimated** - Animações performáticas
- **Expo Linear Gradient** - Gradientes e efeitos visuais
- **Expo Blur** - Efeitos de desfoque (glass morphism)

### Estado e Dados
- **Zustand** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para APIs
- **AsyncStorage** - Persistência local de dados

### UI/UX
- **Expo Vector Icons** - Ícones
- **React Native Safe Area Context** - Áreas seguras
- **Haptic Feedback** - Feedback tátil

## 🏗️ Arquitetura do Projeto

```
mindvest-mobile/
├── app/                          # Telas principais (Expo Router)
│   ├── (tabs)/                   # Navegação por abas
│   │   ├── index.tsx            # Tela inicial
│   │   ├── explore.tsx          # Lições
│   │   ├── progress.tsx         # Progresso
│   │   └── topics.tsx           # CRUD de Tópicos (CP3)
│   ├── auth/                    # Autenticação
│   │   ├── welcome.tsx          # Boas-vindas
│   │   ├── login.tsx           # Login
│   │   └── signup.tsx          # Cadastro
│   └── _layout.tsx             # Layout raiz
├── components/                  # Componentes reutilizáveis
│   └── ui/                     # Componentes de interface
├── modules/                    # Módulos de funcionalidade
│   ├── auth/                   # Autenticação
│   ├── lessons/                # Lições
│   ├── achievements/           # Conquistas
│   ├── progress/               # Progresso
│   └── topics/                 # CRUD - serviço e tipos
│       ├── services/           # TopicsService (API REST)
│       └── types.ts            # Tipos (Topic, TopicInput)
├── store/                      # Gerenciamento de estado
├── constants/                  # Constantes (cores, etc.)
├── hooks/                      # Hooks customizados
└── styles/                     # Estilos globais
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd mindvest-mobile
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo**
   - Escaneie o QR code com o app Expo Go (Android/iOS)
   - Ou pressione `a` para Android emulator
   - Ou pressione `i` para iOS simulator

## 📱 Funcionalidades Detalhadas

### Tela Inicial
- Saudação personalizada
- Contador de sequência (streak) animado
- Meta diária com barra de progresso
- Estatísticas de XP, lições e nível
- Botão de ação principal
- Feed de atividades recentes

### Sistema de Lições
- Unidades temáticas (Fundamentos, Ações, Renda Fixa)
- Lições progressivas com sistema de desbloqueio
- Cards animados com bordas pulsantes
- Indicadores visuais de progresso
- Sistema de XP por lição completada

### Gamificação
- Sistema de níveis baseado em XP
- Conquistas desbloqueáveis
- Contador de sequência diária
- Feedback visual e animações
- Progresso semanal em gráficos

### Autenticação
- Tela de boas-vindas com apresentação do app
- Formulários de login e cadastro
- Navegação fluida entre telas
- Validação de dados

## 🎨 Design System

### Cores Principais
- **Primária**: Amarelo dourado (#FFD700) - inspirado no Duolingo
- **Secundária**: Branco (#FFFFFF)
- **Sucesso**: Verde para conquistas
- **Erro**: Vermelho para ações destrutivas

### Componentes Animados
- **AnimatedCard**: Cards com entrada suave
- **AnimatedButton**: Botões com feedback tátil
- **StreakCounter**: Contador animado de sequência
- **ProgressBar**: Barras de progresso fluidas

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm start                 # Inicia o Expo
npm run android          # Executa no Android
npm run ios             # Executa no iOS
npm run web             # Executa na web

# Build
npm run build           # Build de produção

# Linting
npm run lint            # Verifica código
npm run lint:fix        # Corrige problemas automaticamente

# Testes
npm test                # Executa testes
```

## 🧩 Funcionalidades (Sprint - 4 CRUD)

- **Tópicos (aba "Tópicos")**
  - Criar, listar, editar e excluir tópicos via API REST
  - Validação com `zod` (título ≥ 3, descrição ≥ 10 caracteres)
  - Feedback visual (sucesso, erro) e botões de ação
  - Retentativa automática em falhas de rede/5xx e botão "Tentar novamente"

## 🔗 Configuração da API (REST)

- Base padrão: `https://jsonplaceholder.typicode.com` (sem necessidade de credenciais)
- Opcional: definir `EXPO_PUBLIC_API_BASE_URL` para apontar para sua própria API
- Opcional: definir `EXPO_PUBLIC_API_TOKEN` para autenticação (Bearer)
- Cliente HTTP: `services/api.ts` com interceptors de requisição/resposta e logs de erro

## ✅ Validação, Erros e Interrupções

- Validação com `zod` em formulários (título/descrição)
- Tratamento de erros com mensagens claras e `Alert`
- Retentativas automáticas (até 2) em falhas de rede/5xx (`TopicsService`)
- Ação de "Tentar novamente" na UI para recarregar dados

## 🧭 Navegação e Acesso

- Abra o app e acesse a aba `Tópicos`
- Use o botão flutuante `＋` para criar um novo tópico
- Toque em um card para editar; use "Excluir" para remover

## 🧪 Como Testar o CRUD

1. Abra `Tópicos` e verifique a lista carregada da API
2. Crie um tópico (título e descrição válidos) e confirme o feedback
3. Edite um tópico e valide atualização
4. Exclua um tópico e verifique remoção
5. Desconecte a rede para verificar retentativas e mensagens de erro

## 📈 Roadmap

- [ ] Implementação de lições interativas
- [ ] Sistema de notificações push
- [ ] Modo offline
- [ ] Integração com APIs de mercado financeiro
- [ ] Sistema de ranking entre usuários
- [ ] Certificados de conclusão

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento através dos RMs listados acima.
