function countSearch(technogies?: string[], city?: string) {
  if (!technogies && !city) {
    return
  }
  const contagem: Record<string, number> = {}

  for (const elemento of vetor) {
    if (contagem[elemento] === undefined) {
      contagem[elemento] = 1
    } else {
      contagem[elemento]++
    }
  }

  return contagem
}

export { countSearch }

// function contarElementos(vetor: any[]): Record<string, number> {
//     const contagem: Record<string, number> = {};

//     for (const elemento of vetor) {
//         if (contagem[elemento] === undefined) {
//             contagem[elemento] = 1;
//         } else {
//             contagem[elemento]++;
//         }
//     }

//     return contagem;
// }

// // Exemplo de uso:
// const meuVetor = [1, 2, 2, 3, 4, 2, 5, 3];
// const contagem = contarElementos(meuVetor);

// console.log("Contagem de elementos:");
// for (const elemento in contagem) {
//     console.log(`${elemento}: ${contagem[elemento]}`);
// }
