import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { ToastShow } from '../../../utils/toast';
import { getValidationErrors, toastMessageError } from '../../../utils/getvalidationErrors';
import { useProducts } from '../../../hooks/useProducts';

import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';

import { Container, SubmitButton, SubmitButtonText } from './styles';
import { useOrderServices } from '../../../hooks/useOrderServices';
import { format } from 'date-fns';
import { maskDate, maskPrice } from '../../../utils/maskText';
import { dateFormat } from '../../../utils/dateFormat';


interface Product {
  id: number;
  name: string;
  price?: string;
  serie: string;
  manufacturing_date?: Date;
  manufacturer: string;
}

interface RouteParams {
  product?: Product;
}

export function Product() {
  const formRef = useRef<FormHandles>(null);
  const { createdProduct, updatedProduct, deleteProduct  } = useProducts();
  const { orderServices } = useOrderServices();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { product } = params as RouteParams;

  const [createdAt, setCreatedAt] = useState(
    product?.manufacturing_date 
    ? format(new Date(product.manufacturing_date), "dd'/'MM'/'yyyy") 
    : ''
  );
  const [price, setPrice] = useState(product?.price || '');

  async function handleSubmit(data: Product) {    
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Informe o nome do produto').min(6, 'Nome do produto no mínimo 6 caracteres'),
        serie: Yup.string().required('Informe o número de série'),
        manufacturer: Yup.string().required('Informe o fabricante '),
      });

      await schema.validate(data, { abortEarly: false });
      
      if(createdAt) {
        data.manufacturing_date = dateFormat(createdAt);
      }
      data.price = price;
      createdProduct(data);
      goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        const toastMessage = toastMessageError(error);
        ToastShow(toastMessage[0]);
        return;
      }
      ToastShow('Erro ao cadastrar produto, verifique as informações');
    }
  }

  async function handleUpdateProduct(data: Product) {    
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Informe o nome do produto').min(6, 'Nome do produto no mínimo 6 caracteres'),
        serie: Yup.string().required('Informe o número de série'),
        manufacturer: Yup.string().required('Informe o fabricante '),
      });

      await schema.validate(data, { abortEarly: false });
      
      if(product) {
        data.id = product.id;
        updatedProduct(data);        
        goBack();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        const toastMessage = toastMessageError(error);
        ToastShow(toastMessage[0]);
        return;
      }
      ToastShow('Erro ao atualizar produto, verifique as informações');
    }
  }

  async function handleDeleteProduct() {   
    const productLinkedWithOrder = orderServices.find(order => order.product.id === product?.id);

    if(productLinkedWithOrder) {
      ToastShow('Produto vinculado em um chamado, não é possível excluir');
      return;
    }

    try {
      if(product) {
        deleteProduct(product.id);
        goBack();
      }
    } catch (error) {      
      ToastShow('Erro ao excluir produto');
    }
  }

  function handleCreatedAt(text: string) {
    const value = maskDate(text);
    formRef.current?.setFieldValue('created_at', value);
    setCreatedAt(value);
  }

  function handlePrice(text: string) {
    const value = maskPrice(text);
    formRef.current?.setFieldValue('price', value);
    setPrice(value);
  }

  return (
    <>
      <Header title={product ? 'Alterar produto' : 'Cadastrar produto'} goBack/>
      <Container>

        <Form ref={formRef} onSubmit={product?.id ? handleUpdateProduct : handleSubmit} initialData={product ? product : undefined}>
          <Input 
            name="name" 
            placeholder="Nome do produto" 
            label="Nome do produto" 
          />

          <Input 
            name="price" 
            placeholder="Preço do produto" 
            label="Preço do produto"
            keyboardType="numeric"
            value={price}
            onChangeText={text => handlePrice(text)}
          />

          <Input 
            name="serie" 
            placeholder="Nº de série do produto" 
            label="Nº de série do produto" 
          />

          <Input 
            name="manufacturer" 
            placeholder="Fabricante do produto" 
            label="Fabricante do produto" 
          />

          <Input 
            name="manufacturing_date" 
            placeholder="00/00/0000" 
            label="Data de fabricação do produto"
            value={createdAt}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={text => handleCreatedAt(text)}
          />      
        </Form>

        <SubmitButton onPress={() => formRef.current?.submitForm()}>
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>

        {product && (
          <SubmitButton onPress={handleDeleteProduct} style={{ backgroundColor: '#AEAEB3' }}>
            <SubmitButtonText style={{ color: '#fff' }}>Excluir</SubmitButtonText>
          </SubmitButton>
        )}
      </Container>
    </>
  );
};