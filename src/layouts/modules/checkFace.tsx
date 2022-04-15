import { WithFaceExpressions, FaceDetection, FaceExpressions } from 'face-api.js';
const ua = window.navigator.userAgent.toLowerCase();
const mq = window.matchMedia('(max-width: 768px)');
const sp = mq.matches ? true : false;
const getLayout = (): void => {
    sp;
};
if (ua.indexOf('msie') !== -1 || ua.indexOf('trident') !== -1) {
    console.log('error');
} else {
    mq.addEventListener('change', getLayout.bind(this));
}
export const checkFace = async (
    detectionsWithExpressions: WithFaceExpressions<{
        detection: FaceDetection;
        expressions: FaceExpressions;
    }>[],
    decorationImg: HTMLImageElement,
    text: HTMLDivElement
) => {
    detectionsWithExpressions.map((detectionsWithExpression) => {
        const Array = Object.entries(detectionsWithExpression.expressions);
        const scoresArray = Array.map((i) => i[1]);
        const expressionsArray = Array.map((i) => i[0]);
        const max = Math.max.apply(null, scoresArray);
        const index = scoresArray.findIndex((score) => score === max);
        const expression = expressionsArray[index];
        if (!sp) {
            decorationImg.src = `/face-api/img/${expression}.png`;
        } else {
            decorationImg.src = `/face-api/img/${expression}-sp.png`;
        }

        if (expression == 'happy') {
            text.innerHTML = '良い笑顔です';
        } else if (expression == 'neutral') {
            text.innerHTML = '真顔ですね';
        } else if (expression == 'sad') {
            text.innerHTML = '元気出して';
        } else if (expression == 'angry') {
            text.innerHTML = '怒りです';
        } else if (expression == 'fearful') {
            text.innerHTML = '恐いな...';
        } else if (expression == 'disgusted') {
            text.innerHTML = 'うんざりだよ';
        } else if (expression == 'surprised') {
            text.innerHTML = '心臓飛び出た';
        } else {
            alert('表情を読み込めませんでした。ごめんなさい！');
        }
    });
};
