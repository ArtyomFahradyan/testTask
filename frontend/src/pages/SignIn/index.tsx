import React from "react";
import { Button, Typography } from "antd";
import { useFormik, FormikErrors } from "formik";
import { useTranslation } from "react-i18next";
import { isEmail, isEmpty, isMinLength } from "validators";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "constants/common";
import FormInput from "components/FormInput";
import { useNavigate } from "react-router-dom";
import { login } from "requests";
import { useWorkspaceActions } from "@redux";
import { SignupWrapper } from "./styles";
import { ChangeFormLink, LinksWrapper } from "../SignUp/styles";

const { Link } = Typography;

type PasswordErrors = {
  length?: string;
};

type LoginType = {
  email: string;
  password: string;
};

function SignIn() {
  const { t } = useTranslation("signup");
  const navigate = useNavigate();
  const { setUser } = useWorkspaceActions();

  const onSubmit = async (form: LoginType) => {
    const user = await login({
      email: form.email,
      password: form.password,
    });
    setUser(user);
    localStorage.setItem("token", user._id);
    navigate("/");
  };

  const { errors, touched, handleSubmit, getFieldProps } = useFormik<LoginType>(
    {
      initialValues: {
        email: "",
        password: "",
      },
      enableReinitialize: true,
      validate: ({ email, password }) => {
        const errors: FormikErrors<LoginType> = {};
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

        return errors;
      },
      onSubmit,
    }
  );

  return (
    <SignupWrapper>
      <div>
        <form onSubmit={handleSubmit}>
          <FormInput
            size="large"
            maxLength={EMAIL_MAX_LENGTH}
            placeholder={t("email")}
            touched={touched.email}
            error={errors.email}
            {...getFieldProps("email")}
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
          <Button type="primary" htmlType="submit" size="large" block>
            {t("signIn")}
          </Button>
        </form>
        <LinksWrapper>
          <ChangeFormLink>
            {`${t("dontHaveAnAccount")} `}
            <Link onClick={() => navigate("/signup")}>{t("signUp")}</Link>
          </ChangeFormLink>
        </LinksWrapper>
      </div>
    </SignupWrapper>
  );
}

export default SignIn;
