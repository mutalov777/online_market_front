import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import './component/nav/nav.css';
import './component/footer/footer.scss';
import './component/navbar/menu.scss';
import './component/product/productsCategory.scss';
import './component/product/product.scss';
import './component/feedback/feedback.scss';
import './component/cart/cart.scss';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import './i18n'
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./component/loader/Loader";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Suspense fallback={<Loader/>}>
        <Provider store={store}>
            <Router>
                <ToastContainer/>
                <App/>
            </Router>
        </Provider>
    </Suspense>
);

