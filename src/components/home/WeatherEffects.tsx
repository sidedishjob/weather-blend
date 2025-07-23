"use client";

import { memo } from "react";

export function getWeatherBackgroundClass(weather: string) {
  const weatherLower = weather.toLowerCase();
  if (weatherLower.includes("晴") || weatherLower.includes("sunny"))
    return "weather-sunny";
  if (weatherLower.includes("雨") || weatherLower.includes("rain"))
    return "weather-rainy";
  if (weatherLower.includes("雪") || weatherLower.includes("snow"))
    return "weather-snowy";
  if (weatherLower.includes("曇") || weatherLower.includes("cloud"))
    return "weather-cloudy";
  return "";
}

// --- 晴れエフェクト ---
const SunnyEffects = () => (
  <>
    {/* 太陽の光線 */}
    <div className="sun-rays"></div>
    {/* 暖かい空気の表現 */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 via-orange-200/5 to-red-200/8 pointer-events-none"></div>
    {/* キラキラ効果 */}
    {Array.from({ length: 8 }, (_, i) => (
      <div
        key={`sparkle-${i}`}
        className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse pointer-events-none"
        style={{
          top: `${20 + Math.random() * 60}%`,
          left: `${20 + Math.random() * 60}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))}
  </>
);

// --- 雨エフェクト ---
const RainDrops = () => {
  const drops = Array.from({ length: 80 }, (_, i) => {
    const left = Math.random() * 100;
    const duration = 0.3 + Math.random() * 0.4;
    const delay = Math.random() * 2;

    return (
      <div key={`rain-${i}`}>
        <div
          className="rain-drop"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
        {i % 8 === 0 && (
          <div
            className="rain-splash"
            style={{
              left: `${left}%`,
              animationDuration: `0.3s`,
              animationDelay: `${delay + duration}s`,
            }}
          />
        )}
        {i % 12 === 0 && (
          <div
            className="puddle-ripple"
            style={{
              left: `${left - 1}%`,
              animationDuration: `2s`,
              animationDelay: `${delay + duration + 0.1}s`,
            }}
          />
        )}
      </div>
    );
  });

  return (
    <>
      {drops}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-600/10 pointer-events-none" />
    </>
  );
};

// --- 雪エフェクト ---
const SnowFlakes = () => {
  const flakes = Array.from({ length: 40 }, (_, i) => {
    const size = 3 + Math.random() * 3;
    return (
      <div
        key={`snow-${i}`}
        className="snow-flake"
        style={{
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${4 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      />
    );
  });
  return (
    <>
      {flakes}
      <div className="snow-accumulation" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 via-transparent to-blue-200/15 pointer-events-none" />
    </>
  );
};

// --- 曇りエフェクト ---
const CloudElements = () => {
  const clouds = Array.from({ length: 4 }, (_, i) => (
    <div
      key={`cloud-${i}`}
      className="cloud-element"
      style={{
        width: `${100 + Math.random() * 60}px`,
        height: `${50 + Math.random() * 30}px`,
        top: `${5 + Math.random() * 70}%`,
        animationDuration: `${25 + Math.random() * 15}s`,
        animationDelay: `${Math.random() * 15}s`,
        opacity: 0.3 + Math.random() * 0.3,
      }}
    />
  ));
  return (
    <>
      {clouds}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400/8 via-gray-500/5 to-gray-600/10 pointer-events-none" />
    </>
  );
};

// --- 親エフェクト選択コンポーネント ---
export const WeatherEffects = memo(({ weather }: { weather: string }) => {
  const weatherClass = getWeatherBackgroundClass(weather);
  console.log(weatherClass);
  switch (weatherClass) {
    case "weather-sunny":
      return <SunnyEffects />;
    case "weather-rainy":
      return <RainDrops />;
    case "weather-snowy":
      return <SnowFlakes />;
    case "weather-cloudy":
      return <CloudElements />;
    default:
      return null;
  }
});
