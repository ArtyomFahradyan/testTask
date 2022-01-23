import React from "react";
import { Modal, Button } from "antd";
import { useTranslation } from "react-i18next";
import { FEED_TITLE_MAX_LENGTH, TEXT_AREA_MAX_LENGTH } from "constants/common";
import FormInput from "components/FormInput";
import FormTextArea from "components/FormTextArea";
import { FormikErrors, useFormik } from "formik";
import { isEmpty } from "validators";
import { addFeed } from "requests";
import { useSelector } from "react-redux";
import { useWorkspaceActions, WorkspaceSelectors } from "@redux";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
};
type Feed = {
  title: string;
  content: string;
};

function CreateFeedModal({ isModalVisible, setIsModalVisible }: Props) {
  const { t } = useTranslation("feed");
  const user = useSelector(WorkspaceSelectors.getUser);
  const { addFeed: addFeedAction } = useWorkspaceActions();
  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const onSubmit = async (values: Feed) => {
    const res = await addFeed({ ...values, createdBy: user?._id });
    addFeedAction(res);
    setIsModalVisible(false);
    resetForm();
  };

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    submitForm,
    resetForm,
  } = useFormik<Feed>({
    initialValues: {
      title: "",
      content: "",
    },
    enableReinitialize: true,
    validate: ({ title, content }) => {
      const errors: FormikErrors<Feed> = {};
      if (isEmpty(title)) {
        errors.title = t("titlePrompt");
      }
      if (isEmpty(content)) {
        errors.content = t("contentPrompt");
      }

      return errors;
    },
    onSubmit,
  });

  const handleOk = async () => {
    await submitForm();
  };

  return (
    <Modal
      title={t("newFeed")}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {t("save")}
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          size="large"
          maxLength={FEED_TITLE_MAX_LENGTH}
          placeholder={t("title")}
          touched={touched.title}
          error={errors.title}
          {...getFieldProps("title")}
        />
        <FormTextArea
          size="large"
          autoSize
          maxLength={TEXT_AREA_MAX_LENGTH}
          placeholder={t("content")}
          touched={touched.content}
          error={errors.content}
          {...getFieldProps("content")}
        />
      </form>
    </Modal>
  );
}

export default CreateFeedModal;
