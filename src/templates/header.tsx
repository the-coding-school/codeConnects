import * as React from 'react';
import * as ViewModel from 'viewModels/header';
import T from 'components/LocalizedText';

const header =
<div className='container'>
    <div className='jumbotron text-center'>
        <h1><T id='header.title'/></h1>
        <p><T id='header.description' /></p>

        <button onClick={ViewModel.loginHandler} className='btn btn-default'>
            <T id='header.login' />
        </button>
        <button onClick={ViewModel.signupHandler} className='btn btn-default'>
            <T id='header.signup' />
        </button>
    </div>
</div>

export default header;
