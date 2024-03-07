import { FormEvent, h } from "preact";
import { useState } from "preact/hooks";

const accountId = "0F6C0D110F9650117A749D354C576F84";
const secretkey = "236E26A8C039E2B55E7A52456226505C";

const SHARPSPRING_API_BASE_URL =
  `https://api.sharpspring.com/pubapi/v1.2?accountID=${accountId}&secretKey=${secretkey}`;

export interface Input {
  name: string;
  type: "text" | "select" | "email" | "telefone" | "textarea";
  placeHolder: string;
  options?: string[];
  required?: boolean;
}
interface FormData<T = Record<string, unknown>> {
  [key: string]: T;
}
export interface Props {
  inputs: Input[];
}

interface ChangeEvent<T = Element> extends Event {
  target: EventTarget & T;
}

const Form = ({ inputs }: Props) => {
  const [formData, setFormData] = useState<FormData>(() =>
    initializeFormData(inputs)
  );
  const [errors, setErrors] = useState<string[]>([]);

  function initializeFormData(inputs: Input[]) {
    const body = {};
    inputs.forEach((field) => {
      body[field.name] = "";
    });
    return body;
  }

  function handleInputChange(fieldName: string, value: string) {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  }

  function checkRequiredFields(inputs: Input[], formData: FormData) {
    return inputs.filter((field) => field.required && !formData[field.name]);
  }

  function setErrorsIfMissing(
    missingFields: Input[],
    setErrors: VoidFunction,
    submitForm: VoidFunction,
  ) {
    if (missingFields.length > 0) {
      setErrors(
        missingFields.map((field) => `${field.name} é obrigatório`),
      );
    } else {
      setErrors([]);
      submitForm();
    }
  }

  async function submitForm() {
    try {
      const response = await fetch(`/proxy?url=${SHARPSPRING_API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar lead no SharpSpring");
      }
    } catch (error) {
      console.error("Erro ao criar lead no SharpSpring:", error);
    }
  }

  const useInputToRender = (
    field: Input,
    formData: FormData,
    handleInputChange: (fieldName: string, value: string) => void,
  ) => {
    const hasError = errors.some((error) => error.includes(field.placeHolder));

    switch (field.type) {
      case "select":
        return (
          <select
            class={`row-start-1 col-start-1 outline-none p-1.5 w-full max-w-md rounded-md border border-solid ${
              hasError ? "border-red-500" : "border-primary"
            }`}
            id={field.name}
            value={formData[field.name]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleInputChange(field.name, e.target.value);
            }}
          >
            <option>{field.placeHolder}</option>
            {field?.options?.map((option: string) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            class={`b-0 appearance-none outline-none p-1.5 w-full max-h-60 max-w-md rounded-md border border-solid ${
              hasError ? "border-red-500" : "border-primary"
            }`}
            id={field.name}
            value={formData[field.name]}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              handleInputChange(field.name, e.target.value);
            }}
            placeholder={field.placeHolder}
          >
          </textarea>
        );
      case "email":
        return (
          <input
            class={`b-0 appearance-none outline-none p-1.5 w-full max-w-md rounded-md border border-solid ${
              hasError ? "border-red-500" : "border-primary"
            }`}
            type="email"
            value={formData[field.name]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputChange(field.name, e.target.value);
            }}
            autoComplete="email"
            id={field.name}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder={field.placeHolder}
          />
        );
      default:
        return (
          <input
            class={`b-0 appearance-none outline-none p-1.5 w-full max-w-md rounded-md border border-solid ${
              hasError ? "border-red-500" : "border-primary"
            }`}
            type={field.type}
            id={field.name}
            value={formData[field.name]}
            placeholder={field.placeHolder}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputChange(field.name, e.target.value);
            }}
            autoComplete="on"
          />
        );
    }
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const missingFields = checkRequiredFields(inputs, formData);
    if (missingFields.length > 0) {
      setErrorsIfMissing(missingFields, setErrors, submitForm);
      return;
    } else {
      submitForm();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      class="flex justify-center flex-col gap-3 w-full"
    >
      {inputs?.map((field) => (
        <div key={field.name} class="relative flex justify-center">
          {useInputToRender(field, formData, handleInputChange)}
        </div>
      ))}
      <div>
        {errors.map((error) => <p class="text-red-500 text-center">{error}</p>)}
      </div>
      <button
        class="bg-primary text-white rounded-md font-bold max-w-md w-full m-auto p-1.5"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
