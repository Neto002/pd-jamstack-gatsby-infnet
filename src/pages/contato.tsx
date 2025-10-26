import React from "react";
import { HeadFC } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2ecc71;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2ecc71;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #27ae60;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const validationSchema = Yup.object({
  nome: Yup.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  telefone: Yup.string()
    .matches(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
      "Telefone inválido"
    )
    .required("Telefone é obrigatório"),
  mensagem: Yup.string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .required("Mensagem é obrigatória"),
});

const ContatoPage: React.FC = () => {
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      // Simular envio para um endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Dados enviados:", values);
      alert("Mensagem enviada com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <FormContainer>
        <Title>Entre em Contato</Title>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            telefone: "",
            mensagem: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor="nome">Nome</Label>
                <Input type="text" id="nome" name="nome" />
                <ErrorMessage name="nome" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="telefone">Telefone</Label>
                <Input type="tel" id="telefone" name="telefone" />
                <ErrorMessage name="telefone" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Field name="mensagem">
                  {({ field }: any) => <TextArea id="mensagem" {...field} />}
                </Field>
                <ErrorMessage name="mensagem" component={ErrorText} />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Layout>
  );
};

export default ContatoPage;

export const Head: HeadFC = () => (
  <>
    <title>Contato - AutoStore</title>
    <meta
      name="description"
      content="Entre em contato conosco para mais informações sobre nossos veículos."
    />
  </>
);
