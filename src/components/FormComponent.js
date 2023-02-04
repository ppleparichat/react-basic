import { useState, useEffect } from "react";
import "./FormComponent.css";
import { v4 as uuidv4 } from "uuid";

const FormComponent = (props) => {
  console.log("Render from Component");
  const [title, setList] = useState("");
  const [amount, setAmount] = useState();
  const [formValid,setFormValid] = useState(false)

  const inputTitle = (event) => {
    setList(event.target.value);
  };
  const inputAmount = (event) => {
    setAmount(event.target.value);
  };
  const saveItem = (event) => {
    event.preventDefault();
    const itemData = {
      id: uuidv4(),
      title: title,
      amount: Number(amount),
    };
    props.onAddItem(itemData);
    setList("");
    setAmount(0);
  };

  useEffect(() => {
    const checkData = title.trim().length > 0 && amount !== 0 
        setFormValid(checkData)
    
  },[title,amount]);

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            onChange={inputTitle}
            value={title}
          ></input>
        </div>
        <div className="form-control">
          <label>Amount</label>
          <input
            type="number"
            placeholder=" + , - "
            onChange={inputAmount}
            value={amount}
          ></input>
        </div>
        <div>
          <button type="submit" className="btn" disabled={!formValid}>
            Add Your List
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
