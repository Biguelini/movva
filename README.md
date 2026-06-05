# 🚚 MOVVA — Logística Residencial & Interstate de Alta Curadoria

<p align="center">
  <img src="https://raw.githubusercontent.com/Biguelini/movva/main/public/screenshot.png" alt="MOVVA Banner" width="100%" style="border-radius: 12px;" />
</p>

> **Sua mudança. Tratada como curadoria.**  
> Uma experiência digital premium projetada para redefinir o conceito de mudanças residenciais, corporativas e interestaduais de alto padrão no Brasil. 

---

## 🎨 Design System & Estética Premium

A identidade visual da **MOVVA** foge dos clichês convencionais de templates de transportadoras (como ícones genéricos de caixas e caminhões) e abraça um tom editorial, moderno e sofisticado:

*   **Laranja Cargo (`#EA580C`)**: Sinalização operacional, fretes ativos e destaque primário.
*   **Amber Kraft (`#D97706`)**: Tonalidade orgânica das caixas de papelão e embalagens protetoras.
*   **Preto Asfalto (`#0E0D0C`)**: Fundo escuro imersivo que remete à estrada e à segurança do transporte.
*   **Branco Linho (`#FDFBF7`)**: Fundo claro quente que evoca papel seda e cuidado manual.
*   **Tipografia**: Combinação moderna das fontes *Outfit* (títulos geométricos e marcantes) e *Inter* (leitura limpa).

---

## 🚀 Funcionalidades Principais

*   **Simulator Inteligente (Step-by-Step)**: Calculadora dinâmica de mudanças dividida em etapas (Origem, Destino, Tipo de Imóvel, Detalhes de Acesso, Serviços Extras e Resultado).
*   **Integração Geográfica Real (OSRM API)**: Cálculo em tempo real da distância rodoviária e tempo estimado de trânsito direto através da API OSRM (Open Source Routing Machine), com fallback automático off-line usando a fórmula de Haversine.
*   **Hero Typography-Driven**: Seção inicial impactante com busca inteligente e autocomplete de 14 principais capitais e cidades brasileiras.
*   **Mapa de Cobertura Interativo**: Visualização vetorial estilizada do mapa do Brasil onde passar o mouse ou clicar em uma rota destaca a linha conectora e as cidades correspondentes.
*   **Bento Grid de Diferenciais**: Grid assimétrico premium destacando os pilares de segurança da marca (checklist digital, seguro total Allianz, rastreamento em tempo real).
*   **Navbar Capsule Dock**: Menu superior flutuante com efeito *glassmorphism* que se adapta dinamicamente ao scroll e à versão mobile.
*   **Zero Emojis**: Todo o conteúdo visual é estruturado com ícones vetoriais inline (SVG) personalizados, garantindo máxima fidelidade estética e eliminando emojis genéricos.

---

## 💻 Tecnologias Utilizadas

- **Core**: [Next.js 16](https://nextjs.org/) (React 19) com App Router
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Serviços**: [OSRM API](http://project-osrm.org/) (Roteamento rodoviário gratuito)

---

## 🛠️ Começando Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- npm, yarn ou pnpm

### Instalação
1. Clone este repositório:
   ```bash
   git clone git@github.com:Biguelini/movva.git
   cd movva
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção
Para validar e compilar o projeto para produção:
```bash
npm run build
```

---

## 📄 Licença

Este projeto é desenvolvido para fins de portfólio de alta fidelidade visual. Todos os direitos reservados à MOVVA Logística.
