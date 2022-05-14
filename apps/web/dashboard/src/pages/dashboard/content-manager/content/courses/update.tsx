import { Course } from "@prepa-sn/shared/interfaces";
import { Button, Col, Divider, Form, message, Row, Space, Spin, Typography } from "antd";
import Icon from "apps/web/dashboard/src/components/Icon";
import { useFindOneCourseQuery, useUpdateCourseMutation } from "apps/web/dashboard/src/store/features/courses";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateAndUpdate from "./create-update";

const { Title, Text } = Typography;

const UpdateCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneCourseQuery(id as string);

  const [
    updateCourse,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateCourseMutation();



  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        image: data.image ? data.image?.id : null,
        video: data.video ? data.video?.id : null,
        grades: data.grades.map(grade => grade.id),
      });
    }
  }, [data, form]);



  useEffect(() => {
    if (isUpdated) {
      message.success('Le cours a été modifié avec succès');
    }

    if (hasError) {
      message.error('Une erreur est survenue');
    }
  }, [isUpdated, hasError, form]);



  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Course = form.getFieldsValue();
      if (data?.id) {
        updateCourse({
          ...values,
          id: data?.id,
        });
      }
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };


  if (isLoading)
    return (
      <Row justify="center">
        <Spin tip="Loading..." />
      </Row>
    );

  return <div>
    <Row justify="space-between">
      <Col>
        <Title level={4}>Update the entry : {data?.title}</Title>
        <Text>Course ID : {data?.id}</Text>
      </Col>
      <Col>
        <Space>
          <Button
            loading={isUpdating}
            onClick={onFinish}
            type="primary"
            icon={<Icon type="PlusOutlined" />}
          >
            Update the grade
          </Button>
        </Space>
      </Col>
    </Row>
    <Divider />
    <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
  </div>
};

export default UpdateCourse;
