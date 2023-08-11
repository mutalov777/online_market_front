import './loader.scss'
function Loader() {
    return (
        <div className={'loader'}>
            <div className={'center'}>
                <div className="ring"></div>
                <span>loading...</span>
            </div>
        </div>
    )
}

export default Loader;