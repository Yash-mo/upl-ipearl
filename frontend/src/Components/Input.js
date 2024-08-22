export default function Input(props){
    const {onChange, placeholder, value, type, isError, hintText , style} = props
  

    return (
        <>
            {
                value ? <input type={type} value={value || ""} placeholder={placeholder} onChange={onChange}/> :  <input type={type} placeholder={placeholder} onChange={onChange} style={style || {width:"100%"}}/>
            }

            {
                isError ? <span style={{
                    marginTop:"35px"
                }} className="text-danger w-100 border-0">{hintText}</span> : ""
            }
        </>
    )
}           