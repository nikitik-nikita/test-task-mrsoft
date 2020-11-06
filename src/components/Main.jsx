import React, { useState, useEffect } from 'react';

const Main = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState('');
  const [checkboxValue, setCheckboxValue] = useState('i');

  const url = 'http://www.mrsoft.by/data.json';

  const inputDataValue = (event) => {
    const inputValue = event.target.value;

    setInputData(inputValue);
    checkboxValue === 'i' ? setInputData(inputValue.toLowerCase()) : setInputData(inputValue.toUpperCase());
  };

  const toggleButtonWordLength = () => {
    if (inputData.length >= 1 && !isNaN(inputData)) {
      const result = data.filter(word => word.length > inputData);

      if (checkboxValue === '') {
        const regExpUpperCase = new RegExp(/([A-Z])\w+/);
        const resultUpperCase = result.filter(item => regExpUpperCase.test(item));

        setData(resultUpperCase);
      } else if ((checkboxValue === 'i')) {
        setData(result);
      }

      alert('Данные приняты');
    } else {
      if (!inputData.length || isNaN(inputData)) {
        alert('Введите число');
      }
    }
  };

  const toggleButtonSubstring = () => {
    if (inputData.length >= 1 && isNaN(inputData)) {
      const regExp = new RegExp(inputData, `${checkboxValue}`);
      const searchResult = data.filter(word => regExp.test(word));

      setData(searchResult);
      alert('Данные приняты');
    } else {
      if (!isNaN(inputData)) {
        alert('Введите буквы');
      }
    }
  };

  const toggleCheckbox = () => {
    checkboxValue === 'i' ? setCheckboxValue('') : setCheckboxValue('i');
    checkboxValue === '' ? setInputData(inputData.toLowerCase()) : setInputData(inputData.toUpperCase());
  };

  useEffect(() => {
    fetch(`https://cors-anywhere.herokuapp.com/${url}`)
      .then(response => response.json())
      .then(data => {
        return setData(data.data);
      })
      .catch(err => {
        err.message;
        return [];
      });
  }, [inputData, checkboxValue]);

  return (
    <div className="container">
      <h1 className="center-align">Тестовое задание</h1>
      <div className="row">
        <div className="col s12">
          <h4>Ввод данных</h4>
          <div className="row">
            <div className="input-field col s6">
              <input id="text-data" type="text" className="validate" onChange={inputDataValue} value={inputData}/>
              <label className="active" htmlFor="text-data">Введите данные</label>
            </div>
            <div className="input-field col s6">
              <label>
                <input type="checkbox" onChange={toggleCheckbox}/>
                <span>Регистр</span>
              </label>
            </div>
          </div>
        </div>
        <div className="col s12">
          <h4>Сортировка данных</h4>
          <div className="row">
            <div className="col">
              <a className="waves-effect waves-light btn" onClick={toggleButtonWordLength}>По длине слова</a>
            </div>
            <div className="col">
              <a className="waves-effect waves-light btn" onClick={toggleButtonSubstring}>По подстроке</a>
            </div>
          </div>
        </div>
        <div className="col s12">
          <h4>Результат</h4>
          <div className="card grey lighten-2">
            <div className="card-content">
              {
                data.map((item) =>
                  <li key={item} className="flow-text">{item}</li>
                )
              }
              {data.length === 0 &&
              <div>
                <p className="flow-text">Результат не найден :(</p>
                <p className="flow-text">Попробуйте еще раз!</p>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Main;
