//definindo prompt-sync para leitura do teclado
const prompt = require("prompt-sync")();


// função que recebe o array de matérias, lê informações de uma matéria e adiciona ao array 
function cadastrarMateria(listaMaterias) {
    console.log("\nPara cadastrar a nova matéria, digite as informações solicitadas abaixo\n");

    let nome = prompt("Digite o nome da matéria: ");
    let nota1 = +prompt("Digite a primeira nota: ");
    let nota2 = +prompt("Digite a segunda nota: ");
    let nota3 = +prompt("Digite a terceira nota: ");
    let numeroDeFaltas = +prompt("Digite o número de faltas: ");

    // as informações lidas são usadas para criar um objeto materia
    let materia = {
                    "nome": nome,
                    "notas": [nota1, nota2, nota3],
                    "numeroDeFaltas": numeroDeFaltas
    };

    listaMaterias.push(materia);
    console.log(`\nA Matéria de ${materia.nome} adicionada com sucesso!\n`);
    return;
}

//função que cadastra um determinado numero de matérias, no mínimo 3
function menuCadastrarMaterias(listaMaterias){
    console.log("\nCADASTRO DE MATÉRIAS");
    console.log("(Cadastre no minímo 3 matérias)");

    for(let i = 0; i < 3; i++){
        cadastrarMateria(listaMaterias);
    }

    console.log("Caso deseje cadastrar mais matérias, digite 1."); //É só um placebo kkkk
    console.log("Caso tenha cadastrado todas as matérias, digite 0 para concluir o cadastro."); //0 = SAIR

    let op = +prompt(">> ");

    while(op != 0){
        cadastrarMateria(listaMaterias);

        console.log("Digite 1 para cadastrar uma nova matéria ou digite 0 para concluir o cadastro");
        op = +prompt(">> ");
    }
}

function main(){
    var nome = prompt("Digite o nome do aluno: ");

    var listaMaterias = [];
    menuCadastrarMaterias(listaMaterias);

    console.log(nome);
    console.log(listaMaterias);
}

main();
