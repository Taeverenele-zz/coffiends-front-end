import react, {useState} from "react"

const NewAdminCafe = ({addCafe}) => {
    const [cafe, setCafe] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        addCafe(cafe)
        setCafe("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Cafe Name:</label>
            <input type="text" value={cafe} required onChange={(e) => setCafe(e.target.value)} />
            <input type="submit" value="add cafe" />
        </form>
    )
}





export default NewAdminCafe