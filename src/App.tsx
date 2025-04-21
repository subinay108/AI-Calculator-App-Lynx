import { useCallback, useEffect, useState } from '@lynx-js/react'

import './App.css'
import Button from './ui/Button.jsx'

export function App() {
  const [calculatorInput, setcalculatorInput] = useState<string>('');
  const [calculatorOutput, setcalculatorOutput] = useState<string>('');
  const [memory, setmemory] = useState<number>(0);
  const [isMR, setisMR] = useState<boolean>(false);
  const [debug, setdebug] = useState<string>('');
  const operatorString = '+-/*()';

  const calculate = (input: string):string => {
    try{
      const output = eval(validateExpression(input));
      return String(output);
    }
    catch(Error){
      return "Error";
    }
  };

  const validateExpression = (exp: string):string => {
    // if there is an operator in the last then remove it
    if(operatorString.includes(exp[exp.length-1])){
      exp = exp.slice(0, -1);
    }

    return exp;
  }

  const containOperators = (expression: string):boolean => {
    for(const operator of operatorString){
      if(expression.includes(operator)){
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if(calculatorInput !== ''){
      const a = calculate(calculatorInput);
      setcalculatorOutput(a);
    }else{
      setcalculatorOutput('');
    }
    
  }, [calculatorInput])

  return (
    <view>
      <view className='App'>
        {/* Give margin for top status bar */}
        <view style={{height: '28px'}}></view>

        {/* Input section */}
        <view className='Input'>
          <text 
            className='calculator-input' 
            style={{fontSize: (calculatorInput.length <= 11)? '4rem': '3rem'}}>
            {calculatorInput}
          </text>
        </view>

        {/* Output Section */}
        <view className='Output'>
          <text>{containOperators(calculatorInput) && calculatorOutput}</text>
        </view>


        {/* Buttons */}
        <view className='button-container'>
          <Button className='button' text='mc' 
            bindtap={()=> {
              setmemory(0);
              setisMR(false);
            }} />
          <Button className='button' text='m+' 
            bindtap={()=> {
              if(calculatorOutput === '' || calculatorOutput === 'Error'){
                return;
              }

              if(isMR === false){
                setisMR(true);
              }
              setmemory(memory + parseFloat(calculatorOutput));
            }} />
          <Button className='button' text='m-' 
            bindtap={()=> {
              if(calculatorOutput === '' || calculatorOutput === 'Error'){
                return;
              }

              if(isMR === false){
                setisMR(true);
              }
              setmemory(memory - parseFloat(calculatorOutput));
            }}/>
          <Button className='button' text='mr' bindtap={()=> {setcalculatorInput(calculatorInput + memory.toString())}} />
          <Button className='button' text='AC' bindtap={()=>{setcalculatorInput('')}} />
          <Button 
            className='button' 
            text='<-' 
            bindtap={()=> 
              {
                if(calculatorInput.length != 0){
                  setcalculatorInput(calculatorInput.slice(0, -1))
                }
              }
            } 
          />
          <Button className='button' text='+/-' bindtap={()=> {}} />
          <Button className='button' text='/' bindtap={()=> {setcalculatorInput(calculatorInput + '/')}} />
          <Button className='button' text='7' bindtap={()=> {setcalculatorInput(calculatorInput + '7')}} />
          <Button className='button' text='8' bindtap={()=> {setcalculatorInput(calculatorInput + '8')}}/>
          <Button className='button' text='9' bindtap={()=> {setcalculatorInput(calculatorInput + '9')}}/>
          <Button className='button' text='x' bindtap={()=> {setcalculatorInput(calculatorInput + '*')}}/>
          <Button className='button' text='4' bindtap={()=> {setcalculatorInput(calculatorInput + '4')}}/>
          <Button className='button' text='5' bindtap={()=> {setcalculatorInput(calculatorInput + '5')}}/>
          <Button className='button' text='6' bindtap={()=> {setcalculatorInput(calculatorInput + '6')}}/>
          <Button className='button' text='-' bindtap={()=> {setcalculatorInput(calculatorInput + '-')}}/>
          <Button className='button' text='1' bindtap={()=> {setcalculatorInput(calculatorInput + '1')}}/>
          <Button className='button' text='2' bindtap={()=> {setcalculatorInput(calculatorInput + '2')}}/>
          <Button className='button' text='3' bindtap={()=> {setcalculatorInput(calculatorInput + '3')}}/>
          <Button className='button' text='+' bindtap={()=> {setcalculatorInput(calculatorInput + '+')}}/>
          <Button className='button' text='%' bindtap={()=> {setcalculatorInput(calculatorInput + '%')}}/>
          <Button className='button' text='0' bindtap={()=> {setcalculatorInput(calculatorInput + '0')}}/>
          <Button className='button' text='.' bindtap={()=> {setcalculatorInput(calculatorInput + '.')}}/>
          <Button className='button' text='=' 
            bindtap={()=> {

              if(calculatorOutput !== 'Error'){
                setcalculatorInput(calculatorOutput);
              }
            }}/>

        </view>


        <view style={{ flex: 1}}>
          {/* debug text */}
          <text>{debug}</text>
        </view>
      </view>
    </view>
  )
}
