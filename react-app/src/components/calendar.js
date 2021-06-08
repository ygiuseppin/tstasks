import React from 'react';
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";


function Calendar(props){
    
    const changeDataTime = (e) =>{
        props.setDataTime(e)
    }

    return(
        <>
            {
               <DateTimePickerComponent value={props.expires} placeholder="Choose a date and time" name="expires" onChange={changeDataTime} />
            }
        </>
    );
}

export default Calendar;
