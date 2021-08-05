import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Form as FormBS, Button } from 'react-bootstrap';
import TextField from 'elements/Form/TextField';
import { CreatePostTextArea } from 'components/CreatePostPrompt/style';

const CreatePostPrompt = () => {
  const initialValues = {
    content: '',
    image: null,
  };
  const validationSchema = Yup.object({
    image: Yup.mixed(),
    content: Yup.string().when('image', {
      is: (val) => (val === null ? true : false),
      then: Yup.string().required('Post Cannot be Empty!'),
    }),
  });
  //   function createPostHandler(e) {
  //     e.preventDefault();
  //     if (!content && !image) {
  //       return;
  //     }
  //     createPost(content, image)
  //       .then((response) => {
  //         setNewPost(response.data);
  //         dispatch(updateUserPosts(response.data));
  //       })
  //       .catch((error) => {
  //         if (error.response) console.log(error.response.data);
  //       });
  //     setContent('');
  //     e.target.image.value = null;
  //   }

  return (
    <Card className='mb-5'>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ setFieldValue, touched, errors }) => (
            <Form>
              <FormBS.Row className='mb-2'>
                <CreatePostTextArea
                  type='text'
                  as='textarea'
                  rows={3}
                  placeholder="What's on your mind....."
                  errorClassName='text-danger'
                  name='content'
                  onChange={(e) => setFieldValue('content', e.target.value)}
                  className={
                    errors.content
                      ? 'w-100 border-2 field-error rounded'
                      : 'w-100 rounded'
                  }
                  haserror={errors.content}
                />
                {touched.content && errors.content ? (
                  <FormBS.Text className='text-danger'>
                    {errors.content}
                  </FormBS.Text>
                ) : null}
              </FormBS.Row>
              <FormBS.Label>Upload Image</FormBS.Label>
              <FormBS.File
                accept='image/*'
                name='image'
                className='mb-3'
                onChange={(e) => setFieldValue('image', e.target.files[0])}
              />
              {touched.image && errors.image ? (
                <FormBS.Text className='text-danger'>
                  {errors.image}
                </FormBS.Text>
              ) : null}
              <Button varriant='primary' type='submit'>
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default CreatePostPrompt;
