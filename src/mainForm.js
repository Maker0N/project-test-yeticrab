import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addNewItemAC } from './redux/taskReducer'
import mainStyle from "./styles/main.module.scss";

const { main, normLink } = mainStyle;

const MainForm = () => {
  const { list } = useSelector(s => s.taskReducer)
  const dispatch = useDispatch()
  let numberItem
    list.length === 0
      ? (numberItem = 1)
      : (numberItem = list[list.length - 1].id + 1);

  const [formState, setFormState] = useState({
    id: numberItem,
    date: Date(),
    clientName: "",
    carrierName: "",
    phone: "",
    comment: "",
    ati: "",
  });

  const { date, clientName, carrierName, phone, comment, ati } = formState;

  function changeInput(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    // const { date, clientName, carrierName, phone, comment, ati } = formState;
    const item = {
      id: numberItem,
      date,
      clientName,
      carrierName,
      phone,
      comment,
      ati,
    };
    dispatch(addNewItemAC(item));
  }

  return (
    <div className={main}>
      <div style={{marginBottom: "30px"}}>Внесите данные</div>
      <div>
        <div>
          Номер заявки:
           {numberItem}
        </div>
        <div>
          Дата и время получения заявки:
          {formState.date}
        </div>
        <div>
          Название фирмы клиента
          <input
            type="text"
            name="clientName"
            value={clientName}
            onChange={changeInput}
          />
        </div>
        <div>
          ФИО перевозчика
          <input
            type="text"
            name="carrierName"
            value={carrierName}
            onChange={changeInput}
          />
        </div>
        <div>
          Контактный телефон перевозчика
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={changeInput}
          />
        </div>
        <div>
          Комментарии
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={changeInput}
          />
        </div>
        <div>
          ATI код сети перевозчика
          <input type="text" name="ati" value={ati} onChange={changeInput} />
        </div>
        <button onClick={submitForm}>
          <Link to="/" className={normLink}>
            Добавить
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MainForm;
