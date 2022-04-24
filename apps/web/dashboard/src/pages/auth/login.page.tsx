import { useTranslation } from 'react-i18next';

const Login = () => {

    const { t } = useTranslation();

    return (
        <div>{t('auth.login.loginTitle')}</div>
    )
}

export default Login