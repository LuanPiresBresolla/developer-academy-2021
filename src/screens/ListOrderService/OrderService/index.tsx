import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';

import { ToastShow } from '../../../utils/toast';
import { getValidationErrors, toastMessageError } from '../../../utils/getvalidationErrors';
import { maskDate } from '../../../utils/maskText';

import { Container, SubmitButton, SubmitButtonText } from './styles';
import { Select } from '../../../components/Select';
import { format } from 'date-fns';
import { useOrderServices } from '../../../hooks/useOrderServices';
import { dateFormat } from '../../../utils/dateFormat';

interface Product {
  id: number;
  name: string;
  price?: string;
  serie: string;
  manufacturing_date?: Date;
  manufacturer: string;
}

interface SelectProducts {
  label: string;
  value: Product;
}

interface OrderService {
  id: number;
  title: string;
  description: string;
  product: Product;
  created_at: Date;
  finished_at?: Date;
};

interface RouteParams {
  orderService: OrderService | null;
}

export function OrderService() {
  const formRef = useRef<FormHandles>(null);  
  const { goBack } = useNavigation();
  const { createdOrderService, deleteOrderService, updatedOrderService } = useOrderServices();
  const { params } = useRoute();
  const { orderService } = params as RouteParams;

  const [products, setProducts] = useState<SelectProducts[]>([]);
  const [productSelected, setProductSelected] = useState<Product>(orderService?.product || {} as Product);
  const [createdAt, setCreatedAt] = useState(orderService ? format(new Date(orderService?.created_at), "dd'/'MM'/'yyyy") : format(new Date(), "dd'/'MM'/'yyyy"));
  const [finishedAt, setFinishedAt] = useState(orderService?.finished_at ? format(new Date(orderService?.finished_at), "dd'/'MM'/'yyyy") : '');

  useEffect(() => {
    async function loadProducts() {
      const products = await AsyncStorage.getItem('@stock/products');
      
      if(products) {
        const productsParse = JSON.parse(products) as Product[];
        const selectProducts = productsParse.map(product => {
          return {
            label: product.name,
            value: product,
          };
        });
        setProducts(selectProducts);
      }
    }
    loadProducts();
  }, []);
  

  async function handleSubmit(data: OrderService) {   
    data.product = productSelected;        
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Informe o título'),
        description: Yup.string(),
        product: Yup.object().shape({}).required('Informe o produto')
      });

      await schema.validate(data, { abortEarly: false });      

      data.created_at = dateFormat(createdAt);
      createdOrderService(data);
      goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        const toastMessage = toastMessageError(error);
        ToastShow(toastMessage[0]);
        return;
      }
      ToastShow('Erro ao cadastrar chamado, verifique as informações');
    }
  }

  async function handleUpdateProduct(data: OrderService) {
    data.product = productSelected;
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Informe o título'),
        description: Yup.string(),
        product: Yup.object().shape({}).required('Informe o produto')
      });

      await schema.validate(data, { abortEarly: false });
      
      if(orderService) {
        data.id = orderService.id;
        data.created_at = dateFormat(createdAt);
        if(finishedAt) {
          data.finished_at = dateFormat(finishedAt);
        }

        updatedOrderService(data);
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
      ToastShow('Erro ao atualizar chamado, verifique as informações');
    }
  }

  async function handleDeleteProduct() {
    try {      
      if(orderService) {
        deleteOrderService(orderService.id);
        goBack();
      }
    } catch (error) {      
      ToastShow('Erro ao excluir chamado');
    }
  }

  function handleCreatedAt(text: string) {
    const value = maskDate(text);
    formRef.current?.setFieldValue('created_at', value);
    setCreatedAt(value);
  }

  function handleFinishedAt(text: string) {
    const value = maskDate(text);
    formRef.current?.setFieldValue('finished_at', value);
    setFinishedAt(value);
  }

  return (
    <>
      <Header title={orderService ? 'Alterar chamado' : 'Novo chamado'} goBack/>
      <Container>

        <Form ref={formRef} onSubmit={orderService ? handleUpdateProduct : handleSubmit} initialData={orderService ? orderService : undefined}>
          <Input 
            name="title" 
            placeholder="Titulo do chamado" 
            label="Título" 
            editable={!orderService?.finished_at} 
          />

          <Input 
            name="description" 
            placeholder="Descrição do chamado" 
            label="Descrição"
            style={{ height: 80 }}
            multiline
            editable={!orderService?.finished_at}
          />
          
          <Select
            disabled={!orderService?.finished_at}
            label="Selecione o produto"
            items={[ ...products ]} 
            onValueChange={(value) => setProductSelected(value)} 
            value={productSelected}              
          />

          <Input 
            name="created_at" 
            placeholder="00/00/0000" 
            label="Data de inicio"
            value={createdAt}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={text => handleCreatedAt(text)}
            editable={!orderService?.finished_at}
          />

          <Input 
            name="finished_at" 
            placeholder="00/00/0000" 
            label="Data de finalização"
            value={finishedAt}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={text => handleFinishedAt(text)}
            editable={!orderService?.finished_at}
          />         
        </Form>

        {!orderService?.finished_at && (
          <SubmitButton onPress={() => formRef.current?.submitForm()}>
            <SubmitButtonText>Salvar</SubmitButtonText>
          </SubmitButton>
        )}

        {orderService && !orderService?.finished_at && (
          <SubmitButton onPress={handleDeleteProduct} style={{ backgroundColor: '#AEAEB3' }}>
            <SubmitButtonText style={{ color: '#fff' }}>Excluir</SubmitButtonText>
          </SubmitButton>
        )}
      </Container>
    </>
  );
};