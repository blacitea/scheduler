import { useState } from "react";

const useVisualMode = (defaultVal) => {
	const [mode, setMode] = useState(defaultVal);
	const [history, setHistory] = useState([defaultVal]);
	const transition = (newMode) => {
		setMode(newMode);
		setHistory([...history, newMode]);
	};
	const back = () => {
		if (history.length <= 1) return;
		const lastMode = history.length - 2;
		setMode(history[lastMode]);
		setHistory(history.slice(0, -1));
	};
	return { mode, transition, back };
};

export default useVisualMode;
