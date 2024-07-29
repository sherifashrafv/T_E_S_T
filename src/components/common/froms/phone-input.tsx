import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputComponent = ({ ...props }) => {
	return (
		<PhoneInput
			country={props.country || "us"}
			enableSearch
			{...props}
		/>
	);
};

export default PhoneInputComponent;
