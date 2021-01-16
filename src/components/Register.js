import React from 'react';
import MainPageForm from './MainPageForm';

function Register(props) {

    return (
        <div className="content">
            <MainPageForm
                className={'register'}
                title="Регистрация"
                btnText="Зарегистрироваться"
                onSubmit={props.handleRegister}
                isDisabled={props.isValid}
                text="Уже зарегистрированы?"
                linkText='Войти'
            >
                <>
                    <input
                        type="email"
                        id="email"
                        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                        name="email"
                        value={props.values.email || ''}
                        placeholder="Email"
                        onChange={props.handleChange}
                        className="form-auth__input form-auth__input_type_email"
                        required
                        minLength="2"
                        maxLength="70" />
                    <span id="email-input-error" className="form-auth__input-error">{props.errors.email || ''}</span>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        onChange={props.handleChange}
                        placeholder="Пароль"
                        className="form-auth__input form-auth__input_type_password"
                        value={props.values.password || ""}
                        required
                        minLength="5"
                        maxLength="20" />
                    <span id="password-input-error" className="form-auth__input-error">{props.errors.password || ''}</span>
                </>
            </MainPageForm>

        </div>
    )
}

export default Register;