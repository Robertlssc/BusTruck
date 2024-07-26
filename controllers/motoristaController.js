import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import express, { response } from "express";

export const getMotorista = (request, response) => {
  const sql = `SELECT * FROM motoristas`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar motoristas" });
      return;
    };
    const motoristas = data;
    response.status(200).json(motoristas)
  });
};

export const postMotorista = (request, response) => {
  const { nome, data_nascimento, numero_CNH } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!data_nascimento) {
    response.status(400).json({ message: "A data de nascimento é obrigatório" });
    return;
  }
  if (!numero_CNH) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
  }

  const checkSql = /*sql*/`
    SELECT * FROM motoristas
    WHERE ?? = ? AND
    ?? = ? AND
    ?? = ?
    `;
  const checkSqlData = [
    "nome",
    nome,
    "data_nascimento",
    data_nascimento,
    "numero_CNH",
    numero_CNH
  ];

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as motoristas" });
      return console.log(err);
    }

    if (data.length > 0) {
      response
        .status(409)
        .json({ message: "Motorista já cadastrada na aplicação" });
      return console.log(err);
    }

    const id = uuidv4();
    const insertSql = /*sql*/ `
      INSERT INTO motoristas(??, ??, ??, ??) VALUES (?, ?, ?, ?);
    `;

    const insertData = [
      "id",
      "nome",
      "data_nascimento",
      "numero_CNH",
      id,
      nome,
      data_nascimento,
      numero_CNH,
    ]

    conn.query(insertSql, insertData, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastra o motorista" });
        return console.log(err);
      }
      response.status(201).json({ message: "motorista cadastrado" })
    });
  });
};

export const buscarMotorista = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `
  SELECT * FROM motoristas
  WHERE ?? = ?
  `;
  const insertData = ["id", id];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar motorista" });
      return console.log(err);
    }
    if (data.length === 0) {
      response.status(404).json({ message: "motorista não encontrado" });
      return;
    }
    const motorista = data;
    response.status(200).json(motorista);
  })
}