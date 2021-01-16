import React from 'react';
import MainPageForm from './MainPageForm';
import { useCustomFormAndValidation } from '../hooks/useCustomForm';
import * as auth from '../utils/auth.js'
import { useHistory } from "react-router-dom";


function Register(props) {

    const history = useHistory();
    const { values, handleChange, errors, isValid, resetForm } = useCustomFormAndValidation();

    function handleSubmit(event) {
        event.preventDefault();      
        auth.register(values)
            .then((res) => {
                if (res) {                    
                    props.onTooltipOpen();
                    props.message('Вы успешно зарегистрировались!');
                    props.type('positive');
                    history.push('/sign-in'); 
                }
                else {
                    props.message('Что-то пошло не так! Попробуйте ещё раз.');
                    props.type('negative');
                    props.onTooltipOpen();
                }
            });
        resetForm();
    }

    return (
        <div className="content">
            <MainPageForm
                className={'register'}
                title="Регистрация"
                btnText="Зарегистрироваться"
                onSubmit={handleSubmit}
                isDisabled={isValid}
                text="Уже зарегистрированы?"
                linkText='Войти'
            >
                <>
                    <input
                        type="email"
                        id="email"
                        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                        name="email"
                        value={values.email || ''}
                        placeholder="Email"
                        onChange={handleChange}
                        className="form-auth__input form-auth__input_type_email"
                        required
                        minLength="2"
                        maxLength="70" />
                    <span id="email-input-error" className="form-auth__input-error">{errors.email || ''}</span>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        onChange={handleChange}
                        placeholder="Пароль"
                        className="form-auth__input form-auth__input_type_password"
                        value={values.password || ""}
                        required
                        minLength="5"
                        maxLength="20" />
                    <span id="password-input-error" className="form-auth__input-error">{errors.password || ''}</span>
                </>
            </MainPageForm>

        </div>
    )
}

export default Register;