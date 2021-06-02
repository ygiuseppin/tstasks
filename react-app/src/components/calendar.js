import React, {useState} from 'react';
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";


function Calendar(props){
    
    const changeDataTime = (e) =>{
        console.log("entre al event desde changeDataTime")
        props.setDataTime(e)
    }

    return(
        <>
            {
               <DateTimePickerComponent name="dataTime" value={props.expires} placeholder="Choose a date and time" name="expires" onChange={changeDataTime} />
            }
        </>
    );
}

export default Calendar;
