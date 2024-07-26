import conn from "../config/conn.js";

const tableLinhas = /*sql*/ `
    CREATE TABLE IF NOT EXISTS linhas(
        id VARCHAR(60) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        numero INT NOT NULL,
        itinerario VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

conn.query(tableLinhas, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [linhas] criada com sucesso!");
});
