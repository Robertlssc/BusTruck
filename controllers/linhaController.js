import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import express from "express";

export const getLinhas = (request, response) => {
  const sql = `SELECT * FROM linhas`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar linhas" });
      return;
    }
    const linhas = data;
    response.status(200).json(linhas);
  });
};

export const postLinha = (request, response) => {
  const { nome, numero, itinerario } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!numero) {
    response.status(400).json({ message: "O numero é obrigatório" });
    return;
  }
  if (!itinerario) {
    response.status(400).json({ message: "O itinerário é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
    SELECT * FROM linhas
    WHERE ?? = ? AND
    ?? = ? AND
    ?? = ?
    `;
  const checkSqlData = [
    "nome",
    nome,
    "numero",
    numero,
    "itinerario",
    itinerario,
  ];

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as linhas" });
      return console.log(err);
    }

    if (data.length > 0) {
      response
        .status(409)
        .json({ message: "Linha já cadastrada na aplicação" });
      return console.log(err);
    }

    const id = uuidv4();

    const insertSql = /*sql*/ ` 
      INSERT INTO linhas(??, ??, ??, ??) VALUES (?, ?, ?, ?);
    `;

    const insertData = [
      "id",
      "nome",
      "numero",
      "itinerario",
      id,
      nome,
      numero,
      itinerario,
    ];

    conn.query(insertSql, insertData, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastra o livro" });
        return console.log(err);
      }
      response.status(201).json({ message: "Linha cadastra" });
    });
  });
};

export const buscarLinha = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `
  SELECT * FROM linhas
  WHERE ?? = ?
  `;
  const insertData = ["id", id];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar linha" });
      return console.log(err);
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Linha não encontrada" });
      return;
    }
    response.status(200).json(data);
  });
};

export const editarLinha = (request, response) => {
  const { id } = request.params;
  const { nome, numero, itinerario } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!numero) {
    response.status(400).json({ message: "O numero é obrigatório" });
    return;
  }
  if (!itinerario) {
    response.status(400).json({ message: "O itinerário é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
  SELECT * FROM linhas
  WHERE ?? = ?
  `;
  const insertData = ["id", id];
  conn.query(checkSql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar linha" });
      return;
    }
    if (data.length === 0) {
      return response.status(404).json({ message: "Linha não encontrada " });
    }

    const updateSql = /*sql*/ `UPDATE linhas SET 
    ?? = ?, ?? = ?, ?? = ?  WHERE ?? = ?
    `;
    const checkSqlData = [
      "nome",
      nome,
      "numero",
      numero,
      "itinerario",
      itinerario,
      "id",
      id,
    ];

    conn.query(updateSql, checkSqlData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Erro ao utilizar atualizada" });
        return;
      }
      response.status(200).json({ message: "linha atualizada"})
    });
  });
};
