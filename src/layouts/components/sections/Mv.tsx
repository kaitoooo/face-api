import React from 'react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import gsap from 'gsap';
import { checkFace } from '../../modules/checkFace';
import Modal from '../../modules/modal';
import BasePicture from '../common/BasePicture';

const Mv: React.VFC = () => {
    const webcamRef = useRef<Webcam>(null);
    const decorationImgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const filterImgRef = useRef<HTMLDivElement>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const loadModels = async () => {
        const MODEL_URL = './models';
        await Promise.all([faceapi.nets.tinyFaceDetector.load(MODEL_URL), faceapi.nets.faceExpressionNet.load(MODEL_URL)]);
    };
    const animate = (): void => {
        gsap.to(filterImgRef.current, {
            opacity: 0,
        });
    };
    const faceDetectHandler = async () => {
        animate();
        setShowModal(true);
        await loadModels();
        if (webcamRef.current && decorationImgRef.current) {
            const video = webcamRef.current.video;
            const detectionsWithExpressions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            checkFace(detectionsWithExpressions, decorationImgRef.current, textRef.current);
            const imageSrc = webcamRef.current?.getScreenshot();
            if (imageSrc) {
                setUrl(imageSrc);
            }
        }
    };
    const deleteImg = (): void => {
        decorationImgRef.current.src = '';
        textRef.current.innerHTML = '';
    };
    return (
        <section className="mv">
            <div className="mv__inner">
                <Modal showFlag={showModal} setShowModal={setShowModal} />
                {!url && (
                    <>
                        <div className="mv__video-area">
                            <div className="mv__video">
                                <Webcam audio={false} ref={webcamRef} />
                            </div>
                            <div className="mv__filter-img" ref={filterImgRef}>
                                <BasePicture pcImg={'filter.png'} spImg={'filter-sp.png'} role={'none'} width={32} height={32}></BasePicture>
                            </div>
                        </div>

                        <button className="mv__button-photo" onClick={faceDetectHandler}>
                            <span className="mv__button-photo--text">表情測定</span>
                        </button>
                    </>
                )}
                <div className="mv__img-area">
                    <div className="mv__decoration-img">
                        <img ref={decorationImgRef} alt="" role="none" />
                    </div>
                    {url && (
                        <>
                            <div className="mv__screenshot">
                                <img src={url} alt="Screenshot" />
                            </div>
                            <button
                                className="mv__button-delete"
                                onClick={() => {
                                    setUrl(null);
                                    setShowModal(false);
                                    deleteImg();
                                }}
                            >
                                <span className="mv__button-delete--text">再測定</span>
                            </button>
                        </>
                    )}
                    <p className="mv__comment" ref={textRef}></p>
                </div>
            </div>
        </section>
    );
};
export default Mv;
