import TextField from '@mui/material/TextField';
import {Tooltip} from '@mui/material';


const DataRow = ({data, setData}) => {
    const createSetSpec = (key) => (e) => setData({
        ...data,
        [key]: e.target.value,
    })

    const {key, type, value} = data;
    return (<div className={'grid grid-cols-[repeat(3,_1fr)_auto] space-x-3'}>
        <TextField placeholder={'key'} value={key} onChange={createSetSpec('key')} inputProps={{autoComplete:'ue-key', name:'ue-key'}} disabled sx={{"& input.Mui-disabled": {WebkitTextFillColor: '#000', 'cursor': 'no-drop'}}}/>
        <TextField placeholder={'type'} value={type} onChange={createSetSpec('type')} inputProps={{autoComplete:'ue-type', name:'ue-type'}} disabled sx={{"& input.Mui-disabled": {WebkitTextFillColor: '#000', 'cursor': 'no-drop'}}}/>
        <Tooltip title={value} placement={'top'} arrow followCursor>
            <TextField placeholder={'value'} value={value} onChange={createSetSpec('value')} inputProps={{autoComplete:'ue-value', name:'ue-value'}} disabled={['shape', 'uuid'].includes(key)}  sx={{"& input.Mui-disabled": {'cursor': 'no-drop'}}}/>
        </Tooltip>
    </div>);
};

export default DataRow;
