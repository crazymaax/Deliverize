import "./styles.scss";

import ReactLoading from 'react-loading';

function Loading() {

    return (
        <div className="loadingContainer">
            <ReactLoading type={"spin"} color={"red"} height={'20%'} width={'20%'} />
        </div>
    )
}

export default Loading;