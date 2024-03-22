const { createApp } = Vue;

createApp({
    data() {
        return {
            display: '0', // valor exibido no painel da calculadora
            numeroAtual: null, 
            numeroAnterior: null, 
            operador: null 
        };
    },
    methods: {
        lidarBotao(botao) {
            switch (botao) {
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao); // Chama a função lidarOperador quando um operador é pressionado
                    break;
                case ".":
                    this.lidarDecimal(); // lida com os números decimais 
                    break;
                case "=":
                    this.lidarIgual(); // Chama o resultado final,quando clicado no  botão de igual
                    break;
                case "AC":
                    this.lidarClear(); // AC quando é para apagar tudo o que foi feito
                    break;
                default:
                    this.lidarNumero(botao); 
            }
        },
        lidarOperador(operador) {
            this.numeroAnterior = parseFloat(this.display); // Salva o número exibido como o número anterior
            this.display = '0'; // Limpa 
            this.operador = operador; //  operador atual
        },
        lidarDecimal() {
            if (!this.display.includes('.')) {
                this.display += '.'; // Adiciona um ponto decimal ao número, caso ainda não haja um
            }
        },
        lidarIgual() {
            const numeroAtual = parseFloat(this.display); // Converte o número exibido em um número de ponto flutuante
            let resultado;
            let expressao = ''; // mostra a expressão que foi feita no topo

            if (this.numeroAnterior !== null) {
                expressao += this.numeroAnterior;
                if (this.operador) {
                    expressao += ` ${this.operador}`;
                }
                expressao += ` ${this.display}`;
            }

            // Calcula o resultado com base no operador selecionado
            switch (this.operador) {
                case "+":
                    resultado = this.numeroAnterior + numeroAtual;
                    break;
                case "-":
                    resultado = this.numeroAnterior - numeroAtual;
                    break;
                case "*":
                    resultado = this.numeroAnterior * numeroAtual;
                    break;
                case "/":
                    resultado = this.numeroAnterior / numeroAtual;
                    break;
                default:
                    resultado = numeroAtual; 
                    break;
            }

            // Exibe a expressão e o resultado no painel
            this.display = expressao + ' = ' + resultado;
            this.operador = null; // Limpa  após o cálculo
            this.numeroAnterior = null; // Limpa o número anterior após o cálculo
        },
        lidarClear() {
            //funções para limpar tudo 
            this.display = '0'; 
            this.numeroAtual = null; 
            this.numeroAnterior = null; 
            this.operador = null;
        },
        lidarNumero(numero) {
            if (this.display === '0' || this.display === '-0') {
                this.display = numero; // Se o painel de exibição for 0, substitui pelo número escolhido
            } else {
                this.display += numero; // Adiciona o número escolhido 
            }
        }
    }
}).mount("#app");
