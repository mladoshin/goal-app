import React, {useContext} from "react" 
import { FormControl, TextField } from '@material-ui/core'
import FormContext from "../context/formContext"

function AdditionalForm(){
    const form = useContext(FormContext)
    console.log(form)
    return(
        <form style={{paddingTop: 20, display: "flex", flexDirection: "column"}}>
            <FormControl>
                <TextField label="Description" rows={4} variant="outlined" value={form.description} onChange={(e)=>form.setDescription(e.target.value)} multiline style={{minHeight: 100}}/>
            </FormControl>
        </form>
    )
}

export default AdditionalForm;