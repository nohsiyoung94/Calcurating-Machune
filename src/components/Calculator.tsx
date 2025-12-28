import { useState } from "react";
import CalculatorButton from "./CalculatorButton";
import { initialData, performCalculation } from "../utils/calculatorUtils";

export default function Calculator() {
  const [calculatorState, setcalculatorState] = useState<CalculatorState>({
    currentNumber: "0", // 현재 입력 표시되는 숫자
    previousNumber: "", // 이전에 입력된 숫자
    operation: null, // 현재 선택된 연산자 ("+", "-", "*", "/")
    isNewNumber: true, // 새로운 숫자 입력 여부
  });

  // C 클릭했을때 실행되는 함수
  const handleClear = () => {
    setcalculatorState(initialData);
  };

  // +, -, *, / 클릭했을때 실행되는 함수
  const handleOperator = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    console.log(e.currentTarget.value);
    const operator = e.currentTarget.value;
    setcalculatorState((calculatorState) => {
      if (calculatorState.currentNumber === "" && operator)
        return calculatorState;
      const current = parseFloat(calculatorState.currentNumber);

      if (calculatorState.previousNumber && calculatorState.operation) {
        const prev = parseFloat(calculatorState.previousNumber);
        const result = performCalculation(
          prev,
          current,
          calculatorState.operation
        );
        return operator === "="
          ? {
              currentNumber: result.toString(),
              previousNumber: "",
              operation: null,
              isNewNumber: true,
            }
          : {
              currentNumber: "",
              previousNumber: result.toString(),
              operation: operator,
              isNewNumber: true,
            };
      } else if (operator === "=") {
        return {
          ...calculatorState,
          isNewNumber: true,
        };
      } else {
        return {
          currentNumber: "",
          previousNumber: current.toString(),
          operation: operator,
          isNewNumber: true,
        };
      }
    });
  };

  // 0-9까지 클릭했을때 실행되는 함수
  const handleNumber = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const value = e.currentTarget.value; // 문자열
    setcalculatorState((calculatorState) => ({
      ...calculatorState,
      currentNumber: calculatorState.isNewNumber
        ? value
        : calculatorState.currentNumber + value,
      isNewNumber: false,
    }));
  };

  // 소수점을 클릭했을때 실행되는 함수
  const handleDot = () => {
    setcalculatorState((calculatorState) => {
      if (calculatorState.currentNumber.includes(".")) return calculatorState;
      return {
        ...calculatorState,
        currentNumber: calculatorState.currentNumber + ".",
        isNewNumber: false,
      };
    });
    console.log(e.currentTarget.value);
  };

  const buttonConfigs: ButtonConfig[] = [
    { value: "C", className: "calc-claer", onClick: handleClear },
    { value: "/", className: "calc-operator", onClick: handleOperator },
    { value: "1", className: "calc-number", onClick: handleNumber },
    { value: "2", className: "calc-number", onClick: handleNumber },
    { value: "3", className: "calc-number", onClick: handleNumber },
    { value: "*", className: "calc-operator", onClick: handleOperator },
    { value: "4", className: "calc-number", onClick: handleNumber },
    { value: "5", className: "calc-number", onClick: handleNumber },
    { value: "6", className: "calc-number", onClick: handleNumber },
    { value: "+", className: "calc-operator", onClick: handleOperator },
    { value: "7", className: "calc-number", onClick: handleNumber },
    { value: "8", className: "calc-number", onClick: handleNumber },
    { value: "9", className: "calc-number", onClick: handleNumber },
    { value: "-", className: "calc-operator", onClick: handleOperator },
    { value: ".", className: "calc-dot", onClick: handleDot },
    { value: "0", className: "calc-number", onClick: handleNumber },
    { value: "=", className: "calc-result", onClick: handleOperator },
  ];
  return (
    <>
      <div className="bg-[#1f1f1f] flex justify-center items-center h-screen">
        <article className=" w-282px border border-[#333] bg-[#ccc] p-1 ">
          <form
            className="grid grid-cols-[repeat(4,65px)]
             grid-rows-[repeat(65px)] gap-2"
            name="froms"
          >
            <input
              type="text"
              className="calc-input"
              name="output"
              readOnly
              value={calculatorState.currentNumber}
            />
            {buttonConfigs.map((button) => (
              <CalculatorButton key={button.value} {...button} />
            ))}
          </form>
        </article>
      </div>
    </>
  );
}
