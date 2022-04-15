import React from 'react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import BaseImage from '../common/BaseImage';

const Loading: React.VFC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const happyImgRef = useRef<HTMLDivElement>(null);
    const neutralImgRef = useRef<HTMLDivElement>(null);
    const sadImgRef = useRef<HTMLDivElement>(null);
    const angryImgRef = useRef<HTMLDivElement>(null);
    const fearfulImgRef = useRef<HTMLDivElement>(null);
    const disgustedImgRef = useRef<HTMLDivElement>(null);
    const surprisedImgRef = useRef<HTMLDivElement>(null);
    const textsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const animate = (): void => {
        const tl = gsap.timeline({
            defaults: {
                ease: 'power1.inOut',
            },
        });
        tl.to(happyImgRef.current, {
            className: 'loading__img loading__img-happy is-active',
        });
        tl.to(
            neutralImgRef.current,
            {
                className: 'loading__img loading__img-neutral is-active',
            },
            '<'
        );
        tl.to(sadImgRef.current, {
            className: 'loading__img loading__img-sad is-active',
        });
        tl.to(
            angryImgRef.current,
            {
                className: 'loading__img loading__img-angry is-active',
            },
            '<'
        );
        tl.to(fearfulImgRef.current, {
            className: 'loading__img loading__img-fearful is-active',
        });
        tl.to(
            disgustedImgRef.current,
            {
                className: 'loading__img loading__img-disgusted is-active',
            },
            '<'
        );
        tl.to(surprisedImgRef.current, {
            className: 'loading__img loading__img-surprised is-active',
        });
        tl.to(textsRef.current, {
            opacity: 1,
            y: 0,
        });
        tl.to(buttonRef.current, {
            opacity: 1,
            y: 0,
        });
        tl.play();
    };
    const hidden = (): void => {
        gsap.to(wrapperRef.current, {
            autoAlpha: 0,
        });
    };
    useEffect(() => {
        animate();
    }, []);
    return (
        <section className="loading" ref={wrapperRef}>
            <div className="loading__img loading__img-happy" ref={happyImgRef}>
                <BaseImage img={'happy-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__img loading__img-neutral" ref={neutralImgRef}>
                <BaseImage img={'neutral-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__img loading__img-sad" ref={sadImgRef}>
                <BaseImage img={'sad-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__img loading__img-angry" ref={angryImgRef}>
                <BaseImage img={'angry-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__img loading__img-fearful" ref={fearfulImgRef}>
                <BaseImage img={'fearful-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__img loading__img-disgusted" ref={disgustedImgRef}>
                <BaseImage img={'disgusted-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__img loading__img-surprised" ref={surprisedImgRef}>
                <BaseImage img={'surprised-human.png'} role={'none'} width={384} height={400}></BaseImage>
            </div>
            <div className="loading__inner">
                <div className="loading__texts" ref={textsRef}>
                    <h1 className="loading__title">表情測定ツール</h1>
                    <p className="loading__text">
                        <span className="loading__text--big">注意事項</span>
                        ・このサイトはWebカメラが必須となります。
                        <br />
                        ・表情をニュートラル・喜び・悲しみ・怒り・恐れ・
                        <br className="pc-only" />
                        うんざり・驚きの7つに分類します。
                        <br />
                        ・顔が近すぎる、マスクをしていると正常に
                        <br className="pc-only" />
                        測定されない場合があります。
                        <br />
                        ・Chrome、Safari推奨です。
                    </p>
                </div>
                <button className="loading__button" onClick={hidden} ref={buttonRef}>
                    <span className="loading__button--text">測定に進む</span>
                </button>
            </div>
        </section>
    );
};

export default Loading;
