# Master Prompt - Video Maker Viral System

## Objetivo do projeto

Criar uma plataforma interna para descobrir automaticamente nichos virais promissores e transformar esses nichos em ideias, roteiros, cenas, prompts visuais, narracoes, legendas e pacotes de producao para videos curtos no YouTube Shorts, TikTok, Instagram Reels e Facebook Reels.

O usuario nao deve precisar saber qual nicho escolher. A ferramenta deve ajudar a encontrar automaticamente uma oportunidade de conteudo e guiar todo o processo de producao.

## Importante - escolha automatica de nicho

O aplicativo nao deve obrigar o usuario a escolher manualmente um nicho no inicio.

O sistema deve ter um modulo chamado Auto Niche Finder.

Esse modulo deve simular e analisar nichos virais, escolhendo automaticamente o melhor nicho para gerar videos curtos.

Na primeira versao MVP, sem integracao real com YouTube ou TikTok, o app deve usar uma base interna de nichos pre-cadastrados e um sistema de pontuacao.

## Base inicial de nichos

- AI bodycam stories
- police encounter stories
- true crime shorts
- horror POV
- survival stories
- mystery stories
- animated moral stories
- bizarre facts
- historical drama shorts
- animal rescue stories
- scary camping stories
- court case stories
- emergency call stories
- creepy neighbor stories
- lost footage stories

## Criterios de pontuacao

Cada nicho deve ter uma pontuacao automatica baseada em:

- potencial de viralizacao;
- facilidade de producao com IA;
- intensidade emocional;
- apelo internacional;
- possibilidade de criar muitos videos;
- baixa dependencia de imagens reais;
- facilidade de criar narrativas curtas;
- potencial de retencao;
- potencial de comentarios;
- risco de conteudo sensivel ou problematico.

O sistema deve calcular um Auto Niche Score de 0 a 100.

O melhor nicho nao deve ser escolhido apenas pelo maior potencial viral. Ele tambem deve considerar seguranca, facilidade de producao e escalabilidade.

## Regra de decisao

- Nichos com alto potencial viral, mas risco sensivel muito alto, devem receber penalizacao.
- Nichos faceis de produzir em massa devem receber bonus.
- Nichos com apelo global em ingles devem receber bonus.
- Nichos baseados em historias curtas com twist devem receber bonus.
- Nichos que dependem demais de imagens reais, violencia explicita ou fatos reais devem receber penalizacao.

## Fluxo principal do aplicativo

1. Auto Niche Finder
   O sistema escolhe automaticamente o melhor nicho viral com base em uma pontuacao interna.

2. Idea Generator
   Depois que o nicho for escolhido automaticamente, o sistema gera ideias de videos curtos para esse nicho.

   O gerador deve pesquisar referencias atuais na web, usar essas referencias apenas como inspiracao de formato/tendencia e criar ideias novas e ficcionais, sem copiar casos reais, nomes reais, vitimas, acusacoes ou detalhes sensiveis.

3. Script Builder
   O sistema transforma a ideia escolhida em um roteiro curto com estrutura de retencao.

4. Scene Breakdown
   O sistema quebra o roteiro em cenas com tempo estimado.

5. Visual Prompt Generator
   O sistema cria prompts visuais para cada cena.

6. Voiceover Builder
   O sistema cria a narracao final.

7. Captions Builder
   O sistema cria legendas curtas em estilo Shorts/Reels/TikTok.

8. Production Board
   O sistema organiza cada video por status.

9. Export Center
   O sistema exporta tudo em pacotes prontos para copiar e usar em ferramentas externas de IA.

   O Export Center deve permitir separar os prompts visuais em cenas/clipes de 5 a 15 segundos, com cada prompt entregue individualmente e pronto para copiar e colar em geradores externos de video.

## Dashboard

No Dashboard, criar um botao principal:

`Find Best Viral Niche`

Ao clicar, o sistema deve:

1. Analisar a base de nichos.
2. Calcular a pontuacao de cada nicho.
3. Escolher automaticamente o nicho mais promissor.
4. Exibir o motivo da escolha.
5. Sugerir 10 ideias iniciais para esse nicho.

## Tela Auto Niche Finder

A tela Auto Niche Finder deve mostrar:

- ranking dos nichos;
- pontuacao de cada nicho;
- pontos fortes;
- riscos;
- dificuldade de producao;
- idioma recomendado;
- plataformas recomendadas;
- justificativa da escolha;
- botao `Generate Ideas for This Niche`.

Mesmo com escolha automatica, o usuario ainda pode trocar o nicho manualmente se quiser, mas o fluxo padrao deve ser automatico.

## Export Center

A tela Export Center deve ter uma opcao de duracao de cena entre 5 e 15 segundos.

Com base nessa duracao, o sistema deve gerar prompts separados por cena, incluindo:

- numero da cena;
- timeline;
- duracao exata;
- titulo da cena;
- prompt pronto para colar no gerador de video;
- orientacoes de continuidade visual;
- avisos para nao incluir legendas, logos, gore, pessoas reais ou marcas reais.

O usuario deve poder copiar apenas os prompts separados ou copiar o pacote completo.

## Pesquisa de referencias e novidade

O aplicativo deve ter um backend local funcional para buscar referencias reais, quando houver internet disponivel.

O sistema deve:

- pesquisar referencias atuais relacionadas ao nicho escolhido;
- mostrar as referencias usadas no Idea Generator;
- gerar ideias novas a partir de padroes de formato, nao copiando fatos reais;
- salvar historico local de ideias geradas;
- evitar repetir sempre as mesmas ideias;
- funcionar em modo fallback interno caso a internet ou a busca externa falhe.

## Exemplo de resultado esperado

Selected Niche:
AI Bodycam Stories

Reason:
This niche has high retention potential, strong first-second hooks, easy short-form storytelling structure, global appeal in English, and can be produced using AI-generated scenes without depending on real footage.

Auto Niche Score:
91/100

Recommended Platforms:
YouTube Shorts, TikTok, Instagram Reels

Recommended Video Length:
45-60 seconds

Recommended Style:
Cinematic bodycam, tense narration, realistic documentary tone, strong twist ending.
