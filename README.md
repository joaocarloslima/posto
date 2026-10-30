# Posto

O posto atende uma fila bem misturada: carros, moto, bicicleta, carro elétrico, carro híbrido, patinete elétrico, gerador e cortador de grama. Alguns usam a bomba de combustível, outros usam o carregador, um deles usa os dois e um não usa nenhum.

A tela já está pronta: é um pequeno jogo em 3D. Você clica em um cliente da fila, escolhe **Abastecer** ou **Recarregar**, e ele vai até a bomba ou o carregador. Só que, por enquanto, o posto não sabe atender ninguém. Todo mundo volta para a fila com um ✖ e a mensagem "Ainda não sei abastecer...".

Seu trabalho é ensinar o posto a atender cada cliente.

---

## Como rodar

1. Abra o projeto na sua IDE.
2. Rode a classe `PostoApplication` (ou `./mvnw spring-boot:run` no terminal).
3. Acesse http://localhost:8080.

A tela carrega o three.js da internet, então precisa de conexão.

---

## O que já está pronto

Você **não precisa mexer** em nada dentro de `controller`, `templates` e `static`.

No pacote `model` já existem as classes que representam os clientes.:

Cada classe concreta já tem seus atributos e o construtor. Quem tem tanque já tem `capacidadeTanque` e `tanque`, e quem tem bateria já tem `capacidadeBateria` e `bateria`. O que falta é o **comportamento**.

A classe `Posto` guarda a fila e tem 4 métodos marcados com `TODO`.

---

## O que você deve fazer

### 1. Criar as interfaces

Crie duas interfaces no pacote `model`:

* `Abastecivel` com os métodos `encherTanque()` que retorna um double e `getPercentualTanque()` que retorna um int.
* `Recarregavel` com os métodos `carregarBateria()` que retorna um double e `getPercentualBateria()` que retorna um int.

### 2. Implementar nas classes certas

Decida quais classes implementam cada interface. Pense no mundo real:

| Cliente | Como funciona |
| --- | --- |
| Carro e Moto | motor a gasolina |
| Bicicleta | só pedal |
| Carro elétrico e patinete elétrico | bateria |
| Carro híbrido | gasolina **e** bateria |
| Gerador e cortador de grama | motor a gasolina, mas não são veículos |

Exemplo de como o tanque deve se comportar: um carro com 50 litros de capacidade e 10 no tanque recebe 40 litros em `encherTanque()` e passa a ter 100% em `getPercentualTanque()`.

### 3. Completar os TODOs da classe Posto

| Método | O que deve fazer |
| --- | --- |
| `abastecer(Long id)` | Se o cliente tiver tanque, enche e devolve `"Gol 1.0 abastecido com 40,0 litros"`. Se não tiver, devolve `"Caloi Elite não usa a bomba de combustível"`. |
| `recarregar(Long id)` | Mesma ideia para a bateria: `"BYD Dolphin recarregado com 45,0 kWh"` ou `"Gol 1.0 não usa o carregador"`. |
| `percentualTanque(Cliente cliente)` | Devolve o percentual do tanque, ou `null` se o cliente não tiver tanque. |
| `percentualBateria(Cliente cliente)` | Devolve o percentual da bateria, ou `null` se o cliente não tiver bateria. |

A tela usa os dois últimos para desenhar as barras ⛽ e 🔌 em cima de cada cliente. Enquanto eles devolverem `null`, as barras não aparecem.

**Regra importante:** o `Posto` não pode perguntar *quem* é o cliente (`instanceof Carro`, `instanceof Moto`...). Ele deve perguntar o que o cliente *sabe fazer*.

---

## Como saber se terminou

- Todos os clientes com tanque ou bateria mostram as barras na tela.
- Cada um que vai até o lugar certo volta com ✔ e a barra cheia.
- O Corolla Hybrid é atendido na bomba **e** no carregador.
- A Caloi Elite volta com ✖ dos dois lados.
- Se você criar uma classe nova (por exemplo, uma `Van` a diesel), o `Posto` atende ela sem precisar ser alterado.

---

## Para pensar

1. Por que não colocar `encherTanque()` direto em `Veiculo`?
2. O `Gerador` não é um `Veiculo`, mas usa a bomba. Uma classe abstrata resolveria isso?
3. O código de `encherTanque()` ficou igual em várias classes. Isso te incomodou?
