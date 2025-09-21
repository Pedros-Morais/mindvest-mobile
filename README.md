# 📱 MindVest - Plataforma de Educação Financeira

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
│   │   └── progress.tsx         # Progresso
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
│   └── progress/               # Progresso
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
