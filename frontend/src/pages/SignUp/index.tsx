import React from "react";
import { Button, Typography } from "antd";
import { useFormik, FormikErrors } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Account } from "types";
import { isEmail, isEmpty, isMinLength, isEqual } from "validators";
import {
  EMAIL_MAX_LENGTH,
  INPUT_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "constants/common";
import FormInput from "components/FormInput";
import { signup } from "requests";
import { useWorkspaceActions } from "@redux";
import { SignupWrapper, LinksWrapper, ChangeFormLink } from "./styles";

const { Link } = Typography;

type PasswordErrors = {
  length?: string;
};

function SignUp() {
  const { t } = useTranslation("signup");
  const { setUser } = useWorkspaceActions();
  const navigate = useNavigate();

  const onSubmit = async (form: Account) => {
    const user = await signup({
      lastName: form.lastName,
      firstName: form.firstName,
      company: form.company,
      email: form.email,
      password: form.password,
    });
    setUser(user);
    localStorage.setItem("token", user._id);
    navigate("/");
  };

  const { errors, touched, handleSubmit, getFieldProps } = useFormik<Account>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company: "",
      confirm: "",
    },
    enableReinitialize: true,
    validate: ({ firstName, lastName, email, password, company, confirm }) => {
      const errors: FormikErrors<Account> = {};

      if (isEmpty(firstName)) errors.firstName = t("firstNamePrompt");
      if (isEmpty(lastName)) errors.lastName = t("lastNamePrompt");
      if (isEmpty(company)) errors.company = t("companyPrompt");
      if (isEmpty(email)) {
        errors.email = t("emailPrompt");
      } else if (!isEmail(email)) {
        errors.email = t("invalidEmail");
      }

      if (isEmpty(password)) {
        errors.password = t("passwordPrompt");
      } else {
        const passwordErrors: PasswordErrors = {};
        if (!isMinLength(password, PASSWORD_MIN_LENGTH))
          passwordErrors.length = t("invalidPasswordLength");

        if (Object.keys(passwordErrors).length) {
          errors.password = t("invalidPassword", {
            ...passwordErrors,
            joinArrays: "",
          });
        }
      }

      if (isEmpty(confirm)) {
        errors.confirm = t("confirmPrompt");
      } else if (!isEqual(password, confirm)) {
        errors.confirm = t("invalidConfirm");
      }

      return errors;
    },
    onSubmit,
  });

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <SignupWrapper>
      <div>
        <form onSubmit={handleSubmit}>
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
          <FormInput
            password
            size="large"
            maxLength={PASSWORD_MAX_LENGTH}
            placeholder={t("password")}
            touched={touched.password}
            error={errors.password}
            {...getFieldProps("password")}
          />
          <FormInput
            password
            size="large"
            maxLength={PASSWORD_MAX_LENGTH}
            placeholder={t("confirm")}
            touched={touched.confirm}
            error={errors.confirm}
            {...getFieldProps("confirm")}
          />
          <Button type="primary" htmlType="submit" size="large" block>
            {t("signUp")}
          </Button>
        </form>
        <LinksWrapper>
          <ChangeFormLink>
            {`${t("alreadyHaveAnAccount")} `}
            <Link onClick={handleSignIn}>{t("signIn")}</Link>
          </ChangeFormLink>
        </LinksWrapper>
      </div>
    </SignupWrapper>
  );
}

export default SignUp;
