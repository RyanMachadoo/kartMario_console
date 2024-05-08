//jogador n°1
const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};
//jogador n°2
const player2 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0
};


(async function main(){
    console.log(`🚨🏁 A corrida entre ${player1.nome} e ${player2.nome} está começando...`)
    await playMotorEngine(player1,player2)
    await playerWinner(player1,player2)
})();
//sorteio do tipo de round
async function getRandomBlock(){
    let random = Math.random();
    let result 
    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;
        case random < 0.66:
            result = 'CURVA'
            break; 
        default:
            result = 'CONFRONTO'
            break;
    };
    return result;
}

async function resultLog(character,type,dice,atributte){
    console.log(`O jogador 🚗 ${character} iniciou a rodada de: ${type}. O resultado do do dado é: ${dice} + seu atributo no valor de: ${atributte} é = ${dice + atributte}. `)
}
async function playerWinner(character1,character2){
    console.log('Resultado do jogo !!!')
    console.log(`${character1.nome} fez: ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome} fez: ${character2.pontos} ponto(s)`);
    if(character1.pontos > character2.pontos){
        console.log(`\nParabens o ${character1.nome} VENCEU !!! 🥇`);
    }
    else if(character2.pontos > character1.pontos){
        console.log(`\nParabens o ${character2.nome} VENCEU !!! 🥇`);
    }else{
        console.log('A corrida terminou em empate !!!');
    }
 
}

async function playMotorEngine(character1, character2){
    
    for (let round = 1; round < 5; round++) {
        console.log(`🏁 ${round}° Rodada `)
        // sorteio do tipo de rodada
        let block = await getRandomBlock();
        console.log(`Essa rodada é de: ${block}`);
        let resultDice1 = await rollDice();
        let resultDice2 = await rollDice();
        //acumulo rollDice() + habilidades
        let totalResults1 = 0
        let totalResults2 = 0
        let powerResult1 = 0
        let powerResult2 = 0
        //condições
        if(block === 'RETA'){
            totalResults1 = resultDice1 + character1.velocidade
            totalResults2 = resultDice2 + character2.velocidade
            await resultLog(character1.nome,'Velocidade',resultDice1,character1.velocidade);
            await resultLog(character2.nome,'Velocidade',resultDice2,character2.velocidade);
        }
        if(block === 'CURVA'){
            totalResults1 = resultDice1 + character1.manobrabilidade
            totalResults2 = resultDice2 + character2.manobrabilidade     
            await resultLog(character1.nome,'Manobrabilidade',resultDice1,character1.manobrabilidade)
            await resultLog(character2.nome,'Manobrabilidade',resultDice2,character2.manobrabilidade)
        }
        if(block === 'CONFRONTO'){
            powerResult1 = resultDice1 + character1.poder
            powerResult2 = resultDice2 + character2.poder
            await resultLog(character1.nome,'Poder',resultDice1,character1.poder)
            await resultLog(character2.nome,'Poder',resultDice2,character2.poder)   
        }
        if(totalResults1 > totalResults2){
            console.log(`O ${character1.nome}, ganho 1 ponto.`)
            character1.pontos++;
        }
        else if(totalResults2 > totalResults1){
           
            console.log(`O ${character2.nome}, ganho 1 ponto.`)
            character2.pontos++;
        }
        if(powerResult1 > powerResult2 && character2.pontos > 0){
            console.log(`O ${character2.nome},perdeu 1 ponto.`)
            
            character2.pontos--;
            
        }
        if(powerResult2 > powerResult1 && character1.pontos > 0){
            console.log(`O ${character1.nome}, perdeu 1 ponto.`)
            character1.pontos--;
        }
        if(powerResult1 == powerResult2 && totalResults1 == totalResults2){
            console.log('Confronto empatado, ninguem venceu essa rodada 🚨')
        }
        console.log('______________________________________________')
    }; 

        
    };
  
async function rollDice(){
    return Math.floor(Math.random()*6 ) +1
};

