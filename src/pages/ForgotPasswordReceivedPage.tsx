import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserForgotPasswordCredentials } from '../network/websites_api';
import { Button, Card, Container, Form } from 'react-bootstrap';
import styles from "../styles/navbar.module.css";

type FormInputs = UserForgotPasswordCredentials;

const ForgotPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Your submission logic
    } catch (error) {
      console.error('Failed to reset password', error);
    }
  };

  return (
    <Container>
      <Card className={styles.formCard}>
        <Card.Body>
          <Card.Title>Forgot Password</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPasswordPage;
