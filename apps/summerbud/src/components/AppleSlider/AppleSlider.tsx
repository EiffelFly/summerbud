import { createSignal } from "solid-js";
import "./AppleSlider.css";

export const AppleSlider = () => {
	const [sliderValue, setSliderValue] = createSignal(0);
	const [progressTrackColor, setProgressTrackColor] = createSignal("rgba(255, 255, 255, 0.8)");

	const trackColor = "rgba(255, 255, 255, 0.5)";

	return (
		<div>
			<input
				type="range"
				class="apple-slider"
				onInput={(e) => {
					setSliderValue(parseInt(e.target.value));
				}}
				onMouseEnter={() => setProgressTrackColor("rgba(255, 255, 255, 1)")}
				onMouseLeave={() => setProgressTrackColor("rgba(255, 255, 255, 0.8)")}
				value={sliderValue()}
				style={{
					"background-image": `linear-gradient(to right, 
            ${progressTrackColor()} 0%, ${progressTrackColor()} 
            ${sliderValue()}%, ${trackColor}
						${sliderValue()}%, ${trackColor} 100%)`,
				}}
			/>
		</div>
	);
};
