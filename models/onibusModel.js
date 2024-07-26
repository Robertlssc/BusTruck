import conn from "../config/conn.js";

const tableOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS onibus(
        id VARCHAR(60) PRIMARY KEY NOT NULL,
        placa VARCHAR(255) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        ano_fabricacao YEAR(4) NOT NULL,
        capacidade INT NOT NULL,
        linha_id VARCHAR(255) NOT NULL,
        motorista_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

conn.query(tableOnibus, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [onibus] criada com sucesso!");
});