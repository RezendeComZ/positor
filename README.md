# Positor 

Uma SPA responsiva que cria e edita arquivos posicionais. Feita em HTML, Javascript e CSS.
Posicional + Editor = Positor (desculpa!)

---

Escrito para melhorar minhas habilidades de manipulação de DOM com javascript durante um carnaval sem carnaval. A ideia é não usar nenhuma solução externa nem usar backend, tudo é feito no navegador, localmente.

Não existe um roadmap específico, mas existem coisas quero acrescentar no código aos poucos.

Pode ser usado [aqui](https://rezendecomz.github.io/positor/)

---

## TODO:

- Fazer um layout bonito sem libs externas
- Scroll lateral no resultado
- Opção de collapse nas seções
- Alt + Seta para cima/baixo para mudar a coluna de lugar (assim como no VsCode)
- Alt + Shift + Seta para cima/baixo para duplicar (assim como no VsCode)
- Trocar a ordem arrastando
- Trocar alert() por outras coisas
- Poder escolher encoding do download do resultado
- Juntar querySelector repetidos em consts
- Campo de número inteiro, e casas decimais. Caso exista é número. (ex json: numero {inteiros: 4, decimais: 2}). Se tiver string em 'valor' e não for vírgula ou ponto, os campos ficam cinzas
- Configuração padrão opcional para fillers (texto e números)
- O input html de número não aceita value e placeholder ao mesmo tempo. Então observar se o campo estiver vazio para colocar placehold e remover quando tiver alguma coisa
- onclick nos campos do resultado dão foco ao valor do campo
- mouseOver nos campos do resultado mostram também características de cada campo
- Ferramenta para Bater leiaute
- Gerar header/footer opcionalmente
- Adicionar separador opcional, com opção de descontar no tamanho do filler (Ex: Teste           ;OutraCoisa           ;). Teria que reduzir o tamanho (slice(0, tamanho - {tamanho do separador})) baseado no tamanho do separador
- Separadores opcionais para header/footer
- Campo opcional de tamanho esperado na linha, informando se bateu ou não o número
- Botao para replicar filler em tudo
- Opcão, se reconhecer números já adicionar zeros (provavelmente daria para reconhecer convertendo pra número e separando vírgulas, e em seguinda batendo pra ver se continua com o mesmo comprimento) / Reconhecendo que é número, já sugerir o lado do filler
- Ler automaticamente posicional!

---

## Changelog:

| Versão | Funcionalidades   |
| -------| ----------------- |
| 1.3    | Importar arquivo de layout e limpeza no código.|
| 1.2    | Botão 'Duplicar' e 'Limpar Campos'. Ao clicar no index, pode mudar de posição digitando. Novas validações e alertas. Opção de quebrar linhas no JSON. Resultado com contraste entre as colunas.|
| 1.1    | Funcionalidade de baixar Resultado e JSON. Botões de mover coluna de lugar.|
| 1.0    | Criador de layout, gerador de linha posicional, importador e exportador.|

---
## License

[MIT](https://opensource.org/licenses/MIT)