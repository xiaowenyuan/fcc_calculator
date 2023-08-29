import './App.css';
import React from 'react';

const CalcDisplay = (props) => {
  return (
    <div className="CalcDisplay" id="display">
      <p>{props.display}</p>
    </div>
  )
}

const HistoryDisplay = (props) => {
  return (
    <div className="HistoryDisplay">
      <p>{props.historyDisplay}</p>
    </div>
  )
}

const Numpad = (props) => {
  const numpad_array = [['AC', 'clear'], ['/', 'divide'] , ['x', 'multiply'], ['7', 'seven'], ['8', 'eight'], ['9', 'nine'], ['-', 'subtract'], ['4', 'four'], ['5', 'five'], ['6', 'six'], ['+', 'add'], ['1', 'one'], ['2', 'two'], ['3', 'three'], ['=', 'equals'], ['0', 'zero'], ['.', 'decimal'], ['+/-', 'positive-negative']]
  return(
    <div className="Numpad">
      {numpad_array.map((element) => {
        return(
          <div className="Numpad-element" id={`${element[1]}`} key={`numpad-${element[1]}`} onClick={props.numHandler}>
            {element[0]}
          </div>
        )
      })}
    </div>
  )
}
const Calculator = (props) => {
  return(
    <div className="Calculator">
      <HistoryDisplay historyDisplay={props.historyDisplay} />
      <CalcDisplay display={props.display} key={props.display}/>
      <Numpad numHandler={props.numHandler}/>
    </div>
  )
}
const App = () => {
  const [firstNumber, setFirstNumber] = React.useState('');
  const [secondNumber, setSecondNumber] = React.useState('');
  const [operation, setOperation] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [display, setDisplay] = React.useState('0');
  const [historyDisplay, setHistoryDisplay] = React.useState('');

  const AC = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setDisplay('0');
    setResult(0);
    setHistoryDisplay('');
  }
  const operation_array = ['/', 'x', '-', '+'];

  const do_operation = (operation, firstNumber, secondNumber) => {
    switch(operation){
      case '/':
        return parseFloat(firstNumber) / parseFloat(secondNumber);
        break;
      case 'x':
        return parseFloat(firstNumber) * parseFloat(secondNumber);
        break;
      case '-':
        return parseFloat(firstNumber) - parseFloat(secondNumber);
        break;
      case '+':
        return parseFloat(firstNumber) + parseFloat(secondNumber);
        break;
    }
  }

  const numHandler = (e) => {
    if (!isNaN(parseInt(e.target.innerText))){
      if(!operation && firstNumber===''){
        if(e.target.innerText === '0'){return}
        if(result){
          setResult(0);
          setHistoryDisplay('');
        }
        setFirstNumber(e.target.innerText);
      } else if (!operation && firstNumber!=''){
        let newFirstNumber = firstNumber + e.target.innerText;
        setFirstNumber(newFirstNumber);
      }
      else if (operation && secondNumber===''){
        if (e.target.innerText === '0'){return}
        setSecondNumber(e.target.innerText);
      } else if (operation && secondNumber!=''){
        setSecondNumber(secondNumber + e.target.innerText);
      }
    }
    else if (operation_array.includes(e.target.innerText)){
      if (result){
        setHistoryDisplay(String(result));
        setFirstNumber(String(result));
        setResult(0);
      }
        setOperation(e.target.innerText)
      ;
    }
    else if (e.target.innerText === '.') {
      if(firstNumber==='' && !result && !firstNumber.includes('.')){
        setFirstNumber('0.');
      } else if (firstNumber!='' && !operation && secondNumber==='' && !firstNumber.includes('.')){
        setFirstNumber(firstNumber + '.');
      } else if (operation && secondNumber==='' && !secondNumber.includes('.')){
        setSecondNumber('0.');
      } else if (operation && secondNumber!='' && !secondNumber.includes('.')){
        setSecondNumber(secondNumber + '.');
      }
    }
    else if (e.target.innerText === '+/-'){
      //check if there is no secondNumber
      if (secondNumber === '' && !operation){
        if (!result){
          //check if firstNumber is not an empty string
          if (firstNumber !=''){
            if (parseFloat(firstNumber) > 0){
              setFirstNumber('-' + firstNumber);
            } else if (parseFloat(firstNumber) < 0){
              setFirstNumber(firstNumber.slice(1));
            }
          } else if (firstNumber === '0' || firstNumber === ''){
            setFirstNumber('-');
          } else if (firstNumber ==='-'){
            setFirstNumber('0');
          }
        }
        //if there's already a result then set firstNumber as the result
        else if (result && !operation){
          if (result > 0){
            setFirstNumber('-'.concat(String(result)));
          } else if (result < 0) {
            setFirstNumber(String(result).slice(1));
          } else if (result === 0) {
            setFirstNumber('-');
          }
          setResult(0);
        }
      }
      //check if there is already operation and firstNumber
      if (operation && firstNumber!=''){
        //check if secondNumber is not an empty string
        if (secondNumber != ''){
          if (parseFloat(secondNumber) > 0){
            setSecondNumber('-' + secondNumber);
          } else if (parseFloat(secondNumber) < 0){
            setSecondNumber(secondNumber.slice(1));
          }
        } else if (secondNumber === '0' || secondNumber === ''){
          setSecondNumber('-');
        } else if (secondNumber === '-'){
          setSecondNumber('0');
        }
      }
    }
    else if (e.target.innerText === '='){
      if (firstNumber!='' && secondNumber!='' && operation){
        setResult(do_operation(operation, firstNumber, secondNumber));
      }
    }
    else if (e.target.innerText === 'AC'){
      AC();
    }
  }
  React.useEffect(() => {
    if(firstNumber != ''){
      console.log(`firstNumber is ${firstNumber}`);
      setDisplay(firstNumber);
      setHistoryDisplay(firstNumber);
    }
  }, [firstNumber]);

  React.useEffect(() => {
    if (secondNumber != ''){
      console.log(`secondNumber is ${secondNumber}`);
      setDisplay(secondNumber);
      setHistoryDisplay(firstNumber + operation + secondNumber);
    }
  }, [secondNumber]);

  React.useEffect(() => {
    if (operation!= ''){
      console.log(`operation is ${operation}`);
      setHistoryDisplay(firstNumber + operation)
    }
  }, [operation]);

  React.useEffect(() => {
    if(firstNumber!='' && secondNumber!='' && operation && result){
      console.log(`the result of ${firstNumber} ${operation} ${secondNumber} is ${result}`);
      setDisplay(result);
      setHistoryDisplay(historyDisplay.concat(`= ${result}`))
      setOperation('');
      setFirstNumber('')
      setSecondNumber('');
    }

  }, [result])
  return (
    <div className="App">
      <Calculator display={display} numHandler={numHandler} historyDisplay={historyDisplay}/>
    </div>
  );
}

export default App;
