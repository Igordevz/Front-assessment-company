"use client";
import { useState } from "react";
import "./index.css";
import axios from "axios";
import { BASEAPI } from "@/services/api";
export default function Feedback() {
  const [res, setRes] = useState("");

  const [range, setRange] = useState(0);
  const [range2, setRange2] = useState(0);

  async function PostFeedback() {
    await axios.post(`${BASEAPI}/chart`, {
        range: range,
        pergunta: "1"
    }).then((data) => {
        setRes("Obrigado pelo seu feedback")
    }) .catch(err =>{
        console.log(err);
    })
  }
  async function PostFeedback2() {
    await axios.post(`${BASEAPI}/chart`, {
        range: range2,
        pergunta: "2"
    }).then((data) => {
        setRes("Obrigado pelo seu feedback")
    }) .catch(err =>{
        console.log(err);
    })
  }
  return (
    <main>
      <div className="container-top">
        <h1>Deixe Seu Feedback</h1>
        <p>Der a sua Avaliação de 0 à 10</p>
      </div>
      <div className="container-form">
        <form>
          <label htmlFor="atendimento">
           <strong>Pergunta 1: </strong> Qual nota você daria pelo nosso atendimento?
          </label>
          <input
            type="range"
            id="atendimento"
            onChange={(e: any) => {
                setRange(e.target.value)
            }}
            min={0}
            max={10}
            value={range}
          />
          <button onClick={(e) => {

            e.preventDefault();
            PostFeedback();
          }}>Enviar</button>
          <h2 style={{display: "flex", alignItems: "center"}}>Estrelas: {range} <strong style={{fontSize: 15, marginLeft: 10, color: "#dedede"}}>{res}</strong></h2>
        </form>
        <form>
          <label htmlFor="atendimento">
           <strong>Pergunta 2: </strong> O quanto você ficou satisfeito com a sua compra?
          </label>
          <input
            type="range"
            id="atendimento"
            onChange={(e: any) => {
                setRange2(e.target.value)
            }}
            min={0}
            max={10}
            value={range2}
          />
          <button onClick={(e) => {

            e.preventDefault();
            PostFeedback2();
          }}>Enviar</button>
          <h2 style={{display: "flex", alignItems: "center"}}>Estrelas: {range2} <strong style={{fontSize: 15, marginLeft: 10, color: "#dedede"}}>{res}</strong></h2>
        </form>
      </div>
    </main>
  );
}
