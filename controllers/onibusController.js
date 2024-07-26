import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import express, { response } from "express";

export const getOnibus = (request, response) => {
  const sql = `SELECT * FROM onibus`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar onibus" });
      return;
      };
    const onibus = data;
    response.status(200).json(onibus)
  });
};

export const postOnibus = (request, response) => {
  const { placa, modelo, ano_fabricacao, capacidade, linha_id, motorista_id } = request.body;

  if (!placa){
    response.status(400).json({ message: "A placa é obrigatória" });
    return;
  }
  if (!modelo){
    response.status(400).json({ message: "O modelo é obrigatório" });
    return;
  }
  if (!ano_fabricacao){
    response.status(400).json({ message: "O ano de fabricacao é obrigatório" });
    return;
  }
  if (!capacidade) {
    response.status(400).json({ message: "A capacidade é obrigatória" });
    return;
  }
  if (!linha_id) {
    response.status(400).json({ message: "O id da linha é obrigatório" });
    return;
  }
  if (!motorista_id) {
    response.status(400).json({ message: "O id do motorista é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
    SELECT * FROM onibus
    WHERE ?? = ? AND
    ?? = ? AND
    ?? = ? AND
    ?? = ? AND
    ?? = ? AND
    ?? = ?
  `;
  const checkSqlData = [
    "placa",
    placa,
    "modelo",
    modelo,
    "ano_fabricacao",
    ano_fabricacao,
    "capacidade",
    capacidade,
    "linha_id",
    linha_id,
    "motorista_id",
    motorista_id
  ]

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (err) {

      response.status(500).json({ message: `${linha_id}, ${motorista_id}, Erro ao buscar as onibus` });
      return console.log(err);
    }

    if (data.length > 0) {
      response
        .status(409)
        .json({ message: "onibus já cadastrada na aplicação" });
      return console.log(err);
    }
    
    const linha_id_data = /*sql*/ `SELECT * FROM linhas WHERE id = "${linha_id}"`
    const motorista_id_data = /*sql*/ `SELECT * FROM motoristas WHERE id = "${motorista_id}"`

    const id = uuidv4();
    const insertSql = /*sql*/`
    INSERT INTO onibus(??, ??, ??, ??, ??, ??, ??)VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    const insertData = [
      "id",
      "placa",
      "modelo",
      "ano_fabricacao",
      "capacidade",
      "linha_id",
      "motorista_id",
      id,
      placa,
      modelo,
      ano_fabricacao,
      capacidade,
      linha_id_data,
      motorista_id_data
    ]

    conn.query(insertSql, insertData, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastra o onibus" });
        return console.log(err);
      }
      response.status(201).json({ message: "onibus cadastrado" });
    });
  });
};

export const buscarOnibus = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `
  SELECT * FROM onibus
  WHERE ?? = ?
  `;

  const insertData = ["id", id];
  
  conn.query(sql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar onibus" });
      return console.log(err);
    }
    if (data.length === 0) {
      response.status(404).json({ message: "onibus não encontrado" });
      return;
    }
    const onibus = data;
    response.status(200).json(onibus);
  });
};