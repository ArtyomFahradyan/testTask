import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { FormikErrors, useFormik } from "formik";
import { useSelector } from "react-redux";
import { useWorkspaceActions, WorkspaceSelectors } from "@redux";
import { EMAIL_MAX_LENGTH, INPUT_MAX_LENGTH } from "constants/common";
import { User } from "types";
import { isEmail, isEmpty } from "validators";
import { updateUser } from "requests";
import FormInput from "components/FormInput";
import { ProfileWrapper } from "./styles";

const { Paragraph } = Typography;

function Profile() {
  const { t } = useTranslation("signup");
  const user = useSelector(WorkspaceSelectors.getUser);
  const { setUser } = useWorkspaceActions();

  const onSubmit = async (values: User) => {
    const updatedUser = await updateUser({ ...values, _id: user?._id });
    setUser(updatedUser);
    resetForm();
  };

  const { errors, touched, handleSubmit, getFieldProps, resetForm } =
    useFormik<User>({
      initialValues: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        company: user?.company || "",
      },
      enableReinitialize: true,
      validate: ({ firstName, lastName, email, company }) => {
        const errors: FormikErrors<User> = {};

        if (isEmpty(firstName)) errors.firstName = t("firstNamePrompt");
        if (isEmpty(lastName)) errors.lastName = t("lastNamePrompt");
        if (isEmpty(company)) errors.company = t("companyPrompt");
        if (isEmpty(email)) {
          errors.email = t("emailPrompt");
        } else if (!isEmail(email)) {
          errors.email = t("invalidEmail");
        }

        return errors;
      },
      onSubmit,
    });

  return (
    <ProfileWrapper>
      <form onSubmit={handleSubmit}>
        <Paragraph>{t("youCanEditYourProfile")}</Paragraph>
        <FormInput
          size="large"
          maxLength={INPUT_MAX_LENGTH}
          placeholder={t("firstName")}
          touched={touched.firstName}
          error={errors.firstName}
          {...getFieldProps("firstName")}
        />
        <FormInput
          size="large"
          maxLength={INPUT_MAX_LENGTH}
          placeholder={t("lastName")}
          touched={touched.lastName}
          error={errors.lastName}
          {...getFieldProps("lastName")}
        />
        <FormInput
          size="large"
          maxLength={EMAIL_MAX_LENGTH}
          placeholder={t("email")}
          touched={touched.email}
          error={errors.email}
          {...getFieldProps("email")}
        />
        <FormInput
          size="large"
          maxLength={INPUT_MAX_LENGTH}
          placeholder={t("company")}
          touched={touched.company}
          error={errors.company}
          {...getFieldProps("company")}
        />
        <Button type="primary" htmlType="submit" size="large" block>
          {t("updateProfile")}
        </Button>
      </form>
    </ProfileWrapper>
  );
}

export default Profile;
