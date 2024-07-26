import conn from "../config/conn.js";

const tableMotorista = /*sql*/ `
    CREATE TABLE IF NOT EXISTS motoristas(
        id VARCHAR(60) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        data_nascimento DATETIME NOT NULL,
        numero_CNH VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

conn.query(tableMotorista, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [motorista] criada com sucesso!");
});
