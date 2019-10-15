import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, '6 characters minimum')
    .required('Password is required'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required('incorrect password').oneOf([Yup.ref('password')])
      : field
  ),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Full name" />
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />

        <button type="submit">Create account</button>
        <Link to="/">I already have a login</Link>
      </Form>
    </>
  );
}
