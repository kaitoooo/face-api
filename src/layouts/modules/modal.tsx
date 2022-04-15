import React from 'react';
import BaseImage from '../components/common/BaseImage';
type Props = {
    showFlag: boolean;
};
const Modal: React.FC<Props> = (props) => {
    return (
        <>
            {props.showFlag ? (
                <div className="modal">
                    <div className="modal__overlay">
                        <div className="modal__loading-img">
                            <BaseImage img={'loading.gif'} role={'none'} width={32} height={32}></BaseImage>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Modal;
