import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsArrowRepeat } from 'react-icons/bs';
import './LoaderButton.css';

interface LoaderButtonProps {
	isLoading: boolean;
	className?: string;
	disabled: boolean;
	[props: string]: unknown;
}

const LoaderButton = ({
	isLoading,
	className = '',
	disabled = false,
	...props
}: LoaderButtonProps) => {
	return (
		<Button
			disabled={disabled || isLoading}
			className={`LoaderButton ${className}`}
			{...props}
		>
			{isLoading && <BsArrowRepeat className="spinning" />}
			{props.children}
		</Button>
	);
};

export default LoaderButton;
