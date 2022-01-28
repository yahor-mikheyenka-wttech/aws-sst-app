import { useState } from "react";

const useFormFields = (initialState: any) => {
  const [fields, setFields] = useState(initialState);

	const updatedField = (event: { target: { id: any; value: any; }; }) => {
		setFields({
			...fields,
			[event.target.id]: event.target.value
		});
	}

  return [
    fields,
    updatedField
  ];
}

export default useFormFields;