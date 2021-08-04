import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'elements/Form';

const SearchBar = () => {
  const initialValues = {
    search: '',
  };
  const validationSchema = Yup.object({
    search: Yup.string().required('required'),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(isSubmitting, values) => (
        <Form className='d-flex'>
          <TextField
            name='search'
            type='text'
            placeholder='Search UBook'
            errorClassName='text-warning'
            className='mb-0'
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
