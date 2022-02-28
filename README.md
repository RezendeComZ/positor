# Positor 

Uma SPA responsiva que cria e edita arquivos posicionais. Feita em HTML, Javascript e CSS.
Posicional + Editor = Positor (desculpa!)

---

Escrito para melhorar minhas habilidades de manipulação de DOM com javascript durante um carnaval sem carnaval. A ideia é não usar nenhuma solução externa, só javascript puro (isso pode mudar no futuro).

Não existe um roadmap específico, mas existem coisas quero acrescentar no código aos poucos.

---

## TODO:

- Fazer um layout bonito sem libs externas
- Seta pra trocar a ordem
- Abrir/Salvar arquivo de layout (https://stackoverflow.com/questions/13405129/javascript-create-and-save-file)
- Salvar resultado (botao)
- Campo de número inteiro, e casas decimais. Caso exista é número. (ex json: numero {inteiros: 4, decimais: 2}). Se tiver string em 'valor' e não for vírgula ou ponto, os campos ficam cinzas
- Trocar a ordem arrastando
- trocar querySelector por função pra simplificar
- fazer função pra "focus()"
- Configuração padrão opcional para fillers (texto e números)
- O input html de número não aceita value e placeholder ao mesmo tempo. Então observar se o campo estiver vazio para colocar placehold e remover quando tiver alguma coisa
- Ferramenta para Bater leiaute
- Aproveitar nome do campo para gerar header/footer, opcionalmente
- Separadores opcionais para header/footer
- Adicionar separador opcional, com opção de descontar no tamanho do filler (Ex: Teste           ;OutraCoisa           ;). Teria que reduzir o tamanho (slice(0, tamanho - {tamanho do separador})) baseado no tamanho do separador
- Campo opcional de tamanho esperado na linha, informando se bateu ou não o número
- Botao para replicar filler em tudo
- Opcão, se reconhecer números já adicionar zeros (provavelmente daria para reconhecer convertendo pra número e separando vírgulas, e em seguinda batendo pra ver se continua com o mesmo comprimento) / Reconhecendo que é número, já sugerir o lado do filler
- Ler automaticamente posicional!

---

## Changelog:

| Versão | Funcionalidades   |
| -------| ----------------- |
| 1.0    | Criador de layout, gerador de linha posicional, importador e exportador|

---
## License

[MIT](https://opensource.org/licenses/MIT)