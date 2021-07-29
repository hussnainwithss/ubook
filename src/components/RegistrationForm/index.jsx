import React from 'react';
import { Form as FormBS, Spinner } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CheckBoxField, TextField, RadioGroup } from 'elements/Form';
import { RegistrationFormDiv } from 'components/RegistrationForm/style';

const RegistrationForm = () => {
  const today = new Date().toDateString();
  const GENDER_OPTIONS = ['Male', 'Female', 'Others'];
  const initialValues = {
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    gender: '',
    birthday: '',
  };
  const handleSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    console.log(JSON.stringify(values, null, 2));
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    confirm_password: Yup.string()
      .required('Required')
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Password & Confirm Password Must be same'
        ),
      }),
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    birthday: Yup.date().max(today).required('Required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female', 'Others'])
      .required('Required'),
  });
  return (
    <RegistrationFormDiv>
      <h3>Register Now</h3>
      <hr />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            {console.log(values)}
            <FormBS.Row>
              <TextField
                name='first_name'
                type='text'
                placeholder='First Name'
                className='col mb-0'
                errorClassName='text-danger'
                label='First Name'
              />
              <TextField
                name='last_name'
                type='text'
                placeholder='Last Name'
                className='col mb-0'
                errorClassName='text-danger'
                label='Last Name'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='email'
                type='email'
                placeholder='Email Address'
                className='col mb-0'
                errorClassName='text-danger'
                label='Email'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='password'
                type='password'
                placeholder='Password'
                className='col mb-0'
                errorClassName='text-danger'
                label='Password'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
                className='col mb-0'
                errorClassName='text-danger'
                label='Confirm Password'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='birthday'
                type='date'
                className='col mb-0'
                errorClassName='text-danger'
                label='Birthday'
              />
            </FormBS.Row>

            <RadioGroup
              name='gender'
              label='Gender'
              options={GENDER_OPTIONS}
              className='mb-0'
            />
          </Form>
        )}
      </Formik>
    </RegistrationFormDiv>
  );
};

export default RegistrationForm;
