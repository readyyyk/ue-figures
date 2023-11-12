import DataForm from '@/DataForm/DataForm.jsx';
import {useRef} from 'react';
import {Button} from '@mui/material';


const prepareData = (data, dots) => {
    if (dots.length < 3) {
        alert('Provide at least 3 points for shape!')
        return false;
    }
    const res = {};
    console.log(data)
    for(let el of data) {
        if (el.key === 'shape') {
            res[el.key] = dots.map((el)=> {
                const m = 50;
                return {
                    x: (el.x - 125) / m,
                    y: (el.y - 125) / m
            }});
            continue;
        }
        if (el.value.trim() === '') {
            alert('All fields must be filled!');
            return false;
        }
        res[el.key] = el.value;
    }
    return JSON.stringify(res);
}

const App = () => {
    const data = useRef(null);
    const handleGetData = () => {
        console.log(prepareData(data.current, JSON.parse(localStorage.dots)));
        fetch(
            'http://localhost:16800/save_flat', {
                method: "POST",
                body: prepareData(data.current, JSON.parse(localStorage.dots))
            }
        )
    }

    return (
        <div className={'min-h-screen w-screen'}>
            <h1 className={'pt-4 text-center text-3xl font-bold'}> Create your own building! </h1>
            <div className={'mx-auto mt-2 w-fit max-w-[94dvw] rounded-xl px-6 py-8 shadow-xl'}>
                <div className={'flex flex-col items-center space-x-0 space-y-8 md:flex-row md:space-x-12 md:space-y-0'}>
                    <DataForm ref={data}/>
                    <canvas id={'cvs'} className={'border-4'} width={250} height={250}></canvas>
                </div>
                <div className={'col-span-2 mt-12 flex justify-center'}>
                    <Button size={'large'} color={'success'} variant={'contained'} onClick={handleGetData} id={'create'}>Create object</Button>
                </div>
            </div>
        </div>
    );
};

export default App;
