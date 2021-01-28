import react, {useState} from "react"

const NewAdminCoffee = ({addCoffee}) => {
    const [coffee, setCoffee] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        addCoffee(coffee)
        setCoffee("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Coffee Name:</label>
            <input type="text" value={coffee} required onChange={(e) => setCoffee(e.target.value)} />
            <input type="submit" value="add coffee" />
        </form>
    )
}





export default NewAdminCoffee