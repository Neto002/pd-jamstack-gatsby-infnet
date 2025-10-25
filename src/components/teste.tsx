import * as React from "react";

interface TesteProps {
  nome: string;
}

const Teste: React.FC<TesteProps> = ({ nome }) => {
  return (
    <div>
      <h1>Seja Bem Vindo, {nome}</h1>
    </div>
  );
};

export default Teste;
