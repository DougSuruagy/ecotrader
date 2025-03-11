# Contribuindo para o EcoTrader

Obrigado pelo seu interesse em contribuir para o EcoTrader! Este documento fornece diretrizes para ajudar no processo de contribuição para este projeto.

## Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
  - [Reportando Bugs](#reportando-bugs)
  - [Sugerindo Melhorias](#sugerindo-melhorias)
  - [Contribuindo com Código](#contribuindo-com-código)
- [Fluxo de Trabalho Git](#fluxo-de-trabalho-git)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Processo de Revisão](#processo-de-revisão)

## Código de Conduta

Este projeto e todos os participantes estão sujeitos a um Código de Conduta. Ao participar, espera-se que você mantenha este código. Por favor, reporte comportamentos inaceitáveis para [contato@ecotrader.com].

## Como Posso Contribuir?

### Reportando Bugs

Esta seção orienta você sobre como reportar bugs para o EcoTrader. Seguir estas diretrizes ajuda os mantenedores a entender seu relatório, reproduzir o comportamento e encontrar relatórios relacionados.

Antes de criar um relatório de bug, verifique se o problema já não foi reportado buscando na seção de Issues do GitHub. Se encontrar um issue aberto que parece ser o mesmo problema que você está enfrentando, adicione um comentário ao invés de abrir um novo.

Quando você está criando um relatório de bug, por favor inclua o máximo de detalhes possível:

* **Use um título claro e descritivo** para identificar o problema.
* **Descreva os passos exatos para reproduzir o problema** com o máximo de detalhes possível.
* **Forneça exemplos específicos** para demonstrar os passos.
* **Descreva o comportamento observado após seguir os passos** e aponte qual é exatamente o problema com esse comportamento.
* **Explique qual comportamento você esperava ver e por quê.**
* **Inclua capturas de tela** se possível.
* **Se o problema não foi desencadeado por uma ação específica**, descreva o que você estava fazendo antes do problema acontecer.

### Sugerindo Melhorias

Esta seção orienta você sobre como submeter uma sugestão de melhoria para o EcoTrader, incluindo recursos completamente novos e pequenas melhorias na funcionalidade existente.

As sugestões de melhoria são rastreadas como issues do GitHub. Depois de determinar qual melhoria você gostaria de sugerir, crie um issue e forneça as seguintes informações:

* **Use um título claro e descritivo** para identificar a sugestão.
* **Forneça uma descrição passo a passo da melhoria sugerida** com o máximo de detalhes possível.
* **Forneça exemplos específicos para demonstrar os passos** ou aponte para projetos semelhantes onde essa melhoria existe.
* **Descreva o comportamento atual** e **explique qual comportamento você esperava ver** e por quê.
* **Explique por que essa melhoria seria útil** para a maioria dos usuários do EcoTrader.

### Contribuindo com Código

#### Configuração Local do Ambiente de Desenvolvimento

1. Faça um fork do repositório no GitHub.
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/seu-username/ecotrader.git
   cd ecotrader
   ```
3. Configure o repositório upstream:
   ```bash
   git remote add upstream https://github.com/original-owner/ecotrader.git
   ```
4. Instale as dependências:
   ```bash
   # Instalar dependências do projeto principal
   npm install
   
   # Instalar dependências do frontend
   cd frontend
   npm install
   
   # Instalar dependências do backend
   cd ../backend
   npm install
   ```

## Fluxo de Trabalho Git

1. **Atualize seu fork**: Antes de começar a trabalhar em uma nova feature ou correção, certifique-se de que seu fork está atualizado com o repositório principal:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crie uma branch**: Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```
   Use um nome descritivo para sua branch, como `feature/sistema-de-filtros` ou `fix/correcao-login`.

3. **Faça commits**: Faça commits de suas alterações com mensagens claras e descritivas:
   ```bash
   git commit -m "Adiciona sistema de filtros para materiais recicláveis"
   ```
   Siga as convenções de commit descritas abaixo.

4. **Push para seu fork**: Envie suas alterações para seu fork no GitHub:
   ```bash
   git push origin feature/nome-da-feature
   ```

5. **Crie um Pull Request**: Vá para o repositório original no GitHub e crie um Pull Request para sua branch. Forneça uma descrição clara do que sua PR faz e referencie qualquer issue relacionado.

### Convenções de Commit

Usamos convenções de commit para manter o histórico de commits organizado e facilitar a geração automática de changelogs. Por favor, siga este formato para suas mensagens de commit:

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

Tipos comuns:
- **feat**: Uma nova feature
- **fix**: Correção de bug
- **docs**: Alterações na documentação
- **style**: Alterações que não afetam o significado do código (espaços em branco, formatação, etc)
- **refactor**: Alteração de código que não corrige um bug nem adiciona uma feature
- **test**: Adicionando testes ou corrigindo testes existentes
- **chore**: Alterações no processo de build ou ferramentas auxiliares

Exemplos:
```
feat(produtos): adiciona sistema de filtros para materiais
fix(auth): corrige problema de login com Google
docs(readme): atualiza instruções de instalação
```

## Padrões de Código

### JavaScript / React

- Usamos ESLint e Prettier para garantir a consistência do código
- Siga as regras do ESLint configuradas no projeto
- Use componentes funcionais e hooks no React
- Mantenha os componentes pequenos e focados em uma única responsabilidade
- Use PropTypes ou TypeScript para tipagem

### Node.js / Express

- Organize as rotas em arquivos separados por domínio
- Use async/await para operações assíncronas
- Implemente validação de entrada em todas as rotas
- Siga o padrão de controladores para a lógica de negócios
- Use middleware para funcionalidades reutilizáveis

### Estilo de Código Geral

- Use 2 espaços para indentação
- Use aspas simples para strings
- Termine cada arquivo com uma nova linha
- Evite linhas com mais de 80 caracteres
- Use camelCase para variáveis, funções e instâncias
- Use PascalCase para classes e componentes React
- Use UPPER_CASE para constantes

## Testes

Todos os novos recursos e correções de bugs devem incluir testes adequados:

- **Frontend**: Testes de componentes usando Jest e React Testing Library
- **Backend**: Testes de API usando Jest e Supertest

Para executar os testes:

```bash
# Testes do frontend
cd frontend
npm test

# Testes do backend
cd backend
npm test
```

Certifique-se de que todos os testes passam antes de enviar um Pull Request.

## Processo de Revisão

O processo de revisão de código é uma parte importante do desenvolvimento do EcoTrader. Aqui está o que esperar:

1. Um mantenedor revisará seu Pull Request
2. Se houver problemas, o revisor deixará comentários solicitando alterações
3. Quando as alterações forem solicitadas, faça as alterações necessárias e envie novos commits
4. Após as alterações, o revisor aprovará e mesclará seu PR, ou solicitará mais alterações

Algumas coisas que os revisores procuram:

- Aderência aos padrões de código
- Testes adequados
- Funcionalidade correta
- Desempenho e segurança
- Documentação adequada

---

Obrigado por contribuir para o EcoTrader! Suas contribuições ajudam a tornar o projeto melhor para todos.