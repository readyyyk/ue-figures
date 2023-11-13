import DataForm from '@/DataForm/DataForm.jsx';
import {useRef} from 'react';
import {Button} from '@mui/material';


const adjustDot = ({x, y}, canvasSize, adjustC) => {
    return {
        x: (x - canvasSize/2) / adjustC,
        y: (y - canvasSize/2) / adjustC,
    }
}

const prepareData = (data, dots) => {
    if (dots.length < Number(import.meta.VITE_MIN_DOTS)) {
        alert('Provide at least 3 points for shape!')
        return null;
    }
    const res = {};
    for(let el of data) {
        if (el.key === 'shape') {
            res['shape'] = dots.map((el) => adjustDot(
                el,
                Number(import.meta.VITE_CANVAS_SIZE),
                Number(import.meta.VITE_ADJUST_SIZE_K),
            ));
            continue;
        }
        if (el.value.trim() === '') {
            alert('All fields must be filled!');
            return null;
        }
        res[el.key] = el.value.trim();
    }
    return JSON.stringify(res);
}

const App = () => {
    const data = useRef(null);
    const handleGetData = () => {
        const dataJSON = prepareData(data.current, JSON.parse(localStorage.dots));
        console.log(dataJSON);
        fetch(import.meta.VITE_SEND_DATA_URL, {method: 'POST', body: dataJSON});
    }

    return (
        <div className={'min-h-screen w-screen'}>
            <h1 className={'pt-4 text-center text-3xl font-bold'}> Create your own building! </h1>
            <div className={'mx-auto mt-2 w-fit max-w-[94dvw] rounded-xl px-6 py-8 shadow-xl'}>
                <div className={'flex flex-col items-center space-x-0 space-y-8 md:flex-row md:space-x-12 md:space-y-0'}>
                    <DataForm ref={data}/>
                    <canvas id={'cvs'} className={'border-4'} width={Number(import.meta.VITE_CANVAS_SIZE)} height={Number(import.meta.VITE_CANVAS_SIZE)}></canvas>
                </div>
                <div className={'col-span-2 mt-12 flex justify-center'}>
                    <Button size={'large'} color={'success'} variant={'contained'} onClick={handleGetData} id={'create'}>Create object</Button>
                </div>
            </div>
        </div>
    );
};

export default App;
