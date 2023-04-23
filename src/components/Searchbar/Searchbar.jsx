import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarEl, SearchForm } from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';


const schema = yup.object().shape({
    value: yup.string().required(),
});

const Searchbar = ({onSubmit}) => {
    const handleSubmit = (values, {resetForm}) => {
        const value = values.value.trim();
        
        onSubmit(value);
        resetForm();
    };


   return (
        <SearchbarEl>
            <Formik 
                initialValues={{value: ''}} 
                validationSchema={schema}
                onSubmit={handleSubmit}>
                <SearchForm autoComplete="off" autoFocus>
                    <button type="submit" aria-label="Search">
                        <FaSearch/>
                    </button>
        
                    <Field
                        type="text" 
                        name="value"
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </Formik>
        </SearchbarEl>
   )
}

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
