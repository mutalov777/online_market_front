import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getCategory} from "../../store/features/Category";

function ProductCategory() {
    const categories = useAppSelector(({category: {categories}}) => categories)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getCategory())
    }, [])
    return (
        <div className={'row col-md-10 offset-1 categories'}>
            <div className={'products-header'}>
                <h1>
                    {t("name")}
                </h1>

            </div>
            <div className="products-category">
                {(categories && true && categories.length !== 0) ?
                    categories
                        .map(item =>
                            <Link to={'/' + item.name} className="category-card" key={item.id}>
                                <div className="category-image">
                                    <img src={item.photo} alt=""/>
                                </div>
                                <div className={'category-description'}>
                                    <div className="category-name">{t( item.name)}</div>
                                    <button type="button">{t("see all")}</button>
                                </div>
                            </Link>
                        ) :
                    <div>
                        Category is not available yet
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductCategory;