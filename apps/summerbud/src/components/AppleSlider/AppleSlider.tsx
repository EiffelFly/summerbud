import { createSignal } from "solid-js";
import "./AppleSlider.css";

export const AppleSlider = () => {
	const [sliderValue, setSliderValue] = createSignal(50);
	const [progressTrackColor, setProgressTrackColor] = createSignal("rgba(255, 255, 255, 0.8)");

	const trackColor = "rgba(255, 255, 255, 0.5)";
	const min = 10;
	const max = 200;

	return (
		<div>
			<input
				type="range"
				class="apple-slider"
				onInput={(e) => {
					setSliderValue(parseInt(e.target.value));
				}}
				onMouseDown={() => setProgressTrackColor("rgba(255, 255, 255, 1)")}
				onMouseUp={() => setProgressTrackColor("rgba(255, 255, 255, 0.8)")}
				onTouchStart={() => setProgressTrackColor("rgba(255, 255, 255, 1)")}
				onTouchEnd={() => setProgressTrackColor("rgba(255, 255, 255, 0.8)")}
				value={sliderValue()}
				style={{
					"background-image": `linear-gradient(to right, 
            ${progressTrackColor()} 0%, ${progressTrackColor()} 
            ${((sliderValue() - min) / (max - min)) * 100}%, ${trackColor}
						${((sliderValue() - min) / (max - min)) * 100}%, ${trackColor} 100%)`,
				}}
				min={min}
				max={max}
			/>
		</div>
	);
};
