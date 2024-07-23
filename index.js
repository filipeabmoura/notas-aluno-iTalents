//definindo prompt-sync para leitura do teclado
const prompt = require("prompt-sync")();

//função que verifica se o aluno está aprovado ou reprovado, considerando média e número de faltas numa matéria
function verificaStatusDeAprovacao(materia){
    if(materia.numeroDeFaltas > 5){
        return "Reprovado por Faltas";
    } else if (materia.mediaFinal < 6) {
        return "Reprovado por Nota";
    } else {
        return "Aprovado!";
    }
}

//função que calcula media final de uma materia
function calculaMediaFinal(nota1, nota2, nota3){
    return (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;
}

// função que recebe o array de matérias, lê informações de uma matéria e adiciona ao array 
function cadastrarMateria(listaMaterias) {
    console.log("\nPara cadastrar a nova matéria, digite as informações solicitadas abaixo\n");

    let materiaCadastrada = false;
    //não pensei numa forma de usar try-catch, visto que NaN não é um erro

    while (!materiaCadastrada){
        var nomeMateria = prompt("Digite o nome da matéria: ");
        var nota1 = +prompt("Digite a primeira nota: ");
        var nota2 = +prompt("Digite a segunda nota: ");
        var nota3 = +prompt("Digite a terceira nota: ");
        var numeroDeFaltas = +prompt("Digite o número de faltas: ");

        // caso as notas ou número de faltas informadas não sejam do tipo númerico, não cadastra
        if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(numeroDeFaltas)){
            console.log(`\nFalha ao cadastrar a matéria de ${nomeMateria}!\nAs 3 notas e o número de faltas devem ser números`);
            console.log("Tente Novamente\n\n");
        } else {
            materiaCadastrada = true; //se tudo estiver correto, cadastra matéria
        }
    }
    
    // calcula media da materia
    let mediaFinal = calculaMediaFinal(nota1, nota2, nota3);

    // as informações lidas são usadas para criar um objeto materia
    let materia = {
                    "nome": nomeMateria,
                    "notas": [nota1, nota2, nota3],
                    "numeroDeFaltas": numeroDeFaltas,
                    "mediaFinal": mediaFinal
    };

    //adiciona nova matéria no array de matérias com a média já calculada
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

    console.log("Caso deseje cadastrar mais matérias, digite 1.");
    console.log("Caso tenha cadastrado todas as matérias, digite 0 para concluir o cadastro."); //0 = SAIR

    let op = +prompt(">> ");

    while(op != 0){
        if(op != 1){
            console.log("Opção Inválida. Tente Novamente.");
        } else {
            cadastrarMateria(listaMaterias);
        }  
        console.log("Digite 1 para cadastrar uma nova matéria ou digite 0 para concluir o cadastro");
        op = +prompt(">> ");
    }
}

function main(){
    var nomeAluno = prompt("Digite o nome do aluno: ");

    // incializa lista de materias
    var listaMaterias = [];
    
    // invoca funcção que cadastra 3 ou mais matérias e as adiciona ao array de matérias
    menuCadastrarMaterias(listaMaterias);

    console.log("\n\n\n\n\n");
    console.log(`Abaixo são listados os resultados do aluno ${nomeAluno}\n`);

    var mediaFinalGeral = 0.0; //CR

    // para cada matéria, verifica se o aluno está aprovado ou reprovado por nota ou faltas
    listaMaterias.forEach(materia => {
        console.log(`Matéria: ${materia.nome}`);
        console.log(`Notas: ${materia.notas[0]} - ${materia.notas[1]} - ${materia.notas[2]}`);
        console.log(`Média Final: ${materia.mediaFinal.toFixed(2)}`);
        console.log(`Número de Faltas: ${materia.numeroDeFaltas}`);
        console.log(`Status: ${verificaStatusDeAprovacao(materia)}\n\n`);

        mediaFinalGeral += materia.mediaFinal;
    });

    console.log(`Média Final Geral (CR): ${(mediaFinalGeral/listaMaterias.length).toFixed(2)}`); //to fixed não está funcionando
}

main();