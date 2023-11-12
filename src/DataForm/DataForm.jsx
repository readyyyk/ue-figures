import {forwardRef, useEffect, useState} from 'react';
import DataRow from '@/DataForm/DataRow';
import {
    MenuItem,
    Select,
} from '@mui/material';
import {v4 as uuid} from 'uuid';

import schemas from '@/data/schemas.js';


const schemaToInputs = (schema) => {
    const res = [];
    for (let key in schema) {
        if (key === 'inheritance') {
            res.push(...schemaToInputs(schemas[schema[key]]));
            continue;
        }
        res.push({
            key: key,
            type: schema[key],
            value: '',
        });
        if (key === 'shape')
            res.at(-1).value = '{shape}';
        if (key === 'uuid')
            res.at(-1).value = uuid();
    }
    return res
}

// eslint-disable-next-line react/display-name
const DataForm = forwardRef((_, ref) => {

    const [inputs, setInputs] = useState([]);
    const createSetInput = (key) => (value) => setInputs(prev =>
        prev.map(el => el.key === key ? value : el)
    );

    const [objectType, setObjectType] = useState('Base')
    const handleSelect = (e)=> setObjectType(e.target.value)
    useEffect(()=>{
        setInputs(schemaToInputs(schemas[objectType]));
    }, [objectType])

    useEffect(()=>{
        ref.current = [...inputs, {
            key: 'object_type',
            type: 'string',
            value: objectType
        }];
    }, [inputs, ref]);

    return (<div className={'flex flex-col gap-4'}>
        <Select
            value={objectType}
            label="Object type"
            onChange={handleSelect}
        >
            {Object.keys(schemas).map(el=>
                <MenuItem key={`option-${el}`} value={el}>{el}</MenuItem>
            )}
        </Select>
        {inputs.map(data => {
            return <DataRow key={`data-${data.key}`} data={data} setData={createSetInput(data.key)}/>;
        })}
    </div>);
});

export default DataForm;
